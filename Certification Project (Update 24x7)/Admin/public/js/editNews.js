$("#editNewsForm").submit((event)=>{
    event.preventDefault();
    var form_data = $(event.target).serialize();
    $.ajax({
        type: 'PATCH',
        url: '/api/v1/news/' + $('#_id')[0].value,
        data: form_data,
        headers: {Authorization: 'Bearer ' + localStorage.getItem('token')},
        success: (data)=>{
            $('#errorMessage').css('display', 'none');
            $('#successMessage').css('display', 'block').text(data.message);
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