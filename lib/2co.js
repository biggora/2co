/**
 * @created     2012-03-11 16:10:00
 * @category    Payments Gatways
 * @package     2CO
 * @version     0.0.4
 * @copyright   Copyright (c) 2009-2012 - All rights reserved.
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

    this.version = '0.0.4';
    this._user = '';
    this._pass = '';
    this._apiHost = 'www.2checkout.com';
    this._apiMethods = methods;
    this._apiPort = 443;
    this._scriptRoute = '/payments/2co/callback/:pid?';
    this._notificationRoute = '/payments/2co/notifications';
    this._shoppingCartRoute = '/payments/2co/shoppingcart';
    this._redirectTo = '/';
    this.redirectTo = function(route) {
        if (!route) {
            return this._redirectTo;
        }
        this._redirectTo = route;
        return this;
    };
    this.notificationRoute = function(route) {
        if (!route) {
            return this._notificationRoute;
        }
        this._notificationRoute = route;
        return this;
    };
    this.scriptRoute = function(route) {
        if (!route) {
            return this._scriptRoute;
        }
        this._scriptRoute = route;
        return this;
    };
    this.apiHost = function(host) {
        if (!host) {
            return this._apiHost;
        }
        this._apiHost = host;
        return this;
    };
    this.getVersion = function() {
        return this.version;
    };
    this.get = function(variable) {
        return this[variable];
    };
    this.set = function(variable, value) {
        this[variable] = value;
    };
    this.setAuth = function(user, pass) {
        this._user = user;
        this._pass = pass;
    };
    this._shoppingCartFulfill = function(req, res) {
        var data = req.query || {};
        res.send(data);
    };
    this.shoppingCartFulfill = function(callback) {
        var self = this;

        if (typeof callback !== 'function') {
            return self._shoppingCartFulfill;
        }
        self._shoppingCartFulfill = function(req, res) {
            var data = req.query || {},
                    sess = req.session || {},
                    cart = sess.cart || {};
            callback(sess, data, cart, res, req);
        };
        return self;
    };
    this._scriptCallback = function(req, res) {
        var data = req.query || {};
        res.send(data);
    };
    this.scriptCallback = function(callback) {
        var self = this;
        if (typeof callback !== 'function') {
            return self._scriptCallback;
        }
        self._scriptCallback = function(req, res) {
            var getdata = req.query || {},
                    postdata = req.body || {},
                    data = {},
                    pid = req.params.pid;

            for (var key in getdata) {
                if (getdata.hasOwnProperty(key)) {
                    data[key] = getdata[key];
                }
            }
            for (var key in postdata) {
                if (postdata.hasOwnProperty(key)) {
                    data[key] = postdata[key];
                }
            }
            callback(pid, data, res, req);
        };
        return self;
    };
    this._notificationCallback = function(req, res) {
        var data = req.body || {};
        res.send(data);
    };
    this.fetchNotification = function(callback) {
        var self = this;
        if (typeof callback !== 'function') {
            return self._notificationCallback;
        }
        self._notificationCallback = function(req, res) {
            var data = req.body || {};
            callback(data, res, req);
        };
        return self;
    };
    this.exec = function(method, data) {
        var self = this,
                options = {
                    host: self._apiHost,
                    port: self._apiPort,
                    path: self._apiMethods[method].url,
                    method: self._apiMethods[method].method,
                    auth: self._user + ':' + self._pass
                };
        if (self._user === '' || self._pass === '') {
            self.emit('error', 'Missing username or password');
        }
        else {
            self.run(options, data);
        }
    };

    this.run = function(options, data) {
        var self = this;

        options.headers = {
            'User-Agent': 'Nodejs 2CO',
            'Accept': 'application/json'
        };

        try {
            var request = https.request(options, function(response) {
                var result = '';
                response.setEncoding('utf8');
                response.on('data', function(chunk) {
                    result += chunk;
                });
                response.on("end", function() {
                    self.fetchData(result);
                });
            });

            request.on('error', function(e) {
                self.emit('error', e.message);
            });

            request.on('close', function(errno) {
                self.emit('close', errno || null);
            });
            request.write(querystring.stringify(data), 'utf-8');
            request.end();
        }
        catch (error) {
            self.emit('error', error);
        }
    };
    this.fetchData = function(result) {
        var self = this;
        try {
            result = JSON.parse(result);
            if (result.errors === 'undefined') {
                self.emit('data', result);
            } else {
                self.emit('error', result.errors);
            }
        }
        catch (error) {
            self.emit('error', error);
        }
    };
    this.shoppingCartRoute = function(route) {
        if (!route) {
            return this._shoppingCartRoute;
        }
        this._shoppingCartRoute = route;
        return this;
    };
    this.notificationHelper = function(app, callback) {
        var self = this;
        if (typeof callback !== 'function') {
            callback = self.fetchNotification();
        }
        app.get(self.notificationRoute(), callback);
        app.post(self.notificationRoute(), callback);
        return self;
    };
    this.scriptHelper = function(app, callback) {
        var self = this;
        if (typeof callback !== 'function') {
            callback = self.scriptCallback();
        }
        app.get(self.scriptRoute(), callback);
        app.post(self.scriptRoute(), callback);
        return self;
    };
    this.shoppingCartFulfill = function(callback) {
        var self = this;
        return function(req, res) {
            var getdata = req.query || {},
                    postdata = req.body || {},
                    data = {},
                    sess = req.session,
                    cart = sess.cart;

            for (var key in getdata) {
                if (getdata.hasOwnProperty(key)) {
                    data[key] = getdata[key];
                }
            }
            for (var key in postdata) {
                if (postdata.hasOwnProperty(key)) {
                    data[key] = postdata[key];
                }
            }
            callback(sess, data, cart, res);
        };
    };
    this.expressHelper = function(app) {
        var self = this;
        ['get', 'post'].forEach(function(method) {
            app[method](self.scriptRoute(), self.scriptCallback());
            app[method](self.notificationRoute(), self.fetchNotification());
            app[method](self.shoppingCartRoute(), self.shoppingCartFulfill());
        });

        var dynHelper = {
            checkout: function(req, res) {
                var ch = {}
                , sess = req.session;
                // Copy the session.checkout properties over
                var cart = sess.cart;
                for (var k in cart) {
                    ch[k] = cart[k];
                }
                return ch;
            }
        };

        if ('function' === typeof app.dynamicHelpers) {
            app.dynamicHelpers(dynHelper);
        } else if ('function' === typeof app.locals) {
            app.locals(dynHelper);
        } else {
            app.locals.checkout = dynHelper.checkout;
        }
        return self;
    };
};

util.inherits(tco, events.EventEmitter);

module.exports = new tco();
