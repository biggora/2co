/*
 ------   Input Parameters   -------

 assigned_product_id
      Filter list results on 2CO ID. Optional.
 vendor_product_id
      Filter list results on product ID. Optional.
 name
      Filter list results on product name. Optional.
 cur_page
      The page number to retrieve. First page = 1. Optional.
 pagesize
      Total rows per page. Possible values are 1-100. If pagesize not specified,
      default of 20 items per page will be assigned internally. Optional.
 sort_col
      The name of the column to sort on. Possibile values are product_id, name,
      description, option_id, price, vendor_product_id, assigned_product_id, tangible,
      weight, handling, description, long_description, pending_url, approved_url,
      startup_fee, recurrence, duration, category_id, commission_amount and commission_type.
      (case insensitive) Optional.
 sort_dir
      The direction of the sort process. (‘ASC’ or ‘DESC’) (case insensitive) Optional.
*/
var checkout = require("./../../2co"),
config = require("./config");

var product = {
    vendor_product_id:'00001'
};

checkout.setAuth(config.user,config.pass);
checkout.exec('list_products',product);

checkout.on('data',function(data){
    console.log("Connection OK");
    console.log(data);
});

checkout.on('error',function(error){
    console.log("Connection Error");
    console.log(error);
});

