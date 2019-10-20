$(document).ready(()=>{
    $("#loginForm").submit((event)=>{
        event.preventDefault();
        var form_data = $(event.target).serialize();
        $.ajax({
            type: 'POST',
            url: '/api/auth/login',
            data: form_data,
            success: (data)=>{
                // Save token & id
                localStorage.setItem('token', data.token);
                localStorage.setItem('id', data.id);
                // Redirect to dashboard
                location.href = '/dashboard';                
            },
            error: ()=>{
                alert('Error logging in');
            }
        });            
    });
});