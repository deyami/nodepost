'use strict';
var koa = require('koa');
var _ = require('koa-route');
var session = require('koa-session');
var serve = require('koa-static');
var app = koa();

app.keys = "keys";
app.use(session({
    "key":'a_token',
    "maxAge":0
},app));

app.use(serve(__dirname + '/app/statics'));
app.use(serve(__dirname + '/app/views'));
//app.use(_.get('/index.htmll', pets.list));

module.exports = app;
