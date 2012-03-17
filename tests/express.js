
var checkout = require("./../../2co"),
express = require('express'),
app = express.createServer(),
host = 'localhost',
port = 3000;

app.use(express.methodOverride());
app.use(app.router);

app.get('/', function(req, res) {
    res.send('Hello 2CO');
});

/*
 * Receive messages from 2CO Instant Notification System
 * Variant 1
 */
checkout
    .notificationRoute('/notifications') // default route '/payments/2co/notifications'
    .notificationCallback(function(req,res){
        var data = req.query || {};
        res.send(data);
    }).notificationHelper(app);
/*

 Variant 2

function callback(req,res){
    var data = req.query || {};
    res.send(data);
}
checkout
    .notificationRoute('/notifications')
    .notificationHelper(app, callback);

*/

/* Receive messages from 2CO Instant Notification System */
checkout
    .scriptRoute('/2co/:pid?')  // default route '/payments/2co/callback/:pid?'
    .scriptCallback(function(req,res){
        var data = req.query || {},
        pid = req.params.pid;
        res.send(data);
    }).scriptHelper(app);
/*

function callback(req,res){
    var data = req.query || {};
    res.send(data);
}
checkout.scriptHelper(app, callback);

*/


app.listen(port,host);
