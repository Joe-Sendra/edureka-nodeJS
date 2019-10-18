$(document).ready( function () {
    $('#availableProductsTable').DataTable();
    $('.addProductToCart').on('click', (event)=>{
        console.log(event);
        // Need to add event.target.id to shopping cart
        // POST http://localhost:3000/api/cart/addItemCart
        // {"cartOwner": "5da0bbcf312b524c6c533d43", "productAdded": "5d9cf2eec80df25630e28919"}
        $.ajax({
            type: 'POST',
            url: '/api/cart/addItemCart',
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify({"cartOwner": $('.user')[0].id , "productAdded" : event.target.id}),
            success: ()=>{
                // TODO refresh cart data
            },
            error: (error)=>{console.log("Error: ", error)}
        });
    });
});