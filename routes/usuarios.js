
const { Router } = require('express');
const { check } = require('express-validator');

const {validarCampos} = require('../middlewares/validar-campos');
const { esRolValido, correoExiste, existeUsuarioId } = require('../helpers/db-validators');

const { usuarioGet, usuarioPost, usuarioPut, usuarioPatch, usuarioDelete } = require('../controllers/usuarios');


const router = Router();

router.get('/', usuarioGet);

router.put('/:id', [
    check('id', 'No es un ID Válido').isMongoId(), 
    check('id').custom(existeUsuarioId), 
    check('rol').custom(esRolValido),
    validarCampos
], usuarioPut);

router.post('/', [
    check('nombre', 'El nombre es Obligatorio').not().isEmpty(),
    check('contraseña', 'La contraseña debe ser de las 6 letras').isLength({min: 6}),
    // check('rol', 'No es un Rol válido').isIn(['ADMIN_ROL', 'USER_ROL']),
    check('correo').custom(correoExiste),
    check('rol').custom(esRolValido),
    check('correo', 'El correo no es válido').isEmail(), validarCampos ], usuarioPost);

router.patch('/', usuarioPatch);
router.delete('/:id', [
    check('id', 'No es un ID Válido').isMongoId(), 
    check('id').custom(existeUsuarioId), 
    validarCampos
], usuarioDelete);


module.exports =  router;