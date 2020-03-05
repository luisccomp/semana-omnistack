const express = require('express');
const mongoose = require('mongoose');

// Uma boa prática de programação é utilizar de arquivos de configuração em vez
// de usar variáveis na aplicação.
const configs = require('./configs.json');
const routes = require('./routes');


// Conectando o nosso backend com o banco de dados não relacional mongodb
mongoose.connect(configs.database.mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const port = configs.port;
const app = express();

// console.log(configs);

// Adicionando middlewares na aplicação. Os middlewares serão invocados toda
// vez que um cliente envia uma nova requisição.
app.use(express.json());
app.use(routes);

// Escutando por novas requisições na porta designada
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
