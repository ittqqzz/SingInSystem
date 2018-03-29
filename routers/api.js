/*
* 处理各种ajax请求
* */
var express = require('express');
//创建路由，监听以/api开头的url
var router = express.Router();
var pool = require('../db/mysql');
var moment = require('moment');
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
                        id: rows[i].id
                    }
                    responseData.msg = '学号对应的姓名正确,登录成功';
                    res.json(responseData);
                    break;
                }
            }
        });
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

        // //4.修改signin表的记录
        // sql = 'INSERT INTO signin(sno, name, signindate, signoutdate, onlinetime, signtimes) VALUES(?, ?, ?, ?, ?, ?)';
        // sqlParams = [sno, name, new Date(), new Date(), 0, 0];
        connection.release();
    });
});

/*
* 用户签到
* */
router.post('/user/signin', function (req, res) {
    console.log('api')
    var name = req.body.name;
    var sno = req.body.sno;
    console.log("name is: "+ name + sno);
    //往数据库写入签到信息
    var sql = 'UPDATE signin SET signindate = ?, signintimes=signintimes+1, signstate=1 WHERE sno = ?';
    var sqlParams = [new Date(), sno];
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
//为了可以被require引用，必须导出模块
module.exports = router;
