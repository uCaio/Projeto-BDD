const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('conta_bancaria', {
    ID_Conta: {
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
    banco: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    agencia: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    conta: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    tipo_conta: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    saldo_atual: {
      type: DataTypes.DECIMAL(15,2),
      allowNull: false
    },
    data_criacao: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'conta_bancaria',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID_Conta" },
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
