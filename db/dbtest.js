var pool = require('./mysql');
var sql = "SELECT * FROM user WHERE sno = ?";
var sqlParams = ['2016115010120'];

pool.getConnection(function (err, connection) {
    connection.query(sql, sqlParams, function (err, rows, fileds) {
        if (err) {
            throw err;
            return ;
        }

        // for (var i in rows) {
        //     if (rows[i] == null) {
        //         console.log('不存此在姓名');
        //         return;
        //     }
        //     //console.log(rows[i].StudentName);
        // }
        console.log(rows[0].name);
    });
    connection.release();
});
