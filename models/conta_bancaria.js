const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./database'); // Certifique-se de que esse caminho leva à instância do Sequelize

const ContaBancaria = sequelize.define('Conta_Bancaria', {
  ID_Conta: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  ID_Usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'usuario', // Nome da tabela associada
      key: 'ID_Usuario',
    },
  },
  banco: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  agencia: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  conta: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  tipo_conta: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  saldo_atual: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false,
    defaultValue: 0.0,
  },
  data_criacao: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
}, {
  tableName: 'conta_bancaria',
  timestamps: false,
  indexes: [
    {
      name: 'PRIMARY',
      unique: true,
      using: 'BTREE',
      fields: [{ name: 'ID_Conta' }],
    },
    {
      name: 'ID_Usuario',
      using: 'BTREE',
      fields: [{ name: 'ID_Usuario' }],
    },
  ],
});

// Exporta o modelo
module.exports = ContaBancaria;
