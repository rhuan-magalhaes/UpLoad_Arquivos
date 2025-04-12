// Importa para interagir com o banco de dados
const mongoose = require("mongoose"); // Corrigido erro de digitação
 
// Carrega variáveis de ambiente do arquivo .ENV
require("dotenv").config();
 
// Configura o mongoose para permitir consulta (Restritas)
mongoose.set("strictQuery", true);
 
// Função para conectar ao DB
async function main() {
  // Link do DB
  const dbUser = process.env.DB_USER;
  const dbPassword = process.env.DB_PASS;
 
  // Define o link de conexão com o MongoDB Atlas
  const mongoURI = `mongodb+srv://${dbUser}:${dbPassword}@clusterapi.j79s3.mongodb.net/?retryWrites=true&w=majority&appName=ClusterAPI`;
 
  await mongoose.connect(mongoURI); // Adicionada URI correta
 
  // Exibe a mensagem ao usuário que realizou a conexão
  console.log("Conectou ao Banco de Dados!");
}
 
// Caso ocorra erro, mostra uma mensagem
main().catch((err) => console.log(err));
 
// Exporta a função para utilizar em outro arquivo
module.exports = main;