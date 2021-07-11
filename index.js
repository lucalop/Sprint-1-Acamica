const express = require('express');
const yaml = require('js-yaml');
const fs = require('fs');
const swaggerUi = require('swagger-ui-express');
const app = express();


//Función para documentar
function loadSwaggerInfo() {
  try {
    const doc = yaml.load(fs.readFileSync('./spec.yml', 'utf8'));
    console.log(doc);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(doc));
  } catch (e) {
    console.log(e);
  }
}


//Routers
const loginRouter = require('./routers/login.js');
const usersRouter = require('./routers/users.js');
const adminRouter = require('./routers/admin.js');
const { validarAdmin } = require('./autenticacion/auth.js');
const { validarIDUsuario } = require('./middlewares/middle.js');

app.use(express.json());
app.use('/login', loginRouter);
app.use('/admin/:id', validarIDUsuario, validarAdmin, adminRouter);
app.use('/user/:id', validarIDUsuario, usersRouter);


//Servidor config
app.set('port', 3000);
 

//Levantando servidor
app.listen(3000, () => {
  console.log(`Servidor ${app.get('port')} funcionando`)
})

loadSwaggerInfo()