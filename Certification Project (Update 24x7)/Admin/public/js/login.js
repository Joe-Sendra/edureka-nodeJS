$(document).ready(()=>{
    $("#loginForm").submit((event)=>{
        event.preventDefault();
        var form_data = $(event.target).serialize();
        $.ajax({
            type: 'POST',
            url: '/api/v1/auth/login',
            data: form_data,
            success: (data)=>{
                // Save token & id
                localStorage.setItem('token', data.token);
                localStorage.setItem('id', data.id);
                // Redirect to dashboard
                location.href = '/admin';                
            },
            error: (response)=>{
                console.log(response.responseJSON);
                if (response.responseJSON.errorMsg) {
                    $('#errorMessage').css('display', 'block').text(response.responseJSON.errorMsg);
                    $('#successMessage').css('display', 'none');
                }
            }
        });            
    });
    $("#registerForm").submit((event)=>{
        event.preventDefault();
        var form_data = $(event.target).serialize();
        $.ajax({
            type: 'POST',
            url: '/api/v1/users',
            data: form_data,
            success: (response)=>{
                if (response.successMsg) {
                    $('#successMessage').css('display', 'block').text(response.successMsg);
                    $('#errorMessage').css('display', 'none');
                    $('#registerForm')[0].reset();
                    $('#loginForm')[0].reset();
                    $('#email').focus();
                }
            },
            error: (response)=>{
                console.log(response.responseJSON);
                if (response.responseJSON.errorMsg) {
                    $('#errorMessage').css('display', 'block').text(response.responseJSON.errorMsg);
                    $('#successMessage').css('display', 'none');
                }
            }
        });            
    });
});