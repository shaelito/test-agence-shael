'use strict';
module.exports = function (app) {
    app.route('/permissao_sistema')
        .get(test.controllers.permissao_sistema.index)
        .post(test.controllers.permissao_sistema.create);


    app.route('/permissao_sistema/:co_usuario')
        .get(test.controllers.permissao_sistema.show)
        .put(test.controllers.permissao_sistema.update)
        .delete(test.controllers.permissao_sistema.delete);
};