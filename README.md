# 2CO
2CO is the module that will provide [nodejs](http://nodejs.org/)
adapters for [2checkout](http://www.2checkout.com/documentation/api/) [API](http://www.2checkout.com/documentation/api/) payment gateway.

## Installation

Installation is done using the Node Package Manager (npm). If you don't have npm installed on your system you can download it from [npmjs.org](http://npmjs.org/).
To install 2co:

    $ npm install -g 2co

## Usage overview

### Example

The list_products call is used to retrieve list of all products in account.

    var checkout = require('2co');

    /* Filter list results on vendor product ID. Optional. */
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

    var checkout = require('2co'),
    express = require('express'),
    app = express.createServer(),
    host = 'localhost',
    port = 3000;

    app.use(app.router);

    checkout
         .notificationRoute('/notifications') // default route '/payments/2co/notifications'
         .fetchNotification(function(data,res){
                res.send(data);
         })
         .notificationHelper(app);

    app.listen(port,host);

### Handling Approved URL
for Express:

    /* Callbacks if an order is immediately approved */
    checkout
          .scriptRoute('/2co/:pid?')  // default route '/payments/2co/callback/:pid?'
          .scriptCallback(function(pid,data,res){
                 res.send(data);
          })
          .scriptHelper(app);


## In the Wild

The following projects use 2co.

If you are using 2co in a project, app, or module, get on the list below
by getting in touch or submitting a pull request with changes to the README.

### Startups & Apps

- [TViMama](http://tvimama.com/)
- [GorkaTV](https://gorkatv.com/)



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


## Resources

- Visit the [author website](http://www.gordejev.lv).
- Follow [@biggora](https://twitter.com/#!/biggora) on Twitter for updates.
- Report issues on the [github issues](https://github.com/biggora/2co/issues) page.