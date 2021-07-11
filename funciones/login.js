const { usersList } = require("../datos");

//Crear un usuario
function nuevoUsuario(req, res) {

    const {nya, email, telefono, direccion, pass } = req.body;
    const esAdmin = false;
    const idUsuario = new Date().getTime();
    
    if (usersList.length == 0) {
        if (nya !== null && email !== null && telefono !== null && direccion !== null && pass !== null) {
            const nusuario = { idUsuario,...req.body, esAdmin };
            usersList.push(nusuario);
            return res.json(usersList);

        } else {
            res.send("Debes llenar todos los campos");
        }
    } else {

        //Función para que no existan mails duplicados
        if (nya !== null && email !== null && telefono !== null && direccion !== null && pass !== null) {
            var a = 0;
            for (us of usersList) {
                if (email === us.email) {
                    a = 1;
                }
            }
            if (a === 0) {
                const nusuario = { idUsuario,...req.body, esAdmin };
                usersList.push(nusuario);
                res.json(usersList);
            }
            else {
                res.send("Ya  existe un usuario registrado con esa dirección de correo");
            }
        } else {
            res.send("Debes llenar todos los campos a");
        }
    }
}

//Login
function ingresar(req, res) {

    const { id, pass } = req.body;

    if (id !== null && pass !== null) {
        var b = 0;

        for (i = 0; i < usersList.length; i++) {
            if (usersList[i].idUsuario === id) {
                b = i+1;
            }
        }

        if (b === 0) {
            res.send("No existe un usuario registrado con ese email");
        } else if (usersList[b-1].idUsuario === id) {
            if (usersList[b-1].pass === pass) {
                res.send("Ingreso exitoso");
            } else if (usersList[b-1].pass !== pass) {
                res.send("Contraseña incorrecta");
            }
        }

    } else {
        res.send("Debes llenar todos los campos")
    }
}

module.exports = {
    nuevoUsuario,
    ingresar,
    usersList
}
