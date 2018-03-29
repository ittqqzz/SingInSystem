/*
* 首页的操作通过在此js文件里面发送ajax请求到api里面进行操作
* */
$(document).ready(function(){
    $('#login').click(function () {

        $.ajax({
            type : 'POST',
            url : '/api/user/login',
            data : {
                name : $('#name').val(),
                sno : $('#sno').val()
            },
            dataType : 'json',
            success : function (result) {
                if (!result.code) {
                    console.log('登录成功');
                    window.location.href = '/admin/signin';
                } else {
                    console.log('登录失败');
                    //跳转到err
                }
            },
            error : function (err) {
                
            }
        });
    });
});
