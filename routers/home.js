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
    res.render('home/index');
});

//3. 导出模块
module.exports = router;
