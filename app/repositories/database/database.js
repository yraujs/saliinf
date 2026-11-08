const moongose = require('mongoose');

async function conectarBanco(){
    console.log('conectando banco...');

    try{

        moongose.set('strictQuery', false);

        await moongose.connect(process.env.MONGO_URI, {
            dbName: process.env.DATABASE
        });

        console.log('banco conectado!');

    }catch(erro){

        console.log(erro);

    }
}

module.exports=conectarBanco