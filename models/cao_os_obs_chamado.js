/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cao_os_obs_chamado', {
    co_obs: {
      type: DataTypes.INTEGER(8),
      allowNull: false,
      primaryKey: true
    },
    co_chamado: {
      type: DataTypes.INTEGER(8),
      allowNull: true,
      defaultValue: '0'
    },
    co_usuario: {
      type: DataTypes.STRING(80),
      allowNull: true,
      defaultValue: '0'
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    dt_obs: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: '0000-00-00 00:00:00'
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    arquivo_obs: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'cao_os_obs_chamado'
  });
};
