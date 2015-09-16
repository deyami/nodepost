'use strict';

var _ = require('koa-route');
var session = require('koa-session');
var serve = require('koa-static');
var Controller = require('./app/controller/controller');
var app = require('xtpl/lib/koa')(require('koa')(),{
    views:'./app/views'
});

//var app= require('koa')();
app.keys = "keys";
app.use(session({
    "key":'a_token',
    "maxAge":0
},app));

app.use(serve(__dirname + '/app/statics'));
//app.use(serve(__dirname + '/app/views'));


app.use(_.get('/login',Controller.login));
app.use(_.post('/dologin',Controller.dologin));
app.use(_.get('/maptest',Controller.maptest));

module.exports = app;
