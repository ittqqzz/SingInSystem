var mysql = require('mysql');
var pool = mysql.createPool({
    host : 'localhost',
    port : 3306,
    database : 'signinsystem',
    user : 'root',
    password : '0000'
});
/*
* 建议在此文件里面封装一个CRUD
* 其他文件只需要直接调用文件里面的方法就可以操作数据库，而不用自己写（顶多传个参）
* */
module.exports = pool;