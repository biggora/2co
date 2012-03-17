/**
 * @created     2012-03-11 16:10:00
 * @category    Payments Gatways
 * @package     2CO
 * @version     0.0.1
 * @copyright   Copyright (c) 2009-2011 - All rights reserved.
 * @license     MIT License
 * @author      Alexey Gordeyev IK <aleksej@gordejev.lv>
 * @link        http://www.gordejev.lv
 */

var events = require('events'),
querystring = require('querystring'),
util = require('util'),
https = require('https'),
methods = require('./methods.js');

var tco = function() {

    events.EventEmitter.call(this);

    this.version = '0.0.1';
    this._user = '';
    this._pass = '';
    this._apiHost = 'www.2checkout.com';
    this._apiMethods = methods;
    this._apiPort = 443;
    this._callback = '';
    this._scriptRoute = '/payments/2co/callback/:pid?';
    this._notificationRoute = '/payments/2co/notifications';
    this.notificationRoute = function(route){
        return (!route)?this._notificationRoute:this._notificationRoute = route;
    };
    this.scriptRoute = function(route){
        return (!route)?this._scriptRoute:this._scriptRoute = route;
    };
    this.apiHost = function(host){
        return (!host)?this._apiHost:this._apiHost = host;
    };
    this.getVersion = function(){
        return this.version;
    };
    this.get = function(variable){
        return this[variable];
    };
    this.set = function(variable,value){
        this[variable] = value;
    };
    this.setAuth = function(user,pass){
        this._user = user;
        this._pass = pass;
    };
    this._scriptCallback = function(req,res) {
        var data = req.query || {};
        res.send(data);
    };
    this.scriptCallback = function(callback) {
        var self = this;
        return (typeof callback == 'function')?this._scriptCallback = callback:this._scriptCallback;
    };
    this._notificationCallback = function(req,res) {
        var data = req.query || {};
        res.send(data);
    };
    this.notificationCallback = function(callback) {
        var self = this;
        return (typeof callback == 'function')?this._notificationCallback = callback:this._notificationCallback;
    };
    this.exec = function(method, data) {
        var self = this,
        options = {
            host: self._apiHost,
            port: self._apiPort,
            path: self._apiMethods[method].url,
            method: self._apiMethods[method].method,
            auth : self._user + ':' + self._pass
        };
        if(self._user == '' || self._pass == '') {
            self.emit('error','Missing username or password');
        }
        else {
            self.run(options, data);
        }
    };

    this.run = function(options,data){
        var self = this;

        options.headers = {
            'User-Agent':'Nodejs 2CO',
            'Accept': 'application/json'
        };

        try {
            var request = https.request(options, function(response) {
                var result = '';
                response.setEncoding('utf8');
                response.on('data', function (chunk) {
                    result += chunk;
                });
                response.on( "end", function () {
                    self.fetchData(result);
                });
            });

            request.on('error', function(e) {
                self.emit('error',e.message);
            });

            request.on( 'close', function ( errno ) {
                self.emit('close', errno || null);
            } );
            request.write( querystring.stringify(data), 'utf-8' );
            request.end();
        }
        catch(error) {
            self.emit('error',error);
        }
    };
    this.fetchData = function(result) {
        var self = this;
        try {
            result = JSON.parse(result);
            if(result.errors === 'undefined') {
                self.emit('data',result);
            } else {
                self.emit('error',result.errors);
            }
        }
        catch(error) {
            self.emit('error', error);
        }
    };
    this.notificationHelper = function(app, callback){
        var self = this;
        if(typeof callback != 'function') {
            callback = self.notificationCallback();
        }
        app.get(self.notificationRoute(), callback);
        app.post(self.notificationRoute(), callback);
    };
    this.scriptHelper = function(app, callback){
        var self = this;
        if(typeof callback != 'function') {
            callback = self.scriptCallback();
        }
        app.get(self.scriptRoute(), callback);
        app.post(self.scriptRoute(), callback);
    };
    this.expressHelper = function(app){
        var self = this;
        ['get', 'post'].forEach(function(method){
            app[method](self.scriptRoute(), self.scriptCallback());
            app[method](self.notificationRoute(), self.notificationCallback());
        });
    };
};

util.inherits(tco, events.EventEmitter);

module.exports = new tco();
