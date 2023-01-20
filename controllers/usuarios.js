const { response, request} = require('express')


const usuarioGet = (req = request, res = response) => {
    const query = req.query;
    res.json({
        msg: 'get API - controlador',
        query
    });
}

const usuarioPost = (req, res = response) => {
    const {nombre} = req.body;

    res.json({
        msg: 'Post API --controllers',
        nombre
    });
}

const usuarioPut = (req, res = response) => {
    const { id } = req.params;

    res.json({
        msg: 'Put API controlador',
        id
    });
}

const usuarioPatch = (req, res = response) => {
    res.json({
        msg: 'Patch!! API controlador'
    });
}

const usuarioDelete = (req, res = response) => {
    res.json({
        msg: 'DELETE!! API desde controllers'
    });
}

module.exports = {
    usuarioGet,
    usuarioPost,
    usuarioPut,
    usuarioPatch,
    usuarioDelete
}

