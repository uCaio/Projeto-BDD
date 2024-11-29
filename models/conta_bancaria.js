const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./database'); // Certifique-se de que esse caminho leva à instância do Sequelize
const Usuario = require('./usuario'); // Relacionamento com o modelo de Usuario

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
      model: 'usuarios', // Nome da tabela de usuário no banco de dados
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
    defaultValue: 0.00, // Definindo o saldo inicial como 0
  },
  data_criacao: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
}, {
  tableName: 'conta_bancaria', // Nome da tabela no banco de dados
  timestamps: false, // Desativa campos automáticos de timestamps
  indexes: [
    {
      name: 'PRIMARY',
      unique: true,
      using: 'BTREE',
      fields: [{ name: 'ID_Conta' }],
    },
    {
      name: 'IDX_ID_Usuario',
      using: 'BTREE',
      fields: [{ name: 'ID_Usuario' }],
    },
  ],
});

// Definindo a associação entre Usuario e Conta_Bancaria
ContaBancaria.associate = (models) => {
  ContaBancaria.belongsTo(models.Usuario, {
    foreignKey: 'ID_Usuario',
    as: 'usuario', // Alias para acesso
  });
};

module.exports = ContaBancaria;