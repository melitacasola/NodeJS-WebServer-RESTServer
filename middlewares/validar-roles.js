const { response } = require("express")


const esAdminRole = (req, res = response, next)=>{

    if( !req.usuario){
        return res.status(500).json({
            msg: 'se queire verif el role sin validar token '
        });
    }

    const { rol, nombre } = req.usuario;
    if ( rol !== 'ADMIN_ROL'){
        return res.status(401).json({
            msg: `${nombre} no posee permisos`
        });
    }
    next();
}

const tieneRole = (...roles ) =>{
    return (req, res =response, next) => {
        if( !req.usuario){
            return res.status(500).json({
                msg: 'se queire verif el role sin validar token '
            });
        }

        if( ! roles.includes(req.usuario.rol )){
            return res.status(401).json({
                msg: `el servicio requiere los roles ${roles}`
            })
        }
        next();
    }
}

module.exports = {
    esAdminRole,
    tieneRole
}

