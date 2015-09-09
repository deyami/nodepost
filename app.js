var koa = require('koa');
var views = require('co-views');
var app = koa();

var render = views(__dirname + '/views', { ext: 'ejs' });

var routes = require('./controller/controller');
var http = require('http');
var path = require('path');
var setting = require('./setting');
var filter = require('./controller/filter');
var RedisStore = require('connect-redis')(session);
var dbsetting = require('./model/dbsetting');


app.use(filter.sessionHandler);
routes(app);//执行路由


app.listen(app.get('port'), function () {
    console.log("server listening on port " + app.get('port'));
});
