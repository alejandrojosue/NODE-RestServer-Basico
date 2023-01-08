const { response } = require('express');

const esAdminRole = (req, res = response, next) => {
    if (!req.user) return res.status(500).json({
        msg: 'Se quiere verificar el rol sin verificar el token antes'
    })
    const { rol, nombre } = req.user;
    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${nombre} no es administrador`
        });
    }
    next();
}

const tieneRol = (...roles) => {
    return (req, res = response, next) => {
        if (!req.user) return res.status(500).json({
            msg: 'Se quiere verificar el rol sin verificar el token antes'
        })

        if (!roles.includes(req.user.rol)) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${roles}`
            })
        }
        next();
    }
}

module.exports = {
    esAdminRole,
    tieneRol
}