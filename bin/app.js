#!/usr/bin/env node
'use strict';
var app = require('../app'),
    graceful = require('graceful');

var port = process.env.PORT || 6001;

var server = app.listen(port, function() {
    console.info('server listening on port ' + server.address().port);
});

graceful({
    server: server,
    killTimeout: 30 * 1000,
    error: function(err, throwErrorCount) {
        if (err.message) {
            err.message +=
                ' (uncaughtException throw ' + throwErrorCount +
                ' times on pid:' + process.pid + ')';
        }
        console.info(err);
    }
});
