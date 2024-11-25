const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const Usuario = require('./models/usuario');
const ContaBancaria = require('./models/conta_bancaria'); // Corrija a importação

const app = express();
const port = 80;

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
