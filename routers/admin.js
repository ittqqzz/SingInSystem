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
        res.render('admin/error');
    }

});

//处理请求::http://localhost:300/admin
router.get('/signin', function (req, res) {
    console.log('sno is: '+ req.session.name.sno);
    //获取用户历史登录记录
    var sql = 'SELECT * FROM signin';
    var result = [];
    pool.getConnection(function (err, connection) {
        connection.query(sql, function (err, rows) {
            if (err) {
                throw err;
            }
            var signState = 0;
            for (var i in rows) {
                if (rows[i].name == req.session.name.name) {
                    signState = rows[i].signstate;
                    break;
                }
            }
            res.render('admin/signin', {
                name : req.session.name.name,
                sno : req.session.name.sno,
                signstate : signState,
                rows : rows
            });
        });
        connection.release();
    });

});


//3. 导出模块
module.exports = router;
