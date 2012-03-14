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

var twoco = function() {

    events.EventEmitter.call(this);

    this.version = '0.0.1';
    this.user = '';
    this.pass = '';
    this.apiHost = 'www.2checkout.com';
    this.apiMethods = methods;
    this.apiPort = 443;
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
        this.user = user;
        this.pass = pass;
    };
    this.exec = function(method, data) {
        var self = this,
        options = {
            host: self.apiHost,
            port: self.apiPort,
            path: self.apiMethods[method].url,
            method: self.apiMethods[method].method,
            auth = self.user + ':' + self.pass
        };

        if(self.user == '' || self.pass == '') {
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
};

util.inherits(twoco, events.EventEmitter);

module.exports = new twoco();
