
var checkout = require("./../../2co");
var express = require('express');
var expressSession = require('express-session');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var app = express();
var host = 'localhost';
var port = 4000;

app.use(bodyParser());
app.use(methodOverride());
app.use(cookieParser());
app.use(expressSession({
    cookie: {
        maxAge: 60000 * 60
    },
    secret: "Wild 2CO"
}));

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
    .scriptCallback(function(pid, data, res){
        res.send(data);
    })
    .notificationRoute('/notifications')
    .fetchNotification(function(data, res){
        res.send(data);
    })
    .shoppingCartRoute('/cart')
    .shoppingCartFulfill(function(sess, data, cart, res){
        res.send(data);
    })
    .redirectTo('/')
    .expressHelper(app);

app.listen(port, host);
