
const { Router } = require('express');

const { usuarioGet, usuarioPost, usuarioPut, usuarioPatch, usuarioDelete } = require('../controllers/usuarios')

const router = Router();

router.get('/', usuarioGet);

router.put('/:id', usuarioPut);

router.post('/', usuarioPost);

router.patch('/', usuarioPatch);
router.delete('/', usuarioDelete);


module.exports =  router;