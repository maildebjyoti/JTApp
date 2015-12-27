/*jshint node:true*/
'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var logger = require('morgan');
var port = process.env.PORT || 8080;
var four0four = require('./server/utils/404')();

var db = require('./server/db');
var mongoUri = 'mongodb://localhost:27017/mydb';

var environment = process.env.NODE_ENV;

app.use(favicon(__dirname + '/server/favicon.ico'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(logger('dev'));

app.use('/api', require('./server/routes'));

console.log('About to crank up node');
console.log('PORT=' + port);
console.log('NODE_ENV=' + environment);

switch (environment){
    case 'build':
        console.log('** BUILD **');
        app.use(express.static('./build/'));
        // Any invalid calls for templateUrls are under app/* and should return 404
        app.use('/app/*', function(req, res, next) {
            four0four.send404(req, res);
        });
        // Any deep link calls should return index.html
        app.use('/*', express.static('./build/index.html'));
        break;
    default:
        console.log('** DEV **');
        app.use(express.static('client'));
        app.use(express.static('./'));
        app.use(express.static('./tmp'));
        // Any invalid calls for templateUrls are under app/* and should return 404
        app.use('/app/*', function(req, res, next) {
            four0four.send404(req, res);
        });
        // Any deep link calls should return index.html
        app.use('/*', express.static('./client/index.html'));
        break;
}

// Connect to Mongo on start
db.connect(mongoUri, function (err) {
    if (err) {
        console.log('Unable to connect to Mongo.');
        process.exit(1);
    } else {
        app.listen(port, function () {
            console.log('************************');
            console.log('JazzyTrip MEAN Server - ');
            console.log('Listening on port ' + port);
            console.log('---- Remember to first start MongoDb server');
            console.log('env = ' + app.get('env') +
                '| PORT = ' + port +
                '| DIR = ' + __dirname +
                '| process.cwd() = ' + process.cwd());
            console.log('************************');
        });
    }
});


