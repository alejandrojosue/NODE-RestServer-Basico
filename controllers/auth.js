const { response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const { generarJWT } = require('../helpers/generar-jwt');


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

module.exports = {
    login
}