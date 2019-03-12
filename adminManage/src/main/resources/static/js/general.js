$(document).ready(function() {
    $("#logOutBtn").click(function() {
        // deleteToken();
        window.location.href='../login.html';
    });

    $("#mngTeacher").click(function() {
        window.location.href='mngTeacher.html';
    });
    $("#mngStudent").click(function() {
        window.location.href='mngStudent.html';
    });
});
