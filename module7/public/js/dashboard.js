$(document).ready(()=>{
    $.ajax({
        type: 'GET',
        url: '/dashboard/menu',
        headers: {Authorization: 'Bearer ' + localStorage.getItem('token')},
        success: (menuHTML)=>{
            $('#dashMenu').html(menuHTML);
        },
        error: (err)=>{
            console.log(err);
        }
    }).done(()=>{
        $('#btnLogout').on('click',()=>{
            localStorage.clear();
            location.href = '/';
        });
        $('#btnAddUser').on('click',()=>{            
            $.ajax({
                type: 'GET',
                url: '/users/addUser',
                dataType: "html",
                headers: {Authorization: 'Bearer ' + localStorage.getItem('token')},
                success: (addUserHTML)=>{
                    $('#dashBody').html(addUserHTML);
                },
                error: (err)=>{
                    console.log(err);
                }
            });
        });
        $('#btnViewUsers').on('click',()=>{
            $.ajax({
                type: 'GET',
                url: '/users/list',
                dataType: "html",
                headers: {Authorization: 'Bearer ' + localStorage.getItem('token')},
                success: (usersHTML)=>{
                    $('#dashBody').html(usersHTML);
                },
                error: (err)=>{
                    console.log(err);
                }
            });
        });
        $('#btnAddProduct').on('click',()=>{
            $.ajax({
                type: 'GET',
                url: '/api/products/addProduct',
                headers: {Authorization: 'Bearer ' + localStorage.getItem('token')},
                success: (addProductHTML)=>{
                    $('#dashBody').html(addProductHTML);
                },
                error: (err)=>{
                    console.log(err);
                }
            });
        });
        $('#btnViewProducts').on('click',()=>{
            $.ajax({
                type: 'POST',
                url: '/api/products/list',
                data:  {viewonly : true},
                success: (productHTML)=>{
                    $('#dashBody').html(productHTML);
                },
                error: (err)=>{
                    console.log(err);
                }
            });
        });
        $('#btnViewCart').on('click',()=>{
            renderCart();
        });
    });

    // Load shopping cart as default view
    renderCart();
    
    function renderCart(){
        $.ajax({
            type: 'POST',
            url: '/api/cart/list',
            headers: {Authorization: 'Bearer ' + localStorage.getItem('token')},
            data:  {ownerID: localStorage.getItem('id')},
            success: (cartHTML)=>{
                $('#dashBody').html(`<div id="cartDiv">${cartHTML}</div>`);
                $.ajax({
                    type: 'POST',
                    url: '/api/products/list',
                    data:  {viewonly : false},
                    success: (productHTML)=>{
                        $('#dashBody').append(`<div id="productDiv">${productHTML}</div>`);
                    },
                    error: (err)=>{
                        console.log(err);
                    }
                })
            },
            error: (err)=>{
                console.log(err);
            }
        });
    };
    
});

