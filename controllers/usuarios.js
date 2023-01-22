const { response, request} = require('express')
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario');


const usuarioGet = async (req = request, res = response) => {
    
    const {limite = 5, desde = 0} = req.query;
    const query = {estado: true};

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.json({
        total,
        usuarios
        
    });
}

const usuarioPost = async (req, res = response) => {

    const {nombre, contraseña, correo, rol} = req.body;
    const usuario = new Usuario({nombre, correo, contraseña, rol});
 
    //Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.contraseña = bcryptjs.hashSync(contraseña, salt);

    //Guardar en DB
    await usuario.save()

    res.json({
        usuario
    });
}

const usuarioPut = async (req, res = response) => {
    const { id } = req.params;
    const { _id, contraseña, correo, google, ...resto} = req.body;

    //TODO validar contra DB
    if(contraseña){
        const salt = bcryptjs.genSaltSync();
        resto.contraseña = bcryptjs.hashSync(contraseña, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto);

    res.json(usuario);
}

const usuarioPatch = (req, res = response) => {
    res.json({
        msg: 'Patch!! API controlador'
    });
}

const usuarioDelete = async (req, res = response) => {

    const {id} = req.params;
    // Fisicame borrar dato
    // const usuario = await Usuario.findByIdAndDelete(id)

    // para no perder el dato, voy a cambiar el estado del Usuario
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false})
    res.json(usuario);
}

module.exports = {
    usuarioGet,
    usuarioPost,
    usuarioPut,
    usuarioPatch,
    usuarioDelete
}

