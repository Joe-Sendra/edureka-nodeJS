$('#btnLookupUser').on('click', (e)=>{
    e.preventDefault();
    const GIT_USERNAME = $('#gitHubUser')[0].value;
    $.ajax({
        type: 'GET',
        url: `/api/v1/${GIT_USERNAME}`,
        success: (userInfo) => {
            $('#gitHubUserInfo').text(JSON.stringify(userInfo));
        },
        error: (err) => {
            console.log(err);
            $('#gitHubUserInfo').text('There was an error fetching this users info');
        }
    });
});