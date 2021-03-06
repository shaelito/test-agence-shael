test={};
var express=require('express');
var app=express();
var bodyParser = require('body-parser');
var fs = require('fs');

app.use(express.static(__dirname + '/www'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use("*", function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
//////////////////////
test.db = require('./config/conn').db;

var swig = require('swig');
var render = function (file, params) {
    return swig.renderFile('view/' + file + '.html', params);
}
test.render = render;

//Importing models
require('./config/model');
//Importing controllers
require('./config/controllers');
//Importing routes
require('./config/routes')(app);


    test.db.authenticate()
    .then(function(){
        console.log('Connection has been established successfully.');
    })
    .catch(function(error){
        console.error('Unable to connect to the database:', err);
    });

// Create a Server
var server_port = process.env.YOUR_PORT || process.env.PORT || 80;
var server_host = process.env.YOUR_HOST || '0.0.0.0';
app.listen(server_port, server_host, function() {
    console.log('Listening on port %d', server_port);
});
