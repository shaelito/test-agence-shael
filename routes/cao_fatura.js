'use strict';
module.exports = function (app) {
    app.route('/dato_fatura_desempenho')
        .get(test.controllers.cao_fatura.get_dato_fatura_desempenho)
        .put(test.controllers.cao_fatura.get_dato_fatura_desempenho)
        .post(test.controllers.cao_fatura.get_dato_fatura_desempenho);
};
