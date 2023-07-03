const { tokenSign } = require("../utils/handleJwt");
const { accesoBD } = require('../config/pg4');
const { verifyToken } = require("../utils/handleJwt");

const loginCtrl = async (req, res) => {
  switch (req.body.USUARIO) {
    case undefined:
      // EN CASO DE CONTRASEÑA INDEFINIDA
      res.send({
        "Ttitulo:": "Inicio Sesion",
        "Mensaje": "la consulta de manera exitosa !",
        "Detalle": " El usuario esta indefinido."
      });
      break;
    case '':
      // EN CASO DE CONTRASEÑA INDEFINIDA
      res.send({
        "Ttitulo:": "Inicio Sesion",
        "Mensaje": "la consulta de manera exitosa !",
        "Detalle": " El usuario esta Vacio."
      });
      break;
    default:
      switch (req.body.PASSS) {
        case undefined:
          // EN CASO DE CONTRASEÑA INDEFINIDA
          res.send({
            "Ttitulo:": "Inicio De Session",
            "Mensaje": "Consulta de manera exitosa !",
            "Detalle": "No la Passs esta Indefinida "
          });
          break;
        case '':
          // EN CASO DE CONTRASEÑA VACIA
          res.send({
            "Ttitulo:": "Inicio De Session",
            "Mensaje": "Consulta de manera exitosa !",
            "Detalle": "No la Passs esta Vacia"
          });
          break;
        default:
          // FINAL MENTE SI LA CONTRASEÑA COINCIDE EN ALGO.
          let AccesoUsuario = await accesoBD(req.body.USUARIO.toString(), req.body.PASSS.toString());
          if (AccesoUsuario[0].rh_empleado_login == null) {
            res.send({
              "Ttitulo:": "Inicio De Session",
              "Mensaje": "Consulta de manera exitosa !",
              "Detalle": "No existe el Uusario en la base de datos"
            });
            return;
          }
          else {
            let user = {
              id: AccesoUsuario[0].rh_empleado_login.id,
              usuario: AccesoUsuario[0].rh_empleado_login.usuario,
              role: 'admin'
            }

            let data = {
              token: await tokenSign(user),
              user
            }
            //Respondemos una vez el usurio exista.
            res.send({
              "titulo": "Incio De Session",
              "Mesnsaje": "Consulta correcta !",
              data
            });
          }
      }

  }



}

const tokken = async (req, res) => {

     //verificar el tokken.
     let dataToken = await verifyToken(req.body.tokken);
     switch (dataToken) {
         case null:
          res.send(false);
             return;    
         break;
         default:
             req.user = dataToken;
             res.send(true);
         break;
     }
}

module.exports = { loginCtrl, tokken };