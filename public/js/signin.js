$(document).ready(function () {

    $('#signin').click(function () {
        $.ajax({
            type : 'POST',
            url : '/api/user/signin',
            data : {
                name : $('#name').html(),
                sno : $('#sno').html()
            },
            dataType : 'json',
            success :function (result) {
                if (!result.code) {
                    console.log('签到成功');
                    alert('签到成功！');
                    setTimeout(500);
                    window.location.reload();
                } else {
                    console.log('签到失败');
                    //跳转到err
                }
            },
            error : function (err) {

            }
        });
    });

    $('#signout').click(function () {
        $.ajax({
            type : 'POST',
            url : '/api/user/signout',
            data : {
                name : $('#name').html(),
                sno : $('#sno').html(),
                signinid : $('#signinid').html()
            },
            dataType : 'json',
            success :function (result) {
                if (!result.code) {
                    console.log('签退成功');
                    alert('签退成功！');
                    setTimeout(500);
                    //重新加载页面，显示签退信息
                    window.location.reload();
                } else {
                    console.log('签退失败');
                    //跳转到err
                }
            },
            error : function (err) {

            }
        });
    });
    
    
    $('#logout').click(function () {
        //发送清空session的请求
        $.ajax({
            type : 'POST',
            url : '/api/user/logout',
            success :function (result2) {
                if (!result2.code) {
                    alert('退出登录成功！');
                    setTimeout(function () {
                        window.location.href = '/';
                        console.log('签退成功并成功退出登录');
                    }, 1000)

                }
            }
        });
    });
});