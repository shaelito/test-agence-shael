'use strict'

var controllers = {};
//Models
controllers.main = require('../controller/main').ctrl;
controllers.permissao_sistema = require('../controller/permissao_sistema').ctrl;
controllers.cao_usuario = require('../controller/cao_usuario').ctrl;
controllers.cao_fatura = require('../controller/cao_fatura').ctrl;
controllers.cao_salario = require('../controller/cao_salario').ctrl;



test.controllers = controllers;
