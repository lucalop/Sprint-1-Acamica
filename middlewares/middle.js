const { productos, carrito, mpago, pedidosConfirmados, usersList, indice } = require('../datos.js');

//Valida el id del usuario
function validarIDUsuario(req, res, next) {
  const idUser = Number(req.params.id);
  let a = 0;
  
  if (idUser !== null && idUser !== undefined) {
    for (usuario of usersList) {

      //Función para crear un indice que luego ayudará a encontrar el id y dirección al confirmar pedido
      if (usuario.idUsuario === idUser) {
        const indi = usersList.indexOf(usuario)
        indice.push(indi);
        a=1;
      }
    } 
    if(a===1){
      next()
    } else{
      res.status(401).send("El usuario no existe")
    }
  } else {
    res.status(401).send("Debes llenar todos los campos ")
  }
}

//Valida el id de un producto
function validarIDProducto(req, res, next) {
  const idp = req.params.id;
  let a=0;
  if (idp !== null && idp !== undefined) {
    for (prod of productos) {
      if (idp === prod.idPlato) {
        a=1;
      }
    }
    if(a===1){
      next()
    } else{
      res.status(401).send("el producto no existe")
    }
  } else{
    res.status(401).send("Debes llenar todos los campos ")
  }
}

//Valida el id de un medio de pago
function validarIDPago(req, res, next) {
  const idPago = req.params.id
  let a=0;
  if (idPago != null && idPago != undefined) {
    for (pago of mpago) {
      if (pago.idMP === idPago) {
        a=1;
      }
    }
    if(a===1){
      next()
    }else{
      return res.status(401).send("el medio de pago no existe")
    }
  } else{
    res.status(401).send("Debes llenar todos los campos ")
  }
}

//Valida el id de un pedido confirmado
function validarIDPedidoAdmin(req, res, next) {
  const idPed = Number(req.params.id)
  let a=0;
  if (idPed != null && idPed != undefined) {
    for (pedid of pedidosConfirmados) {
      if (pedid.id === idPed) {
        a=1;
      }
    } 
    if(a===1){
      next()
    }else{
      return res.status(401).send("el pedido no existe")
    }
  } else{
    res.status(401).send("Debes llenar todos los campos ")
  }
}

//Valida el id de un pedido no confirmado
function validarIDPedido(req, res, next) {
  const id = req.params.id
  let a=0;

  if (id != null && id != undefined) {
    for (pedi of carrito) {
      if (pedi.idPlato === id) {
        a=1
      }
    }
    if(a===1){
      next()
    }else{
      return res.status(401).send("el pedido no existe")
    }
  } else{
    res.status(401).send("Debes llenar todos los campos ")
  }
}

module.exports = {
  validarIDProducto,
  validarIDPago,
  validarIDPedido,
  validarIDPedidoAdmin,
  validarIDUsuario,
  indice
}




