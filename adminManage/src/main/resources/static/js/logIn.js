$(document).ready(function() {
    $("#logInBtn").click(function() {
        $.ajax({
            type: 'post',
            url: '/admin/login',
            data: {
                "account": $("#account").val(),
                "password": $("#pwd").val()
            },
            dataType: 'json',
            success: function (msg) {
                var jwt = msg.jwt;
                document.cookie = "token=" + jwt;
                window.location.href = 'page/mngTeacher.html';
            },
            error: function(XMLHttpRequest) {
                if (XMLHttpRequest.status == 400 || XMLHttpRequest.status == 500) {
                    alert("账号/密码错误");
                } else {
                    alert("AJAX error: " + XMLHttpRequest.status);
                }
            }
        });
    });
});
