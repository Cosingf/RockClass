$(document).ready(function() {
    var token = getCookie("token");

    $("#confirmBtn").click(function() {
        $.ajax({
            type: 'post',
            url: '/teacher',
            headers: {'Authorization': 'Bearer ' + token},
            data: {
                "account": $("#teacherNum").val(),
                "password": $("#initPwd").val(),
                "name": $("#name").val(),
                "email": $("#email").val()
            },
            dataType: 'json',
            success: function () {
                alert("成功创建一个新账号！");
                window.location.href = 'mngTeacher.html';
            },
            error: function(XMLHttpRequest) {
                alert("AJAX error: " + XMLHttpRequest.status);
            }
        });
    });

    function getCookie(name) {
        var arr,reg = new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr = document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    }
});
