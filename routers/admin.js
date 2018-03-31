/*
* 此路由负责页面每一次加载的/admin时候
* 就执行一些操作
* 例如：重新渲染该页面的资源、重新加载页面参数等
* */


//1. 引入资源
var express = require('express');
//2. 创建路由 --> 此时所有的琴请求可通过router来解决
var router = express.Router();
var pool = require('../db/mysql');
//判断是否有用户登录，没有用户登录，不允许进入该界面
router.use(function (req, res, next) {
    if (req.session.sign) {
        next();//中间件的拦截必须要next
    } else {
        res.render('admin/error', {
            type : '登录出错',
            msg : '你尚未登录，请先登录'
        });
    }

});

//处理请求::http://localhost:300/admin
router.get('/signin', function (req, res) {
    console.log('sno is: '+ req.session.name.sno);

    //根据UUID获取用户历史登录记录
    var signinid = req.session.name.signinid;

    var sql = 'SELECT * FROM signin';
    var sqlParams = [signinid];
    pool.getConnection(function (err, connection) {
        var signState = 0;

        var sqlState = 'SELECT signstate FROM signin WHERE signinid = ?';
        var sqlStateParams = [signinid];
        connection.query(sqlState, sqlStateParams,function (err, rows) {
            if (err) {
                throw err;
            }
            signState = rows[0].signstate;
        });

        connection.query(sql, sqlParams, function (err, rows) {
            if (err) {
                throw err;
            }
            res.render('admin/signin', {
                name : req.session.name.name,
                sno : req.session.name.sno,
                signstate : signState,
                rows : rows,
                signinid : signinid
            });
        });
        connection.release();
    });

});


//3. 导出模块
module.exports = router;
