/*
* 处理各种ajax请求。与数据库交互
* */
var express = require('express');
//创建路由，监听以/api开头的url
var router = express.Router();
var pool = require('../db/mysql');
var UUID = require('uuid');
var moment = require('moment');
var Promise = require('Promise');
//统一数据返回格式
var responseData;
router.use(function (req, res, next) {
    responseData = {
        code: 0,//默认0表示无错误
        msg: '',
    }
    next();
});

/*用户登录*/
router.post('/user/login', function (req, res) {

    // TODO 登录的时候要断当前用户是否已经登录

    var name = req.body.name;
    var sno = req.body.sno;
    if (name == '' || sno == '') {
        responseData.code = 1;
        responseData.msg = "姓名或学号不能为空";
        res.json(responseData);
        return;
    }
    //根据学号查询数据库中是否存在此用户
    var sql = 'SELECT * FROM user WHERE sno = ?';
    var sqlParams = [sno];
    pool.getConnection(function (err, connection) {
        var signinid = UUID.v1();
        connection.query(sql, sqlParams, function (err, rows) {
            if (err) {
                throw err;
            }
            //如果返回值的长度为0表示通过该学号查不到数据
            if (rows.length == 0) {
                responseData.code = 1;
                responseData.msg = '不存在此学号';
                res.json(responseData);
                return;
            }
            for (var i in rows) {
                //判断输入的学号是否对应正确的姓名
                if (rows[i].name != name) {
                    responseData.code = 1;
                    responseData.msg = '学号对应的姓名错误';
                    res.json(responseData);
                    return;
                } else {
                    //写入session登录信息
                    req.session.sign = true;
                    req.session.name = {
                        name: name,
                        sno: sno,
                        id: rows[i].id, //这个id是user表里面的id
                        signinid: signinid   //写入业务id，这个id即将前往signin表
                    }
                    responseData.msg = '学号对应的姓名正确,登录成功';
                    res.json(responseData);

                    //登录成功之后需要修改数据库记录
                    //1.根据学号获取当前登录次数并加一
                    sql = 'UPDATE USER SET logintimes=logintimes+1 WHERE sno = ?';
                    connection.query(sql, sqlParams, function (err, rows) {
                        if (err) {
                            throw err;
                        }
                    });
                    //2.更新登录时间
                    sql = 'UPDATE USER SET logindate = ? WHERE sno = ?';
                    // var newDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
                    sqlParams = [new Date(), sno];
                    connection.query(sql, sqlParams, function (err, rows) {
                        if (err) {
                            console.log('err')
                            throw err;
                        }
                    });

                    //4.修改signin表的记录，为签到做准备
                    /*
                     * 写入数据逻辑：
                     *   每签到一次就直接插入一条数据，插入的信息包括：signinid、学号、姓名
                     *
                     *   因为登录的时候给了一个唯一的 signinid 所以在不清空session的情况下
                     *   一天只能登录一次
                     *
                     *   如果session不存在了则会创建一个新的session以及signinid，所以可以再次其签到
                     * */
                    sql = 'INSERT INTO signin(signinid, sno, name, signstate) VALUES(?, ?, ?, 0)';
                    sqlParams = [signinid, sno, name];
                    connection.query(sql, sqlParams, function (err, rows) {
                        if (err) {
                            console.log('err')
                            throw err;
                        }
                    });
                    break;
                }
            }
        });

        connection.release();
    });
});

/*
* 用户签到
* */
router.post('/user/signin', function (req, res) {
    var name = req.body.name;
    var sno = req.body.sno;
    //往数据库写入签到信息
    /*
    * 根据UUID来修改表
    * */
    var signinid = req.session.name.signinid;
    var sql = 'UPDATE signin SET signindate = ?, signintimes=1, signstate=1 WHERE signinid = ?';
    var sqlParams = [new Date(), signinid];
    pool.getConnection(function (err, connection) {
        connection.query(sql, sqlParams, function (err, rows) {
            if (err) {
                throw err;
            }
            responseData.msg = '签到成功';
            res.json(responseData);
        });
        connection.release();
    });
});


/*
* 用户签退
* */
router.post('/user/signout', function (req, res) {
    var name = req.body.name;
    var sno = req.body.sno;
    var signinid = req.body.signinid;
    var sql = '';
    var sqlParams = '';
    //往数据库写入签退信息
    /*
    * 根据signinid来修改表
    * 1.先获取签到时间
    * 2.再获取签退时间 同时 计算时间差
    * 3.修改签退时间记录，修改签到状态为0
    * */
    pool.getConnection(function (err, connection) {
        var days;
        var leave1;
        var hours;
        var leave2;
        var minutes;
        var leave3;
        var seconds;
        var onlinetime;
        var signoutdate;
        var dateDiv;
        var signindate;
        sql = 'SELECT signindate FROM signin WHERE signinid = ?';
        sqlParams = [signinid];
        connection.query(sql, sqlParams, function (err, rows) {
            if (err) {
                throw err;
            }
            signindate = rows[0].signindate;
            signoutdate = new Date();
            dateDiv = signoutdate - signindate;
            //计算出相差天数
            days = Math.floor(dateDiv / (24 * 3600 * 1000));
            //计算出小时数
            leave1 = dateDiv % (24 * 3600 * 1000);    //计算天数后剩余的毫秒数
            hours = Math.floor(leave1 / (3600 * 1000));
            //计算相差分钟数
            leave2 = leave1 % (3600 * 1000);        //计算小时数后剩余的毫秒数
            minutes = Math.floor(leave2 / (60 * 1000));
            //计算相差秒数
            leave3 = leave2 % (60 * 1000);      //计算分钟数后剩余的毫秒数
            seconds = Math.round(leave3 / 1000);
            //组装在线时长字符串
            onlinetime = days + '天' + hours + '小时' + minutes + '分' + seconds + '秒';
            sql = 'UPDATE signin SET signoutdate = ?, onlinetime = ?, signstate=0 WHERE signinid = ?';
            sqlParams = [signoutdate, onlinetime, signinid];
            connection.query(sql, sqlParams, function (err, rows) {
                if (err) {
                    throw err;
                }
                responseData.msg = '签退成功';
                res.json(responseData);
            });
        });
        connection.release();
    });
});

//清空session
router.post('/user/logout', function (req, res) {
    //签退成功后同时清空session
    req.session.sign = false;
    req.session.name = {
        name: '',
        sno: '',
        id: '', //这个id是user表里面的id
        signinid: ''   //写入业务id，这个id即将前往signin表
    }
    responseData.msg = 'session清空成功';
    res.json(responseData);
});


//为了可以被require引用，必须导出模块
module.exports = router;
