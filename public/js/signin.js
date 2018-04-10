$(document).ready(function () {

    $('#signin').click(function () {
        $.ajax({
            type: 'POST',
            url: '/api/user/signin',
            data: {
                name: $('#name').html(),
                sno: $('#sno').html()
            },
            dataType: 'json',
            success: function (result) {
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
            error: function (err) {

            }
        });
    });

    $('#signout').click(function () {
        $.ajax({
            type: 'POST',
            url: '/api/user/signout',
            data: {
                name: $('#name').html(),
                sno: $('#sno').html(),
                signinid: $('#signinid').html()
            },
            dataType: 'json',
            success: function (result) {
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
            error: function (err) {

            }
        });
    });


    $('#logout').click(function () {
        //发送清空session的请求
        $.ajax({
            type: 'POST',
            url: '/api/user/logout',
            success: function (result2) {
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

    $('#search').click(function () {
        //处理搜索请求
        $.ajax({
            type: 'POST',
            url: '/admin/user/search',
            data: {
                searchname: $('#searchname').val()
            },
            success: function (resultt) {
                if (!resultt.code) {
                    console.log('搜索成功');
                    window.location.href = '/admin/search';
                } else {
                    console.log('搜索失败');
                }
            },
            error: function (err) {
                console.log('搜索出错' + err.toString());
            }
        });
    });

    //处理分页

    url = window.location.href;
    var query = url.split("?")[1];
    var queryArr = query.split("&");
    var page = queryArr[0].split('=');
    if (page[1] <= 1) {
        $('#previous').html('<span aria-hidden="true" >&laquo; 没有上一页了</span>');
        $('#previous').attr("href", "javascript:;");
    } else {
        $('#previous').html('<span aria-hidden="true">&laquo; 上一页</span>');
    }

    var pages = Number($('#pages').html());
    if (page[1] >= pages) {
        $('#next').html('<span aria-hidden="true" class="disabled">没有下一页了 &raquo;</span>');
        $('#next').attr("href", "javascript:;")
    } else {
        $('#next').html('<span aria-hidden="true" >下一页 &raquo;</span>');
    }

    $('#previous').click(function () {
        if ($('#previous').attr('href') == 'javascript:;') {
        } else {
            window.location.href = '/admin/signin?page=' + (Number(page[1]) - 1);
        }
    });

    $('#next').click(function () {
        if ($('#next').attr('href') == 'javascript:;') {
        } else {
            window.location.href = '/admin/signin?page=' + (Number(page[1]) + 1);
        }
    });
});