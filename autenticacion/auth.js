const { usersList } = require('../datos.js');

//Función para validar clave de administrador desde el header
function validarAdmin(req, res, next) {

  const clave = req.headers.autorization
  var c = 0;
  for (let i = 0; i < usersList.length; i++) {
    if (usersList[i].email === clave) {
      c = i + 1;

      console.log(usersList[i].email)
    }
  }
  if (c !== 0) {
    if (usersList[c - 1].esAdmin === true) {
      console.log("bienvenido")
      
    } else {
      return res.send("Acceso denegado: tienes que ser Admin")
    }

  } else {
    return res.send("Acceso denegado: Clave incorrecta")
  }

  next()
}

module.exports = {
  validarAdmin
}