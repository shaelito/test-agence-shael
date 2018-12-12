Sequelize = require('sequelize');
// var conn_db = {
//    db_name: "caol1",
//    user: "root",
//    password: "root",
//    host: "localhost",
// }

var conn_db = {
    db_name: "ladatwoo_cao",
    user: "ladatwoo_shael",
    password: "shaelcao",
    host: "67.20.76.109",
}

var sequelize = new Sequelize(conn_db.db_name, conn_db.user, conn_db.password, {
    host: conn_db.host,
    dialect: 'mysql',
    define: {
        timestamps: false
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

exports.db = sequelize;
