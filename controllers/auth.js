const { response, request } = require('express')
const User = require('../models/user')
const bcryptjs = require('bcryptjs')
const generateJWT = require('../helpers/generate-jwt')

const singin = async (req = request, res = response) => {
  const { correo, clave } = req.body
  try {
    const user = await User.findOne({ where: { correo_electronico: correo } })

    if (!user) {
      return res.status(404).json({ msj: 'User no encontrado' })
    }

    // Verificar contraseña
    const claveValida = await bcryptjs.compare(clave, user.contraseña_hash)

    if (!claveValida) {
      return res.status(401).json({ msj: 'Credenciales inválidas' })
    }
    // generar JWT
    const token = await generateJWT(user.usuario_id)

    res.status(200).json({ user, token })
  } catch (error) {
    return res.status(500).json({
      msg: 'Server Internal Error'
    })
  }
}

const singup = (req = request, res = response) => {
  return res.status(200).json({})
}

module.exports = { singin, singup }
