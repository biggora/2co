/*
 ------   Input Parameters   -------
 sale_id
   Search for sale with this Sale ID. Optional.
 invoice_id
   Search for a Sale with this Invoice ID. Optional.
 customer_name
   Search for sales with this cardholder name.
   Must be at least 3 chars and can be substring of cardholder name.
   Case Insensitive. Optional.
 customer_email
   Search for sales with this customer email.
   Can be substring of the email. Case insensitive. Optional.
 customer_phone
   Search for sales with this phone number.
   Can be an incomplete number but must match from the beginning. Optional.
 vendor_product_id
   Search for sales with this product id. Can be substring of the id. Optional.
 ccard_first6
   Search for sales with these First 6 numbers of the credit card number. Optional.
 ccard_last2
   Search for sales with these Last 2 numbers of the credit card number. Optional.
 sale_date_begin
   Search for sales from this date to current date (or sale_date_end). Optional.
 sale_date_end
   Search for sales from beginning of time (or sale_date_begin) to this date. Optional.
 declined_recurrings
   Search for declined recurring sales. Optional.
 active_recurrings
   Search for active recurring sales. Optional.
 refunded
   Search for sales that have been refunded in full or partially. Optional.
 cur_page
   The page number to retrieve. First page = 1. Optional.
 pagesize
   Total rows per page. Possible values are 1-100. If pagesize not specified,
   default of 20 items per page will be assigned internally. Optional.
 sort_col
   The name of the column to sort on. Possibile values are sale_id,
   date_placed, customer_name, recurring, recurring_declined and usd_total.
   (case insensitive) Optional.
 sort_dir
   The direction of the sort process. (‘ASC’ or ‘DESC’) (case insensitive) Optional.
*/
var checkout = require("./../../2co"),
config = require("./conf");

var sales = {
    ccard_last2:12,
    sort_col:'date_placed',
    sort_dir:'desc'
};

checkout.setAuth(config.user,config.pass);
checkout.exec('list_sales',sales);

checkout.on('data',function(data){
    console.log(data);
});

checkout.on('error',function(error){
    console.log(error);
});