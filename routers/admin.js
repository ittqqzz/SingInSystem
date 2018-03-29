//1. 引入资源
var express = require('express');
//2. 创建路由 --> 此时所有的琴请求可通过router来解决
var router = express.Router();

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
    console.log('session is: '+ req.session.name);
    res.render('admin/signin', {
        name: req.session.name.name
    });
});

//3. 导出模块
module.exports = router;
