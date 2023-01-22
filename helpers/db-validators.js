const Role = require('../models/role');
const Usuario = require('../models/usuario')

const esRolValido = async (rol= ' ') => {
    const existeRol = await Role.findOne({rol});
    if(! existeRol){
        throw new Error(`El rol ${rol} no es válido en DB`)
    }
}

const correoExiste = async(correo=' ') =>{
    const correoExiste = await Usuario.findOne({correo});
    if( correoExiste){
        throw new Error('Ese correo electrónico ya esta registrado')
    }
}

const existeUsuarioId = async(id) =>{
    const existeUsuario = await Usuario.findById(id);
    if( ! existeUsuario){
        throw new Error('el ID no existe')
    }
}


module.exports = {
    esRolValido, 
    correoExiste,
    existeUsuarioId
}
