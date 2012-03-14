# 2CO
2CO is the module that will provide nodejs
adapters for [2checkout](http://www.2checkout.com/documentation/api/) API payment gateway.

## Usage overview

### list_products

The list_products call is used to retrieve list of all products in account.

   var checkout = require("2co");

   var product = {
         vendor_product_id:'00001'
   };

   checkout.setAuth('USERNAME','PASSWORD');
   checkout.exec('list_products',product);

   checkout.on('data',function(data){
       console.log(data);
   });

   checkout.on('error',function(error){
       console.log(error);
   });


