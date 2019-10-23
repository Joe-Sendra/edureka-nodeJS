$('#btnLookupUser').on('click', (e)=>{
    e.preventDefault();
    const GIT_USERNAME = $('#gitHubUser')[0].value;
    $.ajax({
        type: 'GET',
        url: `/api/v1/${GIT_USERNAME}`,
        success: (userInfo) => {
            $('#gitHubUserInfo').html(`<h3>Data received from API below</h3> ${JSON.stringify(userInfo)}`);
        },
        error: (err) => {
            console.log(err);
            $('#gitHubUserInfo').text('There was an error fetching this users info');
        }
    });
});