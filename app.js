/**
 * 应用程序入口文件
 */
//加载web框架：express
var express = require('express');
//加载swig模板引擎
var swig = require('swig');
//加载body-parser,用来处理post提交过来的数据  --->  为了更加便利的解析post请求，可以使用这款插件
var bodyParser = require('body-parser');
var session = require('express-session');
//var log4js = require("./routers/log4js");
//创建app应用
var app = express();  //此语句等价于http.createServer();
//释放静态资源
app.use('/public', express.static('public'));
//设置swig模板引擎
app.engine('html', swig.renderFile);
app.set('views', './views');
app.set('view engine', 'html');


// TODO 日志处理


//开发期间关闭模板缓存
swig.setDefaults({cache:false});
//bodyparser设置
app.use(bodyParser.urlencoded({extended:true}));
//设置session
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'hubwiz app', //secret的值建议使用随机字符串
    cookie: {maxAge: 86400000} // 过期时间（毫秒）24小时
}));
//加载路由模块
app.use('/', require('./routers/home'));
app.use('/admin', require('./routers/admin'));
app.use('/api', require('./routers/api'));
//监听服务器端口
var host = '192.168.9.181';
app.listen(3000, host);
console.log('Server Started at http://'+ host +':3000');