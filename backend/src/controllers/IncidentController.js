//const crypto = require('crypto');//pacote de criptografia do node
const connection=require('../database/connection');
module.exports={
    async index(request,response){
        const {page=1}=request.query;
        const [count]=await connection('incidents').count();
        //console.log(count);//devolve como count(*) pois procura todos os campos da tabela
        const incidents=await connection('incidents')
        .join('ongs','ongs.id','=','incidents.ong_id')//Chama registros da ong relacionada o incident
        .limit(5)//limita em 5 os registros trazidos
        .offset((page-1)*5)//tras de acordo com a paginação
        .select([
        'incidents.*',//Tras todos os registros de incidenets
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf'
        ]);//lista todos da tabela ongs
        response.header('X-Total-Count',count['count(*)'])//Mostra na header da aplicação o total de incidentes
        return response.json(incidents);
    },
    async create(request,response){
        //console.log(request);
        const {title,description,value}=request.body;
        const ong_id=request.headers.authorization;
        const [id]=await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });
        return response.json({id});
    },
    async delete(request,response){
        const {id}=request.params;
        const ong_id=request.headers.authorization;
        const incident=await connection('incidents').where('id',id).select('ong_id').first();
        if (ong_id != incident.ong_id) {
            return response.status(401).json({'error' : 'Operação não permitida!'});//retorna um http 401
        }else{
            await connection('incidents').where('id',id).delete();
            return response.status(204).send();//retorna http 204, sem conteudo
        }

    }
    
}