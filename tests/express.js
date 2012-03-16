/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


var checkout = require("./../../2co"),
express = require('express'),
app = express.createServer(),
host = 'localhost',
port = 3000;

app.use(express.methodOverride());
app.use(app.router);

app.get('/', function(req, res) {
    res.send('hello world');
});

checkout.notificationCallback(function(req,res){
    var data = req.query || {};
    res.send('Custom Callback');
});

checkout.notificationHelper(app);

app.listen(port,host);
/*
var app = require('express').createServer();

app.get('/', function(req, res){
  res.send('hello world');
});

app.listen(3000);
 */