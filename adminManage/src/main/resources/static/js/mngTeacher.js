$(document).ready(function() {
    var token = getCookie("token");

    var teacherIDs = [];
    var teacherAccounts = [];
    var teacherNames = [];
    var teacherEmails = [];

    var teacherIDs1 = [];
    var teacherAccounts1 = [];
    var teacherNames1 = [];
    var teacherEmails1 = [];
    var searchInfoRow = [];

    $.ajax({
        type: 'get',
        url: '/teacher',
        headers: {'Authorization': 'Bearer ' + token},
        data: {},
        dataType: 'json',
        async: false,
        success: function (teacherList) {
            var length = teacherList.length;
            if (length > 0) {
                document.getElementById("tip").style.display = "none";
                document.getElementById("search-teacher-list").style.display = "none";
                var teacherListTable = document.getElementById("teacher-list");

                for (var i = 0; i < length; i++) {
                    var newRow = teacherListTable.insertRow(teacherListTable.rows.length);
                    var cell1;
                    var div1 = document.createElement("div");
                    var divAttr = document.createAttribute("class");
                    divAttr.value = "operations";
                    div1.setAttributeNode(divAttr);

                    div1.innerHTML =
                        "<img src=\"../icon/modify_16.png\" class=\"modifyBtn\">" +
                        "<img src=\"../icon/reset_16.png\" class=\"resetBtn\">" +
                        "<img src=\"../icon/delete_16.png\" class=\"deleteBtn\">";

                    teacherIDs[i] = teacherList[i].id;
                    newRow.id = teacherIDs[i];

                    cell1 = newRow.insertCell(0);
                    teacherAccounts[i] = teacherList[i].account;
                    cell1.innerHTML = teacherAccounts[i];

                    cell1 = newRow.insertCell(1);
                    teacherNames[i] = teacherList[i].name;
                    cell1.innerHTML = teacherNames[i];

                    cell1 = newRow.insertCell(2);
                    teacherEmails[i] = teacherList[i].email;
                    cell1.innerHTML = teacherEmails[i];

                    cell1 = newRow.insertCell(3);
                    cell1.appendChild(div1);
                }
            } else {
                document.getElementById("tip").style.display = "";
            }
        },
        error: function(XMLHttpRequest) {
            alert("AJAX error: " + XMLHttpRequest.status);
        }
    });

    $("#searchBtn").click(function() {
        var inputContent = $("#inputArea").val();
        if (inputContent == "") {
            window.location.reload();
        } else {
            $.ajax({
                type: 'get',
                url: '/teacher/searchteacher',
                headers: {'Authorization': 'Bearer ' + token},
                data: {
                    "content": inputContent
                },
                dataType: 'json',
                async: false,
                success: function (teacherList) {
                    var searchInfoRowLength = searchInfoRow.length;
                    for (var j = 0; j < searchInfoRowLength; j++) {
                        searchInfoRow[0].parentNode.removeChild(searchInfoRow[0]);
                        searchInfoRow.splice(0, 1);
                    }
                    var teacherListTable = document.getElementById("search-teacher-list");
                    if (teacherList instanceof Array) {
                        var length1 = teacherList.length;
                        if (length1 > 0) {
                            document.getElementById("teacher-list").style.display = "none";
                            document.getElementById("search-teacher-list").style.display = "";
                            document.getElementById("tip1").style.display = "none";

                            for (var i = 0; i < length1; i++) {
                                var newRow1 = teacherListTable.insertRow(teacherListTable.rows.length);
                                var cell1;
                                var div1 = document.createElement("div");
                                var divAttr = document.createAttribute("class");
                                divAttr.value = "operations";
                                div1.setAttributeNode(divAttr);

                                div1.innerHTML =
                                    "<img src=\"../icon/modify_16.png\" class=\"modifyBtn\">" +
                                    "<img src=\"../icon/reset_16.png\" class=\"resetBtn\">" +
                                    "<img src=\"../icon/delete_16.png\" class=\"deleteBtn\">";

                                teacherIDs1[i] = teacherList[i].id;
                                newRow1.id = teacherIDs1[i];
                                searchInfoRow[i] = newRow1;

                                cell1 = newRow1.insertCell(0);
                                teacherAccounts1[i] = teacherList[i].account;
                                cell1.innerHTML = teacherAccounts1[i];

                                cell1 = newRow1.insertCell(1);
                                teacherNames1[i] = teacherList[i].name;
                                cell1.innerHTML = teacherNames1[i];

                                cell1 = newRow1.insertCell(2);
                                teacherEmails1[i] = teacherList[i].email;
                                cell1.innerHTML = teacherEmails1[i];

                                cell1 = newRow1.insertCell(3);
                                cell1.appendChild(div1);
                            }
                        } else {
                            document.getElementById("tip1").style.display = "";
                        }
                    } else {
                        document.getElementById("teacher-list").style.display = "none";
                        document.getElementById("search-teacher-list").style.display = "";
                        document.getElementById("tip1").style.display = "none";

                        var newRow2 = teacherListTable.insertRow(teacherListTable.rows.length);
                        var cell2;
                        var div2 = document.createElement("div");
                        var divAttr2 = document.createAttribute("class");
                        divAttr2.value = "operations";
                        div2.setAttributeNode(divAttr2);

                        div2.innerHTML =
                            "<img src=\"../icon/modify_16.png\" class=\"modifyBtn\">" +
                            "<img src=\"../icon/reset_16.png\" class=\"resetBtn\">" +
                            "<img src=\"../icon/delete_16.png\" class=\"deleteBtn\">";

                        teacherIDs1[0] = teacherList.id;
                        newRow2.id = teacherIDs1[0];
                        searchInfoRow[0] = newRow2;

                        cell2 = newRow2.insertCell(0);
                        teacherAccounts1[0] = teacherList.account;
                        cell2.innerHTML = teacherAccounts1[0];

                        cell2 = newRow2.insertCell(1);
                        teacherNames1[0] = teacherList.name;
                        cell2.innerHTML = teacherNames1[0];

                        cell2 = newRow2.insertCell(2);
                        teacherEmails1[0] = teacherList.email;
                        cell2.innerHTML = teacherEmails1[0];

                        cell2 = newRow2.insertCell(3);
                        cell2.appendChild(div2);
                    }
                },
                error: function() {
                    document.getElementById("teacher-list").style.display = "none";
                    document.getElementById("search-teacher-list").style.display = "";
                    document.getElementById("tip1").style.display = "";

                    var searchInfoRowLength = searchInfoRow.length;
                    for (var j = 0; j < searchInfoRowLength; j++) {
                        searchInfoRow[0].parentNode.removeChild(searchInfoRow[0]);
                        searchInfoRow.splice(0, 1);
                    }
                }
            });
        }
    });

    $("#teacher-list").on('click', '.modifyBtn', function() {
        var index = this.parentNode.parentNode.parentNode.rowIndex;
        var aUrl = 'modifyTeacher.html?id=' +teacherIDs[index-2] +
                    '&name=' + teacherNames[index-2] +
                    '&account=' + teacherAccounts[index-2] +
                    '&email=' + teacherEmails[index-2];
        window.location.href = aUrl;
    });
    $("#search-teacher-list").on('click', '.modifyBtn', function() {
        var index = this.parentNode.parentNode.parentNode.rowIndex;
        var aUrl = 'modifyTeacher.html?id=' +teacherIDs1[index-2] +
            '&name=' + teacherNames1[index-2] +
            '&account=' + teacherAccounts1[index-2] +
            '&email=' + teacherEmails1[index-2];
        window.location.href = aUrl;
    });

    $("#teacher-list").on('click', '.resetBtn', function() {
        var index = this.parentNode.parentNode.parentNode.rowIndex;
        var bUrl = '/teacher/' + teacherIDs[index-2] + '/password';
        var option = confirm("重置操作不可恢复，是否继续？");
        if (option) {
            $.ajax({
                type: 'put',
                url: bUrl,
                headers: {'Authorization': 'Bearer ' + token},
                data: {},
                dataType: 'json',
                success: function () {
                    alert("重置成功！已重置为初始密码：123456！");
                },
                error: function(XMLHttpRequest) {
                    alert("AJAX error: " + XMLHttpRequest.status);
                }
            });
        }
    });
    $("#search-teacher-list").on('click', '.resetBtn', function() {
        var index = this.parentNode.parentNode.parentNode.rowIndex;
        var bUrl = '/teacher/' + teacherIDs1[index-2] + '/password';
        var option = confirm("重置操作不可恢复，是否继续？");
        if (option) {
            $.ajax({
                type: 'put',
                url: bUrl,
                headers: {'Authorization': 'Bearer ' + token},
                data: {},
                dataType: 'json',
                success: function () {
                    alert("重置成功！已重置为初始密码：123456！");
                },
                error: function(XMLHttpRequest) {
                    alert("AJAX error: " + XMLHttpRequest.status);
                }
            });
        }
    });

    $("#teacher-list").on('click', '.deleteBtn', function() {
        var index = this.parentNode.parentNode.parentNode.rowIndex;
        var cUrl = '/teacher/' + teacherIDs[index-2];
        var option = confirm("删除操作不可恢复，是否继续？");
        if (option) {
            $.ajax({
                type: 'delete',
                url: cUrl,
                headers: {'Authorization': 'Bearer ' + token},
                data: {},
                success: function () {
                    var teacherListTable = document.getElementById("teacher-list");
                    teacherListTable.deleteRow(index);
                    teacherIDs.splice(index-2, 1);
                    alert("删除成功！");
                    if (teacherIDs.length == 0) {
                        document.getElementById("tip").style.display = "";
                    }
                },
                error: function(XMLHttpRequest) {
                    alert("AJAX error: " + XMLHttpRequest.status);
                }
            });
        }
    });
    $("#search-teacher-list").on('click', '.deleteBtn', function() {
        var index = this.parentNode.parentNode.parentNode.rowIndex;
        var cUrl = '/teacher/' + teacherIDs1[index-2];
        var option = confirm("删除操作不可恢复，是否继续？");
        if (option) {
            $.ajax({
                type: 'delete',
                url: cUrl,
                headers: {'Authorization': 'Bearer ' + token},
                data: {},
                success: function () {
                    var teacherListTable = document.getElementById("search-teacher-list");
                    teacherListTable.deleteRow(index);
                    teacherIDs.splice(index-2, 1);
                    alert("删除成功！");
                    if (teacherIDs.length == 0) {
                        document.getElementById("tip1").style.display = "";
                    }
                },
                error: function(XMLHttpRequest) {
                    alert("AJAX error: " + XMLHttpRequest.status);
                }
            });
        }
    });

    function getCookie(name) {
        var arr,reg = new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr = document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    }
});
