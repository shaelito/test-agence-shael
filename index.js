var express=require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var fs = require('fs');


//////GLOBAL VAR/////
config = JSON.parse(fs.readFileSync(__dirname + '/config.json', "utf-8"));
webserver=express();
models={}
//////////////////////

function initExpress(){
    webserver.use(cookieParser());
    webserver.use(session({
        resave: false,
        saveUninitialized: true,
        secret:'myproject'
    }));
    webserver.use(bodyParser.json());
    webserver.use(bodyParser.urlencoded({extended: true}));
    webserver.use('/www', express.static(__dirname+"/www"));
    webserver.listen(config.port,function (){
        console.log('\x1b[32m','- Server listen http port: '+config.port,'\x1b[0m');
    });
}

function configDatabase(){
    var sequelize = require('sequelize');
    database= new sequelize(config.database.name,config.database.username,config.database.password,config.database.options);
    database.authenticate()
    .then(function(){
        console.log('GOOD');
    })
    .catch(function(error){
        console.log('BAD');
    });
    models.usuario=require('./models/cao_usuario.js')(database, sequelize);
}

/////ROUTERS////////////////////////
webserver.get('/',require('./controller/main.js').index)
///////////////////////////////////
initExpress();
configDatabase();