const crypto = require('crypto');//pacote de criptografia do node
const connection=require('../database/connection');
module.exports={
    async index(request,response){
        const ongs=await connection('ongs').select('*');//lista todos da tabela ongs
        return response.json(ongs);
    },
    async create(request,response){
        const {name,email,whatsapp,city,uf}=request.body;
        const id=crypto.randomBytes(4).toString('HEX');
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        });
        return response.json({id});
    }
}