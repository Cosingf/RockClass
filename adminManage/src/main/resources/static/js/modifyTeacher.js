$(document).ready(function() {
    var id = getUrlParam("id");
    var name = decodeURI(getUrlParam("name"));
    var account = getUrlParam("account");
    var email = getUrlParam("email");

    document.getElementById("teacherNum").value = account;
    document.getElementById("name").value = name;
    if (email != "undefined") {
        document.getElementById("email").value = email;
    } else {
        document.getElementById("email").value = "";
    }

    var aUrl = '/teacher/' + id + '/information';
    var token = getCookie("token");

    $("#confirmBtn").click(function() {
        $.ajax({
            type: 'put',
            url: aUrl,
            headers: {'Authorization': 'Bearer ' + token},
            data: {
                "account": $("#teacherNum").val(),
                "name": $("#name").val(),
                "email": $("#email").val()
            },
            dataType: 'json',
            success: function () {
                alert("修改成功！");
                window.location.href = 'mngTeacher.html';
            },
            error: function(XMLHttpRequest) {
                alert("AJAX error: " + XMLHttpRequest.status);
            }
        });
    });

    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = encodeURI(window.location.search).substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        } else {
            return null;
        }
    }
    function getCookie(name) {
        var arr,reg = new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr = document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    }
});
