
var checkout = require("./../../2co"),
express = require('express'),
app = express.createServer(),
host = 'localhost',
port = 4000;

app.use(express.methodOverride());
app.use(app.router);

app.get('/', function(req, res) {
    res.send('Hello 2CO');
});

/*
 * Receive messages from 2CO Instant Notification System

checkout
    .notificationRoute('/notifications') // default route '/payments/2co/notifications'
    .fetchNotification(function(data,res){
        res.send(data);
    })
    .notificationHelper(app);
*/
/* Receive callbacks if order pending
checkout
    .scriptRoute('/2co/:pid?')  // default route '/payments/2co/callback/:pid?'
    .scriptCallback(function(pid,data,res){
        res.send(data);
    }).scriptHelper(app);

checkout
    .notificationRoute('/notifications') // default route '/payments/2co/notifications'
    .fetchNotification(function(data,res){
        res.send(data);
    })
    .notificationHelper(app);
*/

checkout
    .scriptRoute('/2co/:pid?')  // default route '/payments/2co/callback/:pid?'
    .scriptCallback(function(pid,data,res){
        res.send(data);
    })
    .notificationRoute('/notifications')
    .fetchNotification(function(data,res){
        res.send(data);
    })
    .shoppingCartRoute('/cart')
    .shoppingCartFiller(function(sess,data,cart,res){
        res.send(data);
    })
    .expressHelper(app);

app.listen(port,host);
