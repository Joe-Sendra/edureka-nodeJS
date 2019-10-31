$(document).ready(()=>{
    $('#newsListTable').DataTable();

    $('.deleteNewsItem').on('click', (event)=>{
        newsId = $('#'+event.currentTarget.id).parents()[1].id
        $.ajax({
            type: 'DELETE',
            url: '/admin/news',
            headers: {Authorization: 'Bearer ' + localStorage.getItem('token')},
            data: {newsId: newsId},
            error: (err) => {
                if (err.status === 401) {
                    displayErrorMessage('You are not authorized, please try logging in.')
                } else {
                    displayErrorMessage('Something went wrong: ' + err.responseText)
                }
            }
        }).done(
            $.ajax({
                url: '/admin/newsList',
                type: 'GET',
                dataType: "html",
                // headers: {Authorization: 'Bearer ' + localStorage.getItem('token')},
                success: (formHtml) => {$('#dashBody').html(formHtml)},
                error: (err) => {
                    if (err.status === 401) {
                        displayErrorMessage('You are not authorized, please try logging in.')
                    } else {
                        displayErrorMessage('Something went wrong: ' + err.responseText)
                    }
                }
            })
        );
    });

    $('.editNewsItem').on('click', (event)=>{
        newsId = $('#'+event.currentTarget.id).parents()[1].id
        $.ajax({
            type: 'POST',
            url: '/admin/news/edit',
            headers: {Authorization: 'Bearer ' + localStorage.getItem('token')},
            data: {newsId: newsId},
            success: (formHtml) => {$('#dashBody').html(formHtml)},
            error: (err) => {
                if (err.status === 401) {
                    displayErrorMessage('You are not authorized, please try logging in.')
                } else {
                    displayErrorMessage('Something went wrong: ' + err.responseText)
                }
            }
        });
    });
});