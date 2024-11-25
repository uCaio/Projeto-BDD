const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./database'); // Caminho para a instância do Sequelize
const conta_bancaria = require('./conta_bancaria');

const Usuario = sequelize.define('Usuario', { // Nome do modelo em PascalCase
  ID_Usuario: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: "email",
  },
  senha: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  telefone: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  data_nascimento: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  data_criacao: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
}, {
  tableName: 'usuario', // Nome da tabela no banco
  timestamps: false, // Desativa campos automáticos de timestamps
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [{ name: "ID_Usuario" }],
    },
    {
      name: "email",
      unique: true,
      using: "BTREE",
      fields: [{ name: "email" }],
    },
  ],
});

// Definindo a associação (assume que todos os modelos foram registrados)
Usuario.associate = (models) => {
  Usuario.hasOne(models.Conta_Bancaria, { foreignKey: 'ID_Usuario' });
};

module.exports = Usuario;
