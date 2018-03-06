
//Load Data in Table when documents is ready
$(document).ready(function () {
    loadData();
});

//Load Data function
function loadData() {
    $.ajax({
        url: "/Student/List",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.USN + '</td>';
                html += '<td>' + item.Name + '</td>';
                html += '<td>' + item.Course + '</td>';
                html += '<td>' + item.DOB + '</td>';
             
                html += '<td>' + item.Email + '</td>';
                html += '<td>' + item.Contact + '</td>';
                html += '<td><a href="#" onclick="return getbyID(' + item.USN + ')">Edit</a> | <a href="#" onclick="Delele(' + item.USN + ')">Delete</a></td>';
                html += '</tr>';
            });
            $('.tbody').html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Add Data Function 
function Add() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var sdtObj = {
        USN: $('#USN').val(),
        Name: $('#Name').val(),
        Course: $('#Course').val(),
        DOB: $("#DOB").val("dd/MM/yyyy hh:mm"),
        //DOB: $("#DOB").val($.format.DOB('dd MM yyyy')),
        Email: $('#Email').val(),
        Contact: $('#Contact').val()
    };
    $.ajax({
        url: "/Student/Add",
        data: JSON.stringify(sdtObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Function for getting the Data Based upon Employee ID
function getbyID(EmpID) {
    $('#Name').css('border-color', 'lightgrey');
    $('#Course').css('border-color', 'lightgrey');
    $('#DOB').css('border-color', 'lightgrey');
    $('#Email').css('border-color', 'lightgrey');
    $('#Contact').css('border-color', 'lightgrey');
    $.ajax({
        url: "/Student/getbyID/" + EmpID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#USN').val(result.USN);
            $('#Name').val(result.Name);
            $('#Course').val(result.Course);
            $('#DOB').val(result.DOB);
            $('#Email').val(result.Email);
            $('#Contact').val(result.Contact);

            $('#myModal').modal('show');
            $('#btnUpdate').show();
            $('#btnAdd').hide();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}

//function for updating employee's record
function Update() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var sdtObj = {
        USN: $('#USN').val(),
        Name: $('#Name').val(),
        Course: $('#Course').val(),
        DOB: $("#DOB").val("dd/MM/yyyy hh:mm"),
        //DOB: $("#DOB").val($.format.DOB('dd MM yyyy')),
        Email: $('#Email').val(),
        Contact: $('#Contact').val(),
    };
    $.ajax({
        url: "/Student/Update",
        data: JSON.stringify(sdtObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');

            $('#USN').val("");
            $('#Name').val("");
            $('#Course').val("");
            $("#DOB").val(""),
          //  $('#DOB').val("");
            $('#Email').val("");
            $('#Contact').val("");
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//function for deleting employee's record
function Delele(Id) {
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $.ajax({
            url: "/Student/Delete/" + Id,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                loadData();
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}

//Function for clearing the textboxes
function clearTextBox() {
    $('#USN').val("");
    $('#Name').val("");
    $('#Course').val("");
    $('#DOB').val("");
    $('#Email').val("");
    $('#Contact').val("");

    $('#btnUpdate').hide();
    $('#btnAdd').show();

    $('#Name').css('border-color', 'lightgrey');
    $('#Course').css('border-color', 'lightgrey');
    $('#DOB').css('border-color', 'lightgrey');
    $('#Email').css('border-color', 'lightgrey');
    $('#Contact').css('border-color', 'lightgrey');
}
//Valdidation using jquery
function validate() {
    var isValid = true;
    if ($('#Name').val().trim() == "") {
        $('#Name').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Name').css('border-color', 'lightgrey');
    }

    if ($('#Course').val().trim() == "") {
        $('#Course').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Course').css('border-color', 'lightgrey');
    }

    if ($('#DOB').val().trim() == "") {
        $('#DOB').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#DOB').css('border-color', 'lightgrey');
    }

    if ($('#Email').val().trim() == "") {
        $('#Email').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Email').css('border-color', 'lightgrey');
    }
    if ($('#Contact').val().trim() == "") {
        $('#Contact').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Contact').css('border-color', 'lightgrey');
    }
    return isValid;
}