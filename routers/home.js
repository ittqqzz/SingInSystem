/*
 * 模块化开发：
 * 1. 先引入需要的框架、资源等
 * 2. 创建路由，监听请求的url
 * 3. 导出此路由为一个模块
 */

//1. 引入资源
var express = require('express');
//2. 创建路由 --> 此时所有的琴请求可通过router来解决
var router = express.Router();


//处理请求:http://localhost:300/
router.get('/', function (req, res) {
    res.render('home/index', {
        loginState : req.session.sign
    });
});

//处理首页被禁止的url
// router.get('*', function(req, res){
//     var url = req.originalUrl.toString();
//     console.log(url)
//     if (url != '/admin/' || url != '/admin/signin') {
//         res.render('admin/error', {
//             type : '资源不存在',
//             msg : '禁止访问此url'
//         });
//     }
//
// });

//3. 导出模块
module.exports = router;
