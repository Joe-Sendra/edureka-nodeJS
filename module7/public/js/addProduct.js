$('#addProduct').on('click', (event)=>{
    event.preventDefault();
    var formData = $('#addProductForm').serialize();
    $.ajax({
        url: '/api/products',
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