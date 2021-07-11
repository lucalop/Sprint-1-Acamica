//Medios de pago
const mpago = [];

//Productos
const productos = [];

//Listado de items para pedir (Pueden modificarse y eliminarse mientras no se haya confirmado el pedido)
const carrito = [];

//Pedidos confirmados (solo puede modificarse su estado por parte del administrador)
const pedidosConfirmados = [];

//Listado de usuarios
const usersList = [{
     "idUsuario": 1626020561580,
     "nya": "Lopez, Francisco",
     "email": "lucas_fl36@hotmail.com",
     "telefono": "546456456",
     "direcccion": "kuanip 15",
     "pass": "123456",
     "esAdmin": true
      }
];

//Índice para identificar al usuario
const indice =[];

module.exports = {
    mpago,
    productos,
    usersList,
    carrito,
    pedidosConfirmados,
    indice
}