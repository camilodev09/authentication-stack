const passport = require('passport');
const bcrypt = require('bcrypt');

module.exports = function (app, myDataBase) {
  app.route('/me').get((req, res) => {
    // Obtener el usuario autenticado de la solicitud
    const user = req.user;
    // Verificar si se encontró un usuario en la solicitud
    if (user) {
      console.log('Usuario autenticado:', user);
      // Devolver los datos del usuario
      res.json(user);
    } else {
      // Devolver un error o un mensaje indicando que el usuario no está autenticado
      res.status(401).json({ message: 'Usuario no autenticado' });
    }
  });

  app.route('/login').post((req, res, next) => {
    const { username, password } = req.body;
    // Consultar la base de datos para verificar si el usuario existe
    myDataBase.findOne({ username: username }, (err, user) => {
      if (err) {
        // Manejar el error de consulta a la base de datos
        console.log('Error al consultar la base de datos:', err);
        return res.redirect('/login'); // Puedes redirigir al formulario de inicio de sesión nuevamente
      }
      if (!user) {
        console.log('Usuario no encontrado en la base de datos');
        // El usuario no existe en la base de datos, mostrar mensaje de error o redirigir
        return res.redirect('/login'); // Puedes redirigir al formulario de inicio de sesión nuevamente
      }
      // Validar la contraseña del usuario
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          // Manejar el error de comparación de contraseñas
          console.log('Error al comparar las contraseñas:', err);
          return res.redirect('/login'); // Puedes redirigir al formulario de inicio de sesión nuevamente
        }
        if (!result) {
          console.log('Contraseña incorrecta');
          // La contraseña es incorrecta, mostrar mensaje de error o redirigir
          return res.redirect('/login'); // Puedes redirigir al formulario de inicio de sesión nuevamente
        }
        // La autenticación fue exitosa, redirigir a la página de perfil
        console.log('Usuario autenticado desde LOGIN:', user);
        res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Agrega esta línea para permitir solicitudes desde el frontend en el puerto 3000
        return res.status(200).json({ message: 'Autenticación exitosa' });
      });
    });
  });

  app.route('/logout').get((req, res) => {
    console.log('Logout requested');
    req.logout();
    // res.redirect('/');
    return res.status(200).json({ message: 'salida exitosa' });
  });

  app.route('/register').post((req, res, next) => {
    const { username, lastname, email, password } = req.body;
    const hash = bcrypt.hashSync(password, 12);

    myDataBase.findOne({ username: username }, (err, user) => {
      if (err) {
        next(err);
      } else if (user) {
        res.redirect('/');
      } else {
        myDataBase.insertOne(
          {
            username: username,
            password: hash,
            lastname: lastname,
            email: email,
          },
          (err, doc) => {
            if (err) {
              console.log('Usuario no encontrado en la base de datos');
              res.redirect('/');
            } else {
              console.log('Usuario new');
              res.json({ message: 'User registered successfully' });
            }
          }
        );
      }
    });
  });

  app.route('/auth/github').get(passport.authenticate('github'));
  app
    .route('/auth/github/callback')
    .get(
      passport.authenticate('github', { failureRedirect: '/' }),
      (req, res) => {
        req.session.user_id = req.user.id;
        res.redirect('/chat');
      }
    );

  app.use((req, res, next) => {
    res.status(404).type('text').send('Not Found');
  });
};

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}
