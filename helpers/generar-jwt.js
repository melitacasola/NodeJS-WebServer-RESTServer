const jwt = require('jsonwebtoken')

const generarJWT = (uid = ' ') =>{

    return new Promise((resolve, reject) =>{
        const payload = {uid};
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '20h'
        }, (err, token) =>{
            if (err){
                console.log(err);
                reject('no se pudo gerar token')
            } else{
                resolve(token)
            }
        })
    })
}


module.exports = {
    generarJWT
}

