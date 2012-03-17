# 2CO
2CO is the module that will provide nodejs
adapters for [2checkout](http://www.2checkout.com/documentation/api/) API payment gateway.

## Installation

To install 2co:

    $ npm install 2co

## Usage overview

### Example

The list_products call is used to retrieve list of all products in account.

    var checkout = require("2co");

    /* Filter list results on product ID. Optional. */
    var product = {
         vendor_product_id:'your product id'
    };

    checkout.setAuth('USERNAME','PASSWORD');
    /* list_products method */
    checkout.exec('list_products',product);

    checkout.on('data',function(data){
       console.log(data);
    });

    checkout.on('error',function(error){
       console.log(error);
    });

### Instant Notification System
for Express:

    checkout
    .notificationRoute('/notifications') // default route '/payments/2co/notifications'
    .notificationCallback(function(req,res){
        var data = req.query || {};
        res.send(data);
    }).notificationHelper(app);


## Author

Aleksej Gordejev (aleksej@gordejev.lv). Development was sponsored by [Etvnet](http://etvnet.com/).

## License

(The MIT License)

Copyright (c) 2012 Aleksej Gordejev <aleksej@gordejev.lv>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.