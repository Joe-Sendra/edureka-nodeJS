$('#contactUsForm').on('submit', (e) => {
    e.preventDefault();
    $.ajax({
        type: 'POST',
        url: '/sendOrderEmail',                    
        data: {
            email: $('#email')[0].value,
            query: $('#query')[0].value
        },
        success: (data)=>{
            document.getElementById("contactUsForm").reset();
            if (data.errorMsg) {
                $('#errorMessage').css('display','block');
                $('#errorMessage').text(data.errorMsg);
            } else {
                $('#errorMessage').css('display','none');
            }
            if (data.successMsg) {
                $('#successMessage').css('display','block');
                $('#successMessage').text(data.successMsg);
            } else {
                $('#successMessage').css('display','none');
            }
        },
        error: ()=>{
            console.log("Error: Can not send email");
        }
    })
});