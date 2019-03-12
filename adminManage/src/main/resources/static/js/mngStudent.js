$(document).ready(function() {
    var token = getCookie("token");

    var studentIDs = [];
    var studentAccounts = [];
    var studentNames = [];
    var studentEmails = [];

    var studentIDs1 = [];
    var studentAccounts1 = [];
    var studentNames1 = [];
    var studentEmails1 = [];
    var searchInfoRow = [];

    $.ajax({
        type: 'get',
        url: '/student',
        headers: {'Authorization': 'Bearer ' + token},
        data: {},
        dataType: 'json',
        async: false,
        success: function (studentList) {
            var length = studentList.length;
            if (length > 0) {
                document.getElementById("tip").style.display = "none";
                document.getElementById("search-student-list").style.display = "none";
                var studentListTable = document.getElementById("student-list");

                for (var i = 0; i < length; i++) {
                    var newRow = studentListTable.insertRow(studentListTable.rows.length);
                    var cell1;
                    var div1 = document.createElement("div");
                    var divAttr = document.createAttribute("class");
                    divAttr.value = "operations";
                    div1.setAttributeNode(divAttr);

                    div1.innerHTML =
                        "<img src=\"../icon/modify_16.png\" class=\"modifyBtn\">" +
                        "<img src=\"../icon/reset_16.png\" class=\"resetBtn\">" +
                        "<img src=\"../icon/delete_16.png\" class=\"deleteBtn\">";

                    studentIDs[i] = studentList[i].id;
                    newRow.id = studentIDs[i];

                    cell1 = newRow.insertCell(0);
                    studentAccounts[i] = studentList[i].account;
                    cell1.innerHTML = studentAccounts[i];

                    cell1 = newRow.insertCell(1);
                    studentNames[i] = studentList[i].name;
                    cell1.innerHTML = studentNames[i];

                    cell1 = newRow.insertCell(2);
                    studentEmails[i] = studentList[i].email;
                    if (studentEmails[i] == undefined) {
                        cell1.innerHTML = "暂未填写";
                    } else {
                        cell1.innerHTML = studentEmails[i];
                    }

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
                url: '/student/searchstudent',
                headers: {'Authorization': 'Bearer ' + token},
                data: {
                    "content": inputContent
                },
                dataType: 'json',
                async: false,
                success: function (studentList) {
                    var searchInfoRowLength = searchInfoRow.length;
                    for (var j = 0; j < searchInfoRowLength; j++) {
                        searchInfoRow[0].parentNode.removeChild(searchInfoRow[0]);
                        searchInfoRow.splice(0, 1);
                    }
                    var studentListTable = document.getElementById("search-student-list");
                    if (studentList instanceof Array) {
                        var length1 = studentList.length;
                        if (length1 > 0) {
                            document.getElementById("student-list").style.display = "none";
                            document.getElementById("search-student-list").style.display = "";
                            document.getElementById("tip1").style.display = "none";

                            for (var i = 0; i < length1; i++) {
                                var newRow1 = studentListTable.insertRow(studentListTable.rows.length);
                                var cell1;
                                var div1 = document.createElement("div");
                                var divAttr = document.createAttribute("class");
                                divAttr.value = "operations";
                                div1.setAttributeNode(divAttr);

                                div1.innerHTML =
                                    "<img src=\"../icon/modify_16.png\" class=\"modifyBtn\">" +
                                    "<img src=\"../icon/reset_16.png\" class=\"resetBtn\">" +
                                    "<img src=\"../icon/delete_16.png\" class=\"deleteBtn\">";

                                studentIDs1[i] = studentList[i].id;
                                newRow1.id = studentIDs1[i];
                                searchInfoRow[i] = newRow1;

                                cell1 = newRow1.insertCell(0);
                                studentAccounts1[i] = studentList[i].account;
                                cell1.innerHTML = studentAccounts1[i];

                                cell1 = newRow1.insertCell(1);
                                studentNames1[i] = studentList[i].name;
                                cell1.innerHTML = studentNames1[i];

                                cell1 = newRow1.insertCell(2);
                                studentEmails1[i] = studentList[i].email;
                                if (studentEmails[i] == undefined) {
                                    cell1.innerHTML = "暂未填写";
                                } else {
                                    cell1.innerHTML = studentEmails[i];
                                }

                                cell1 = newRow1.insertCell(3);
                                cell1.appendChild(div1);
                            }
                        } else {
                            document.getElementById("tip1").style.display = "";
                        }
                    } else {
                        document.getElementById("student-list").style.display = "none";
                        document.getElementById("search-student-list").style.display = "";
                        document.getElementById("tip1").style.display = "none";

                        var newRow = studentListTable.insertRow(studentListTable.rows.length);
                        var cell2;
                        var div2 = document.createElement("div");
                        var divAttr1 = document.createAttribute("class");
                        divAttr1.value = "operations";
                        div2.setAttributeNode(divAttr1);

                        div2.innerHTML =
                            "<img src=\"../icon/modify_16.png\" class=\"modifyBtn\">" +
                            "<img src=\"../icon/reset_16.png\" class=\"resetBtn\">" +
                            "<img src=\"../icon/delete_16.png\" class=\"deleteBtn\">";

                        studentIDs1[0] = studentList.id;
                        newRow.id = studentIDs1[0];
                        searchInfoRow[0] = newRow;

                        cell2 = newRow.insertCell(0);
                        studentAccounts1[0] = studentList.account;
                        cell2.innerHTML = studentAccounts1[0];

                        cell2 = newRow.insertCell(1);
                        studentNames1[0] = studentList.name;
                        cell2.innerHTML = studentNames1[0];

                        cell2 = newRow.insertCell(2);
                        studentEmails1[0] = studentList.email;
                        if (studentEmails[0] == undefined) {
                            cell2.innerHTML = "暂未填写";
                        } else {
                            cell2.innerHTML = studentEmails[0];
                        }

                        cell2 = newRow.insertCell(3);
                        cell2.appendChild(div2);
                    }
                },
                error: function() {
                    document.getElementById("student-list").style.display = "none";
                    document.getElementById("search-student-list").style.display = "";
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

    $("#student-list").on('click', '.modifyBtn', function() {
        var index = this.parentNode.parentNode.parentNode.rowIndex;
        var aUrl = 'modifyStudent.html?id=' +studentIDs[index-2] +
            '&name=' + studentNames[index-2] +
            '&account=' + studentAccounts[index-2] +
            '&email=' + studentEmails[index-2];
        window.location.href = aUrl;
    });
    $("#search-student-list").on('click', '.modifyBtn', function() {
        var index = this.parentNode.parentNode.parentNode.rowIndex;
        var aUrl = 'modifyStudent.html?id=' +studentIDs1[index-2] +
            '&name=' + studentNames1[index-2] +
            '&account=' + studentAccounts1[index-2] +
            '&email=' + studentEmails1[index-2];
        window.location.href = aUrl;
    });

    $("#student-list").on('click', '.resetBtn', function() {
        var index = this.parentNode.parentNode.parentNode.rowIndex;
        var bUrl = '/student/' + studentIDs[index-2] + '/password';
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
    $("#search-student-list").on('click', '.resetBtn', function() {
        var index = this.parentNode.parentNode.parentNode.rowIndex;
        var bUrl = '/student/' + studentIDs1[index-2] + '/password';
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

    $("#student-list").on('click', '.deleteBtn', function() {
        var index = this.parentNode.parentNode.parentNode.rowIndex;
        var cUrl = '/student/' + studentIDs[index-2];
        var option = confirm("删除操作不可恢复，是否继续？");
        if (option) {
            $.ajax({
                type: 'delete',
                url: cUrl,
                headers: {'Authorization': 'Bearer ' + token},
                data: {},
                success: function () {
                    var studentListTable = document.getElementById("student-list");
                    studentListTable.deleteRow(index);
                    studentIDs.splice(index-2, 1);
                    alert("删除成功！");
                    if (studentIDs.length == 0) {
                        document.getElementById("tip").style.display = "";
                    }
                },
                error: function(XMLHttpRequest) {
                    alert("AJAX error: " + XMLHttpRequest.status);
                }
            });
        }
    });
    $("#search-student-list").on('click', '.deleteBtn', function() {
        var index = this.parentNode.parentNode.parentNode.rowIndex;
        var cUrl = '/student/' + studentIDs1[index-2];
        var option = confirm("删除操作不可恢复，是否继续？");
        if (option) {
            $.ajax({
                type: 'delete',
                url: cUrl,
                headers: {'Authorization': 'Bearer ' + token},
                data: {},
                success: function () {
                    var studentListTable = document.getElementById("search-student-list");
                    studentListTable.deleteRow(index);
                    studentIDs.splice(index-2, 1);
                    alert("删除成功！");
                    if (studentIDs.length == 0) {
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
