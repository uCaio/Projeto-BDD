module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Transacao', {
    ID_Transacao: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ID_Conta: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'conta_bancaria',
        key: 'ID_Conta'
      }
    },
    ID_Categoria: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'categoria',
        key: 'ID_Categoria'
      }
    },
    tipo: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    valor: {
      type: DataTypes.DECIMAL(15,2),
      allowNull: false
    },
    data_transacao: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    forma_pagamento: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'transacao',
    timestamps: false
  });
};