const { response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');


const login = async(req, res = response) => {

    const { correo, password } = req.body;

    try {

        // Verificar si el correo existe
        const user = await User.findOne({ correo });

        if (!user) {
            return res.status(400).json({
                msg: 'Usuario | Clave no son correctos - correo '
            })
        }
        // Si el user esta activo
        if (!user.estado) {
            return res.status(400).json({
                msg: 'Usuario | Clave no son correctos - estado: false '
            })
        }
        // Verificar clave
        const validPwd = bcryptjs.compareSync(password, user.clave);
        if (!validPwd) {
            return res.status(400).json({
                msg: 'Usuario | Clave no son correctos - password '
            })
        }

        // Generar el JWT
        const token = await generarJWT(user.id);

        res.json({
            user,
            token
        })
    } catch (error) {
        return res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

const googleSignIn = async(req, res = response) => {
    const { id_token } = req.body;
    try {
        const { nombre, img, correo } = await googleVerify(id_token);

        let user = await User.findOne({ correo });
        if (!user) {
            // crear user
            const data = {
                nombre,
                correo,
                clave: ':P',
                img,
                google: true,
                rol: 'USER_ROLE'
            }
            user = new User(data)
            await user.save();
        }

        // Si el user en bd
        if (!user.estado) {
            return res.status(401).json({
                msg: 'Hable con el administrador - usuario bloqueado'
            })
        }

        // Generar el JWT
        const token = await generarJWT(user.id);


        res.json({
            user,
            id_token
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'El token no se pudo verificar'
        })
    }
}

module.exports = {
    login,
    googleSignIn
}