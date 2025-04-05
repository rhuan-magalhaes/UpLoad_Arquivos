// Express para criar o servidor e definir rotas
const express = require("express");

// Crio uma instância do Express
const app = express();

// Carrega váriaveis de ambiente
require("dotenv").config();

// Estabelece a conexão com o DB, feitopelo db.js
require("./db");

// Define a porta do servidor (.ENV ou 3000)
const port = 3006;

// Importa o roteador de img. para utilizar as Rotas
const pictureRouter = require("./routes/picture");

/* 
Define que todas rotas começam com picture
Será tratada os envios (GET, POST e ETC), pelo pictureRouter
https://localhost:4000/pictures 
*/

app.use("./pictures", pictureRouter);

// Inicia o servidor
app.listen(port, () => {
    console.log(`O Servidor executa na porta ${port}`);
});
//