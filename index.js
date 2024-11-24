const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const port = 80;
// const { sequelize } = require('./models')
const Usuario = require('./models/usuario');



// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', async (req, res) => {
    res.render('cadastroUsuario');
});
app.get('/landingPage', (req, res) => {
    res.render('landingPage');
});


app.get('/usuario', async (req, res) => {
    try {
        const usuario = await Usuario.findAll();
        res.json(usuario);
    } catch (error) {
        console.log(error)
        res.status(500).send('<h2>Erro ao buscar os usuarios</h2>');
    }
})
app.post('/cadastroUsuario', async (req, res) => {
    try {
        const { nome, email, senha, telefone, data_nascimento } = req.body
        const usuarioExistente = await Usuario.findOne({ where: { email } });
        if (usuarioExistente) {
            return res.send('<h2>Usuário já existe</h2>');
        }
        await Usuario.create({ nome, email, senha, telefone, data_nascimento })
        // return res.send('<h2>Cadastro efetuado com sucesso!</h2>');
        res.redirect('/landingPage');

    } catch (error) {
        console.log(error)
        res.status(500).send('<h2>Erro no servidor</h2>');
    }
})

// Start server
app.listen(port, () => {
  console.log(`Server running on port port`);
});
