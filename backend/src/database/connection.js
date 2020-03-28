const Knex = require("knex");
const configuration =require('../../knexfile');
const connection =Knex(configuration.development);//pega o que foi configurado no arquivo knexfile, em development
module.exports=connection;