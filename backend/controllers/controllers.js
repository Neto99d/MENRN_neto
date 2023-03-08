import User from '../models/user.js';

export const signup = async (req, res) => {
  console.log('Signup Hit');
  const {name, nombre, password, apellidos, ci, fvqr, isRegister} = req.body;
  const user = await new User({
    name,
    nombre,
    apellidos,
    ci,
    password,
    fvqr,
    isRegister,
  })
    .save()
    .then(data => {
      res.send({
        message: 'Register Successful',
        info: data,
      });
    })
    .catch(e => {
      res.send({
        message: 'Error',
        info: e,
      });
    });
};

export const user = async (req, res) => {
  console.log('Obtener User');
  const {name, password, fvqr} = req.body;
  const usuario = await User.findOne({name, password, fvqr})
    .then(data => {
      if (data != null) {
        res.send({
          message: 'Usuario encontrado',
          info: data,
        });
      } else {
        res.send({
          message: 'Usuario no encontrado',
          info: data,
        });
      }
    })
    .catch(e => {
      res.send({
        message: 'Error',
        info: e,
      });
    });
};
