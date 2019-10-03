var id;
var to_be_emailed;

$(document).ready(()=>{
    $('.email').on('click',(e) => {
        id = e.target.id;
        $.ajax({
            type: 'GET',
            url: '/orders/' + id,            
            success: (data)=>{
                var order = {...data, status:''};
                var orderDate = new Date(data.date);
                var dateDiff = ((Date.now() - orderDate.getTime()) / (1000 * 3600 * 24));
                if (dateDiff < 1) {
                    order.status = "In Progress"
                } else if (dateDiff < 2 ) {
                    order.status = "Dispatched"
                } else if (dateDiff >= 2) {
                    order.status = "Delivered"
                }
                console.log("Need to use Sendgrid to email data", order, dateDiff, orderDate.getTime(), Date.now());
                },
            error: function(){
                alert('No data');
            }
        });
    });
});