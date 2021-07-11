const express = require('express');
const router = express.Router();

const { validarIDPedido } = require('../middlewares/middle.js');
const { nuevoPedido, historialPedido, modificarPedido, eliminarPedido, confirmarPedido } = require('../funciones/pedido.js');

//Crear pedidos
router.post('/pedido', nuevoPedido);

//Modificar pedidos

router.put('/pedido/:id', validarIDPedido, modificarPedido);

//Eliminar pedidos

router.delete('/pedido/:id', validarIDPedido, eliminarPedido);

//Confirmar pedidos
router.post('/pedido/confirmar', confirmarPedido);

//Historial de pedidos
router.get('/pedido', historialPedido);

module.exports = router;