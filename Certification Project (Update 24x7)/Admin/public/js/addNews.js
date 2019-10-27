$("#addNewsForm").submit((event)=>{
    event.preventDefault();
    var form_data = $(event.target).serialize();
    $.ajax({
        type: 'POST',
        url: '/admin/news',
        data: form_data,
        headers: {Authorization: 'Bearer ' + localStorage.getItem('token')},
        success: (data)=>{
            $('#errorMessage').css('display', 'none');
            $('#successMessage').css('display', 'block').text(data.message);
            $('#addNewsForm')[0].reset();
        },
        error: (response)=>{
            console.log(response.responseJSON);
            if (response.responseJSON.message  || response.responseJSON.errorMsg) {
                $('#errorMessage').css('display', 'block').text(response.responseJSON.message || response.responseJSON.errorMsg.message);
                $('#successMessage').css('display', 'none');
            }
        }
    });            
});