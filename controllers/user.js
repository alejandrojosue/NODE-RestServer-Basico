const { response, request } = require('express');
const usersGet = (req = request, res = response) => {
    const query = req.query;
    res.json({
        msg: 'get API - Controlador',
        query
    });
}

const usersPut = (req, res = response) => {
    const { id } = req.params;
    res.json({
        msg: 'Put API - Controlador',
        id
    });
}

const usersPost = (req, res = response) => {
    const { nombre, edad } = req.body;
    res.json({
        msg: 'Post API - Controlador',
        nombre,
        edad
    });
}

const usersDelete = (req, res = response) => {
    res.json({
        msg: 'Delete API - Controlador',
    });
}
const usersPatch = (req, res = response) => {
    res.json({
        msg: 'Path API - Controlador'
    });
}

module.exports = {
    usersGet,
    usersPut,
    usersPost,
    usersDelete,
    usersPatch
}