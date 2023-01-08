const jwt = require('jsonwebtoken');
const generarJWT = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        jwt.sign(payload, process.env.SECRETEORPRIVATEKEY, {
            expiresIn: '4h' /* Tiempo que dura esto */
        }, (err, token) => {
            if (err) {
                console.error(err);
                reject('No se pudo generar el Token');
            } else {
                resolve(token);
            }
        })
    })
}

module.exports = {
    generarJWT
}