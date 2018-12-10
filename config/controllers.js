'use strict'

var controllers = {};
//Models
controllers.main = require('../controller/main').con;
controllers.permissao_sistema = require('../controller/permissao_sistema').con;
controllers.cao_usuario = require('../controller/cao_usuario').con;
controllers.cao_fatura = require('../controller/cao_fatura').con;
controllers.cao_salario = require('../controller/cao_salario').con;
//Relations


test.controllers = controllers;
