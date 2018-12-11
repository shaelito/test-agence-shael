'use strict';
module.exports = function (app) {
    app.route('/')
        .get(test.controllers.main.index);
};