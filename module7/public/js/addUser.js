$('#addUser').on('click', (event)=>{
    event.preventDefault();
    var formData = $('#addUserForm').serialize();
    $.ajax({
        url: '/api/auth/register',
        method: 'POST',
        headers: {Authorization: 'Bearer ' + localStorage.getItem('token')},
        data: formData,
        datatype: 'html',
        success: htmlResponse => {
            $('#dashBody').html(htmlResponse);
        },
        error: {}
    });
})