const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const usuario = require('../models/usuario');

const Usuario = require('../models/usuario')

//middleware se dispara con 3 args.
const validarJWT = async (req = request, res = response, next) =>{

    const token = req.header('x-token');
    if(! token){
        return res.status(401).json({
            msg: 'No hay Token en la petición'
        })
    }

    try {
        const {uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        //leer usuario qe corresponde al uid
        const usuario = await Usuario.findById(uid);

        if(!usuario){
            return res.status(401).json({
                msg: 'Token no valido - usuario no existente db'
            })
        }

        // Verificar si el uid tiene estado in true
        if (! usuario.estado){
            return res.status(401).json({
                msg: 'Token no valido - usuario con estado false'
            })
        }
        
        req.usuario = usuario;
        next();      
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: "Token no válido"
        })
    }


}

module.exports = {
    validarJWT
}
