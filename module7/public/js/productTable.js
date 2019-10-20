$(document).ready(()=>{
    $('#availableProductsTable').DataTable();
});

$('.addProductToCart').on('click', (event)=>{
    $.ajax({
        type: 'POST',
        url: '/api/cart/addItemCart',
        headers: {Authorization: 'Bearer ' + localStorage.getItem('token')},
        data: {cartOwner: localStorage.getItem('id') , productAdded : event.target.id},
        success: ()=>{
            refreshCartOnly();
        },
        error: (error)=>{console.log("Error: ", error)}
    });
});

function refreshCartOnly(){
    $.ajax({
        type: 'POST',
        url: '/api/cart/list',
        headers: {Authorization: 'Bearer ' + localStorage.getItem('token')},
        data:  {ownerID: localStorage.getItem('id')},
        success: (cartHTML)=>{
            $('#cartDiv').html(cartHTML);
        },
        error: (err)=>{
            console.log(err);
        }
    });        
};