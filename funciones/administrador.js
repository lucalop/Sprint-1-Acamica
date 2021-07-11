const { carrito, mpago, productos, pedidosConfirmados } = require('../datos.js');

//Agregar productos
function nuevoP(req, res) {

  const { plato, precio, idPlato } = req.body;

  if (plato !== null && precio !== null && idPlato !== null) {
    if (productos.length === 0) {
      const np = { ...req.body }
      productos.push(np);
      return res.json(productos)
    } else {
      
      //Función para que no hayan productos repetidos
      for (producto of productos) {
        if (plato !== producto.plato && idPlato !== producto.idPlato) {
          const np = { ...req.body }
          productos.push(np);
          return res.json(productos)
        }
      } res.status(401).send(' El id o nombre ya existe');
    }

  }
}

//Modificar productos
function modificarP(req, res) {
  const idp = req.params.id;
  console.log(idp)
  for (prod of productos) {
    if (idp === prod.idPlato) {

      const { plato, precio, idPlato } = req.body;
      prod.idPlato = idPlato;
      prod.plato = plato;
      prod.precio = precio;
      res.json(productos);

    }
  }
}

//Eliminar productos
function eliminarP(req, res) {
  const idp = req.params.id;
  for (prod of productos) {
    if (idp === prod.idPlato) {
      const indice = productos.indexOf(prod);
      productos.splice(indice, 1);
      return res.json(productos);
    }
  }
}

//Cambiar estado de pedidos confirmados
function cambiarEstado(req, res) {

  const idPed = Number(req.params.id)
  for (pedid of pedidosConfirmados) {
    if (pedid.id === idPed) {
      const nestado = req.body;
      const indice = pedidosConfirmados.indexOf(pedid)
      pedidosConfirmados[indice].estado = nestado.estado;
      return res.json(pedidosConfirmados);
    }
  }
}

//Crear nuevos medios de pago
function crearMPago(req, res) {

  const { idMP, nombre } = req.body;

  if ((idMP !== 0 && nombre !== "") && (idMP !== undefined && nombre !== undefined)) {
    if (mpago.length === 0) {

      const npago = { ...req.body };
      mpago.push(npago);
      return res.status(200).send('Has creado un nuevo método de pago');

    } else {

      //Función para que no se repitan medios de pago
      for (pago of mpago) {
        if (idMP !== pago.idMP && nombre !== pago.nombre) {

          const npago = { ...req.body };
          mpago.push(npago);
          return res.status(200).send('Has creado un nuevo método de pago');

        } else {
          res.status(401).send('Ya existe un método de pago con ese ID o Nombre')
        }
      }
    }
    
  } else {
    res.status(401).send('Debes completar todos los campos')
  }
}

//Editar medios de pago
function editarMPago(req, res) {
  const idPago = req.params.id
  const { idMP, nombre } = req.body;

  for (pago of mpago) {
    if (pago.idMP === idPago) {
      const indice = mpago.indexOf(pago)
      mpago[indice].nombre = nombre;
      mpago[indice].idMP = idMP;
      return res.send(mpago)
    }
  }
}

//Eliminar medios de pago
function eliminarMPago(req, res) {
  const idPago = req.params.id

  for (pago of mpago) {
    if (pago.idMP === idPago) {
      const indice = mpago.indexOf(pago);
      mpago.splice(indice, 1);
      res.status(200).send('Has eliminado el metodo de pago');
    }
  }
}

//Mostrar todos los medios de pago
function mostrarMPago(req, res) {
  res.status(200).json(mpago)
}

module.exports = {
  cambiarEstado,
  crearMPago,
  editarMPago,
  eliminarMPago,
  mostrarMPago,
  modificarP,
  nuevoP,
  eliminarP,
  productos,
  mpago
}