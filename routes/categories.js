const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, } = require('../middlewares');

const router = Router();

// Obtener todas las categorias
router.get('/', (req, res) => {
    res.json('get');
});

// Obtener categoria por id
router.get('/:id', (req, res) => {
    res.json('get - id');
});

// Crear categoria - privado - con cualquier rol
router.post('/', [
    validarJWT
], (req, res) => {
    res.json('post');
});

// Actualizar un registro por id cualquiera con token valido
router.put('/', (req, res) => {
    res.json('put');
});

// Borrar solo si es Admin
router.delete('/', (req, res) => {
    res.json('delete');
});

module.exports = router;