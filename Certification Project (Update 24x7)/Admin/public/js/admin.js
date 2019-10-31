$(document).ready(() => {
    let name = localStorage.getItem('name');
    let email = localStorage.getItem('email');
    $('#userInfo').html(`User Name: ${name}, Email: ${email}`);
});
$('#btnNewsForm').on('click', (e) => {
    clearMessages();
    $.ajax({
        url: '/admin/news/add',
        type: 'GET',
        dataType: "html",
        headers: {Authorization: 'Bearer ' + localStorage.getItem('token')},
        success: (formHtml) => {$('#dashBody').html(formHtml)},
        error: (err) => {
            if (err.status === 401) {
                displayErrorMessage('You are not authorized, please try logging in.')
            } else {
                displayErrorMessage('Something went wrong: ' + err.responseText)
            }
        }
    });
});

$('#btnEditNews').on('click', (e) => {
    clearMessages();
    $.ajax({
        url: '/admin/news',
        type: 'GET',
        dataType: "html",
        headers: {Authorization: 'Bearer ' + localStorage.getItem('token')},
        success: (formHtml) => {$('#dashBody').html(formHtml)},
        error: (err) => {
            if (err.status === 401) {
                displayErrorMessage('You are not authorized, please try logging in.')
            } else {
                displayErrorMessage('Something went wrong: ' + err.responseText)
            }
        }
    });
});

$('#btnLogout').on('click', (e) => {
    localStorage.clear();
    location.href = '/';
    
});

function clearMessages(){
    $('#successMessage').css('display', 'none').text(null);
    $('#errorMessage').css('display', 'none').text(null);
}

function displaySuccessMessage(msg){
    $('#successMessage').css('display', 'block').text(msg);
    $('#errorMessage').css('display', 'none');
}

function displayErrorMessage(msg){
    $('#errorMessage').css('display', 'block').text(msg);
    $('#successMessage').css('display', 'none');
}