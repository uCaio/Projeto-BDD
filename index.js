const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
app.use(express.urlencoded({ extended: true })); // Para processar dados de formulários
const sequelize = require('./models/database');
const Usuario = require('./models/usuario');
const ContaBancaria = require('./models/conta_bancaria'); // Corrija a importação

// Carregar todas as associações
Usuario.associate({ ContaBancaria });
ContaBancaria.associate({ Usuario });

// Sincronizar o banco de dados
sequelize.sync()
  .then(() => {
    console.log("Banco de dados sincronizado.");
  })
  .catch((err) => {
    console.error("Erro ao sincronizar o banco de dados:", err);
  });


const port = 3000;

// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Rotas
app.get('/', (req, res) => {
    res.render('cadastroUsuario');
});

app.get('/landingPage', (req, res) => {
    res.render('landingPage');
});

// Rota GET para renderizar a página de transação
app.get('/transacao', async (req, res) => {
    try {
        const usuarioId = req.query.usuarioId;

        if (!usuarioId) {
            return res.status(400).send('Usuário não autenticado ou ID não fornecido');
        }

        const conta = await ContaBancaria.findOne({
            where: { ID_Usuario: usuarioId },
        });

        if (!conta) {
            return res.status(404).send('Conta não encontrada');
        }

        console.log("Conta encontrada:", conta);

        res.render('transacao', { conta }); // Envie apenas conta
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao buscar a conta');
    }
});
  
  // Rota POST para processar a transação
  app.post('/transacao', async (req, res) => {
    const usuarioId = req.body.usuarioId;  // Recupera o ID do usuário
    const valor = req.body.valor;           // Recupera o valor a ser adicionado
  
    if (!usuarioId) {
      return res.status(400).send('ID do usuário não fornecido');
    }
  
    if (!valor) {
      return res.status(400).send('Valor não fornecido');
    }
  
    try {
      // Verificar se o usuário existe
      const usuario = await Usuario.findByPk(usuarioId);
      if (!usuario) {
        return res.status(404).send('Usuário não encontrado');
      }
  
      // Verificar se a conta bancária do usuário existe
      const conta = await ContaBancaria.findOne({ where: { ID_Usuario: usuarioId } });
      if (!conta) {
        return res.status(404).send('Conta não encontrada');
      }
  
      // Atualizar o saldo da conta bancária
      conta.saldo_atual += parseFloat(valor); // Certifique-se de que o valor seja um número
      await conta.save();  // Salve a conta com o novo saldo
  
      // Buscar novamente a conta para garantir que os dados estão atualizados
      const contaAtualizada = await ContaBancaria.findOne({ where: { ID_Usuario: usuarioId } });
  
      // Redirecionar para a página de transação com a conta atualizada
      res.render('transacao', { conta: contaAtualizada });
  
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro ao adicionar saldo');
    }
  });

app.get('/usuario', async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        const contas = await ContaBancaria.findAll();

        // Renderize a página com EJS, passando os dados
        res.render('usuario', { usuarios, contas });
    } catch (error) {
        console.error(error);
        res.status(500).send('<h2>Erro ao buscar os usuários</h2>');
    }
});

// Nova rota para retornar usuários como JSON
app.get('/api/usuarios', async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        const contas = await ContaBancaria.findAll();
          // Renderize a página com EJS, passando os dados
        res.render('usuario', { usuarios, contas });
    } catch (error) {
        console.error(error);
        res.status(500).send('<h2>Erro ao buscar os usuários</h2>');
    }
});

app.get('/contaBancaria', async (req, res) => {
    try {
      const contas = await ContaBancaria.findAll();
       // Renderize a página com EJS, passando os dados
       res.render('contaBancaria', { contas });
    } catch (error) {
        console.error(error);
        res.status(500).send('<h2>Erro ao buscar os usuários</h2>');
    }
});
  
app.get('/api/contaBancaria', async (req, res) => {
    try {
        const contas = await ContaBancaria.findAll();
        res.json(contas);
      } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao buscar contas bancárias');
      }
})

app.post('/cadastroUsuario', async (req, res) => {
    try {
        const { nome, email, senha, telefone, data_nascimento } = req.body;

        const usuarioExistente = await Usuario.findOne({ where: { email } });
        if (usuarioExistente) {
            return res.send('<h2>Usuário já existe</h2>');
        }

        const novoUsuario = await Usuario.create({ nome, email, senha, telefone, data_nascimento });

        const novaConta = await ContaBancaria.create({
            ID_Usuario: novoUsuario.ID_Usuario,
            banco: 'Banco Fortis',
            agencia: '0001',
            conta: `${Math.floor(Math.random() * 100000000)}`,
            tipo_conta: 'Conta Corrente',
            saldo_atual: 0.00,
        });

        console.log(`Conta criada com sucesso para o usuário ${novoUsuario.nome}:`, novaConta);
        res.redirect('/landingPage');
    } catch (error) {
        console.error(error);
        res.status(500).send('<h2>Erro no servidor</h2>');
    }
});


Usuario.findAll().then(usuarios => {
    console.log('Usuários:', JSON.stringify(usuarios, null, 2));
}).catch(err => {
    console.error('Erro ao buscar usuários:', err);
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
