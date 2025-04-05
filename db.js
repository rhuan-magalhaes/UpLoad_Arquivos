// Importa para interagir com o banco de dados
const mongoose = require("mongoose");

// Carrega variáveis de ambiente do arquivo .ENV
require("dotenv").config();

// Configura o mongoose para permitir consultas (Restritas)
mongoose.set("strictQuery", true);

// Pega as variáveis de ambiente
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

// Função para conectar ao DB
async function main() {
  await mongoose.connect(
    // Link do DB com as variáveis de ambiente interpoladas corretamente
    `mongodb+srv://${dbUser}:${dbPassword}@clusterapi.xnjzr.mongodb.net/?retryWrites=true&w=majority&appName=ClusterAPI`
  );

  // Exibe a mensagem ao usuário que realizou a conexão
  console.log("Conectou ao banco de dados!");
}

// Caso ocorra erro, mostra uma mensagem
main().catch((err) => console.log(err));

// Exporta a função para utilizar em outro arquivo
module.exports = main;