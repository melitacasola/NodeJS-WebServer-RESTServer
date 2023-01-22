const { response } = require("express");
const bscryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const {generarJWT} = require('../helpers/generar-jwt')


const login = async (req, res = response) => {
    const { correo, contraseña } = req.body;

    try {
        // Verif si email existe
        const usuario = await Usuario.findOne({correo});
        if (! usuario){
            return res.status(400).json({
                msg: 'Usuario / Pass incorrectos - correo'
            })
        }
        //Si user esta activo
        if (! usuario.estado){
            return res.status(400).json({
                msg: 'Usuario / Pass incorrectos - estado: false'
            })
        }
        // Verif contraseña
        const validarContraseña = bscryptjs.compareSync(contraseña, usuario.contraseña);
        if(!validarContraseña){
            return res.status(400).json({
                msg: 'Usuario / Pass incorrectos - pass'
            })
        }

        //Generar el JWT
        const token = await generarJWT(usuario.id);
        //solo puedo tener un res.json entodo el flujo o controlador
        res.json({
            usuario, 
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el Admin'
        })
    }
}

module.exports = {
    login
}