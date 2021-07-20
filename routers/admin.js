const express = require('express');
const router = express.Router();

const { cambiarEstado, crearMPago, editarMPago, eliminarMPago,
       mostrarMPago, modificarP, nuevoP, eliminarP, verPedidos } = require('../funciones/administrador.js');
const { validarIDPago, validarIDProducto, validarIDPedido, validarIDPedidoAdmin } = require('../middlewares/middle.js');


//Sección Productos-----

//Agregar productos
router.post('/producto', nuevoP);

//Modificar productos
router.put('/producto/:id', validarIDProducto, modificarP);

//Eliminar productos
router.delete('/producto/:id', validarIDProducto, eliminarP);


//Sección Pedidos------

//Cambiar estado de un pedido
router.put('/pedidoAdmin/:id', validarIDPedidoAdmin, cambiarEstado);

//Ver todos los pedidos
router.get('/pedidoAdmin', verPedidos);

//Sección medios de pago-----

//Crear nuevos medios de pago
router.post('/pago', crearMPago);

//Mostrar todos los medios de pago
router.get('/pago', mostrarMPago);

//Editar medios de pago
router.put('/pago/:id', validarIDPago, editarMPago);

//Eliminar medios de pago
router.delete('/pago/:id', validarIDPago, eliminarMPago);

module.exports = router;