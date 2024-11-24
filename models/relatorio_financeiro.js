const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('relatorio_financeiro', {
    ID_Relatorio: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ID_Usuario: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'usuario',
        key: 'ID_Usuario'
      }
    },
    data_geracao: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    periodo_inicio: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    periodo_fim: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    tipo_relatorio: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'relatorio_financeiro',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID_Relatorio" },
        ]
      },
      {
        name: "ID_Usuario",
        using: "BTREE",
        fields: [
          { name: "ID_Usuario" },
        ]
      },
    ]
  });
};
