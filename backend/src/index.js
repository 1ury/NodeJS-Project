const express = require('express');//Chama o framework responsavel pelas rotas
const routes = require('./routes');//como vou chamar um arquivo ao invés de um framework tenho q botar "./", caso tivesse que voltar uma pasta seria "../"
const cors = require('cors');//módulo de segurança
const app=express();
app.use(cors());
app.use(express.json());//!!!IMPORTANTE!!!Converte o json em objeto do js
app.use(routes);
app.listen(3333);//porta que o node será rodado
