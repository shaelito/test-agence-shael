'use strict';
module.exports = function (app) {
    app.route('/consultors')
        .get(test.controllers.cao_usuario.get_consultors);

    app.route('/cao_usuario')
        .get(test.controllers.cao_usuario.index)
        .post(test.controllers.cao_usuario.create);

    app.route('/cao_usuario/:co_usuario')
        .get(test.controllers.cao_usuario.show)
        .put(test.controllers.cao_usuario.update)
        .delete(test.controllers.cao_usuario.delete);
};