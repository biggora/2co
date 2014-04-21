/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var express = require('express');
var checkout = require('../lib/2co');
var app = express();

exports['2CO methods'] = function(test) {
    test.equal(typeof checkout.scriptRoute, 'function');
    test.equal(typeof checkout.scriptCallback, 'function');
    test.equal(typeof checkout.notificationRoute, 'function');
    test.equal(typeof checkout.fetchNotification, 'function');
    test.equal(typeof checkout.shoppingCartRoute, 'function');
    test.equal(typeof checkout.shoppingCartFulfill, 'function');
    test.equal(typeof checkout.redirectTo, 'function');
    test.equal(typeof checkout.expressHelper, 'function');
    test.done();
};

exports['2CO expressHelper'] = function(test) {
    checkout.expressHelper(app);
    var stack = app._router.stack;
    test.ok(app.locals.checkout, 'checkout');
    test.equal(typeof app.locals.checkout, 'function');
    test.ok(stack.length, 'stack');
    test.equal(stack.length, 8);
    test.done();
};

/*
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
 */