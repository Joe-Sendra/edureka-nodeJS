$(document).ready(()=>{
    $("#addOrderForm").submit((event)=>{
        event.preventDefault();
        var form_data = $(event.target).serialize();
        $.ajax({
            type: 'POST',
            url: '/addData',
            data: form_data,
            success: (data)=>{
                $('#addOrderForm').trigger("reset");
                if (data.errorMsg) {
                    $('#errorMessage').css('display','block');
                } else {
                    $('#errorMessage').css('display','none');
                    $('#errorMessage').text(data.errorMsg);
                }
                if (data.successMsg) {
                    $('#successMessage').css('display','block');
                    $('#successMessage').text(data.successMsg);
                } else {
                    $('#successMessage').css('display','none');
                }  
            },
            error: ()=>{
                alert('No data');
            }
        });            
    });
});
