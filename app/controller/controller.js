'use strict';

var JSON2 = require("JSON2");
var parse = require('co-body');
var setting = require('../../config/setting');
var map = require('../../config/map');

module.exports = {
    "login": function*() {
        yield this.render('login', {});
    },
    "dologin": function*() {
        var params = yield parse(this);
        if (params.username && params.userid) {
            this.session.user=params.username;
            this.redirect('/test');
        } else {
            var result = {
                "error": "请输入姓名和工号"
            };
            yield this.render('login', result);
        }
    },
    "test": function*() {
        var user = this.session.user;
        if(user){
            yield this.render('test', {"user":this.session.user,"time":setting.time});
        }else{
            this.redirect('/login');
        }
    },
    "submittest":function*(){
        var params = yield parse(this);
        var resultTOshow = {};
        var submitResult = JSON2.parse(params.examResult)
        var score =100;
        for(var key in map){
            if(submitResult[key] != map[key]){
                resultTOshow[key] = {"correct":map[key],"error":submitResult[key]};
                score--;
            }
        }
        console.log(JSON2.stringify(resultTOshow));
        yield this.render('testresult', {"result":JSON2.stringify(resultTOshow),"score":score});
    }

}