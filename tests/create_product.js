/*
 -----  Product info ------
 name
     Product Name. Required.
 price
     Product Price. Required.
 vendor_product_id
     Vendor Assigned Product ID. Optional.
 description
     Product Short Description. Optional.
 long_description
     Product Long Description. Optional.
 pending_url
     Product Pending URL. Optional.
 approved_url
     Product Approved URL. Optional.
 tangible
     Tangible=1, Intangible=0. Optional.
 weight
     Decimal value of weight. Required for tangible products.
 handling
     Specifies handling charge if applicable. Required for tangible products.
 recurring
     1 = recurring, 0 = non-recurring. Required for recurring products.
 startup_fee
     Specifies start up fee if applicable. Optional.
 recurrence
     Specifies recurrence frequency (n Week|Month|Year), if applicable.
     Required for recurring products.
 duration
     Specifies recurrence duration (n Week|Month|Year|Forever),
     if applicable. Required for recurring products.
 commission
     1 = commission, 0 = no commission. Required for affiliate products.
 commission_type
      Sets commission type for product. Possible values: amount, percentage.
      Required for affiliate products.
 commission_amount
      Sets commission value for product (based on commission_type).
      Required for affiliate products.
 option_id
      Accepts single or multiple option IDs to assign to product.
      (multiple IDs would be &option_id=xxxxxxxxx repeated for each ID to assign,
      where xxxxxxxxx represents each ID value to assign.) Optional.
 category_id
      Accepts single or multiple category IDs to assign product to.
      (multiple IDs would be &category_id=xxxxxxxxx repeated for each ID to assign,
      where xxxxxxxxx represents each ID value to assign.) Optional. See Valid
      Category IDs section below for defenetions.

 For more details see http://www.2checkout.com/documentation/api/products-create_product/

 */

var checkout = require("2co");

var product = {
    name:'New iPad',
    price:'500.00',
    pending_url:'http://youhost/payments/2co/callback/0001',
    approved_url:'http://youhost/payments/2co/callback/0001',
    vendor_product_id:'0001',
    description:'New iPad',
    long_description:'New iPad'
};

checkout
    .exec('create_product',product)
    .on('data',function(data){
        console.log("Connection OK");
        console.log(data);
    });