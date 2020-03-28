const express = require('express');//Chama o framework responsavel pelas rotas
const SessionController=require('./controllers/SessionController');
const ProfileController=require('./controllers/ProfileController');
const OngController=require('./controllers/OngController');
const IncidentController=require('./controllers/IncidentController')
const connection=require('./database/connection');
const routes = express.Router();
// Rota/Recurso

// GET: buscar informações no back end
// POST: Criar uma informaçãoo no back end
// PUT: Alterar uma informação no back end
// DELETE: deletar uma informação no back end

//Tipos de parametros
//Query Params são parametros nomeados envidados após o "?", ja conhecido metodo get
//Route Params são parametros utilizados para identificar recursos
//Ex:
// app.get('/users/:id',(request,response)=>{
//     return response.json({
//         evento:'Semana Omnistack',
//         aluno : 'Iury'
//     });
// });
//Request Body é utilizado para criar ou alterar recursos, geralmente enviados em json
routes.get('/session',SessionController.create);
routes.get('/profile',ProfileController.index);
routes.get('/ongs',OngController.index);
routes.post('/ongs',OngController.create);
routes.get('/incidents',IncidentController.index);
routes.post('/incidents',IncidentController.create);
routes.delete('/incidents/:id',IncidentController.delete);
module.exports=routes;//exporta a variavel