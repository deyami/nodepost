'use strict';

var JSON2 = require("JSON2");
var parse = require('co-body');

module.exports = {
    "login": function*() {
        yield this.render('login', {});
    },
    "dologin": function*() {
        var params = yield parse(this);
        if (params.username && params.userid) {
            this.redirect('/maptest');
            //yield this.render('maptest', {"username:":params.username,"userid":params.userid});
        } else {
            var result = {
                "error": "请输入姓名和工号"
            };
            yield this.render('login', result);
        }
    },
    "maptest": function*() {
        yield this.render('maptest', {});
    }

}