const connection=require('../database/connection');
module.exports={
    async create(request,response){
        const {id}=request.body;
        const ong=await connection('ongs').where('id',id).select('name').first();//lista todos da tabela ongs
        if (!ong) {
            return response.status(400).json({error: "Nenhuma ONG não encontrada com esse ID"})
        }else{
            return response.json(ong);
        }
    }
}