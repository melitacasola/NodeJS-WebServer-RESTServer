const mongoose = require('mongoose');

const dbConnection = async() =>{
    try {
        await mongoose.connect(process.env.MONGODB_ATLAS)
        console.log('Base de Datos Local');
    } catch (error) {
        console.log(error);
        throw new Error('Error en DB')
    }
}


module.exports = {dbConnection}

