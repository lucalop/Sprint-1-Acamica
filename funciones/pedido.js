const { productos, mpago, carrito, pedidosConfirmados,indice,usersList } = require('../datos.js');

function Confirmados(id, estado, pago, total, dirección, carrito) {
    this.id = id;
    this.estado = estado;
    this.pago = pago;
    this.total = total;
    this.dirección = dirección;
    this.carrito = carrito;
}

//Hacer pedidos
function nuevoPedido(req, res) {

    const { idPlato, cantidad } = req.body;

    if (idPlato !== "" && cantidad !== "") {
        for (let i = 0; i < productos.length; i++) {

            if (idPlato === productos[i].idPlato) {
                const subtotal = productos[i].precio * cantidad;
                const npedido = { ...req.body, subtotal, };
                carrito.push(npedido);
                return res.json(carrito);
            }

        } return res.status(401).send('El producto no existe')
    }
    else {
        res.status(404).send('Debes completar todos los campos')
    }
}

//Confirmar pedido
function confirmarPedido(req, res) {
    var { pago, direccion } = req.body;
    const idPedido = new Date().getTime();
    const estado = "confirmado";
    var total = 0;

    //Posición del usuario que realiza el pedido
    const posicion = indice[(indice.length-1)]
    const dire =usersList[posicion].direcccion

    //Función para calcular el monto total a pagar
    for (pedi of carrito) {
        total = (total + pedi.subtotal);
    }

    if (carrito.length !== 0) {
        if (pago !== "") {
                for (pag of mpago) {
                    if (pago === pag.idMP) {
                        if(direccion === "" ) {
                        direccion=dire;
                         }
                        pedidosConfirmados.push(new Confirmados(idPedido, estado, pago, total, direccion, carrito))
                        res.send(pedidosConfirmados);
                        carrito.splice(0, carrito.length);
                    }
                } return res.status(401).send('El medio de pago no existe');
            
        } else {
            res.status(401).send('Debes completar todos los campos');
        }
    } else {
        res.status(401).send('No hay un pedido para confirmar')
    }

}

//Modificar pedido (siempre y cuando no esté confirmado)
function modificarPedido(req, res) {

    const id = req.params.id;

    for (ped of carrito) {
        if (ped.idPlato === id) {
            const {cantidad } = req.body;
            const indice = carrito.indexOf(ped)
            carrito[indice].cantidad = cantidad;
            return res.json(carrito);
        }
    } return res.send('El pedido no existe')
    
}

//Eliminar pedido (siempre y cuando no esté confirmado)
function eliminarPedido(req, res) {

    const id = req.params.id;

    for (ped of carrito) {
        if (ped.idPlato === id) {
            const indice = carrito.indexOf(ped)
            carrito.splice(indice, 1);
            res.status(200).send('Has eliminado tu pedido');
        }
    }
}

//Historial de pedidos
function historialPedido(req, res) {

    res.json(carrito);
}

module.exports = {
    nuevoPedido,
    historialPedido,
    confirmarPedido,
    modificarPedido,
    eliminarPedido,
    confirmarPedido,
    carrito

}