$(document).ready(function () {
    $('#signin').click(function () {
        console.log(13)
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
});