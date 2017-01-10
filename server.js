'use strict';

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var port = process.env.PORT || 8000;
var path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTION');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Start server
server.listen(port, process.env.OPENSHIFT_NODEJS_IP || process.env.IP || undefined, function () {
    console.log('Express server listening on %d, in %s mode', port, app.get('env'));
});


exports = module.exports = app;
