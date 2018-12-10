'use strict'

var model = {};
//Models
model.PermissaoSistema = require('../models/permissao_sistema')(test.db, Sequelize);
model.CaoUsuario = require('../models/cao_usuario')(test.db, Sequelize);
model.CaoFatura = require('../models/cao_fatura')(test.db, Sequelize);
model.CaoSalario = require('../models/cao_salario')(test.db, Sequelize);


test.model = model;
