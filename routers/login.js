const express = require('express');
const router = express.Router();

const { nuevoUsuario, ingresar } = require('../funciones/login.js');

//Crear un usuario
router.post('/newuser', nuevoUsuario);

//Login
router.post('/login', ingresar);

module.exports = router;