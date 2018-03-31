var pool = require('./mysql');


pool.getConnection(function (err, connection) {
    sql = 'SELECT signindate FROM signin WHERE signinid = ?';
    sqlParams = ['baa34960-33e9-11e8-8aff-ffd91d04c3e2'];
    var signindate;
    connection.query(sql, sqlParams, function (err, rows) {
        if (err) {
            throw err;
        }
        signindate = rows[0].signindate;
        console.log(typeof signindate);
    });
    connection.release();
});
