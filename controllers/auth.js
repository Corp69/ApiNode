//const { matchedData } = require("express-validator");
//const { encrypt, compare } = require("../utils/handlePassword");
const { tokenSign } = require("../utils/handleJwt");
//const { handleHttpError }  = require("../utils/handleHttpError");
//const { userModel } = require("../models");
const { accesoBD } = require ('../config/pg4'); 
  

/*
const registerCtrl = async (req, res) => {
  try{
    req = matchedData(req);
    const password = await encrypt(req.password);
    const body = { ...req, password };
    const dataUser = await userModel.create(body);
    //dataUser.set("password", undefined, { strict: false });
    const data = {
      token: await tokenSign(dataUser),
      user: dataUser
    };
    //res.status(201)
    res.send({ data });
  }catch(e){
    handleHttpError(res, "Error Al Registrar Al Usuario")
  }
};
/*
const loginCtrl = async (req, res) => {
  try{
    req = matchedData(req);
    const user = await userModel.findOne({email:req.email})
    .select('password name role email')
    if(!user){
      handleHttpError(res, "USUARIO NO EXISTE", 404);
      return
    }
    const hashPassword = user.get('password');
    const check = await compare(req.password, hashPassword);
    if(!check){
      handleHttpError(res, "PASS NO COINCIDE CON EL USUARIO", 401);
      return
    }

    user.set('password', undefined, {strict:false})
    const data = {
      token: await tokenSign(user),
      user
    }
    res.send({data});
  }catch(e){
    handleHttpError(res, "EERROR AL INICIAR SESSION.");
  }
}
*/

const loginCtrl = async (req, res) => {
 switch(req.body.USUARIO){
  case undefined:
      // EN CASO DE CONTRASEÑA INDEFINIDA
      res.send({ 
        "Ttitulo:":"Inicio Sesion", 
        "Mensaje":"la consulta de manera exitosa !", 
        "Detalle":" El usuario esta indefinido."
      });
  break;
  case '':
      // EN CASO DE CONTRASEÑA INDEFINIDA
      res.send({ 
        "Ttitulo:":"Inicio Sesion", 
        "Mensaje":"la consulta de manera exitosa !", 
        "Detalle":" El usuario esta Vacio."
      });
  break;
  default:
  switch(req.body.PASSS) {
    case undefined:
      // EN CASO DE CONTRASEÑA INDEFINIDA
      res.send({ 
        "Ttitulo:":"Inicio De Session", 
        "Mensaje":"Consulta de manera exitosa !", 
        "Detalle":"No la Passs esta Indefinida "
      });
      break;
    case '':
      // EN CASO DE CONTRASEÑA VACIA
       res.send({ 
        "Ttitulo:":"Inicio De Session", 
        "Mensaje":"Consulta de manera exitosa !", 
        "Detalle":"No la Passs esta Vacia"
      });
      break;
    default:
      // FINAL MENTE SI LA CONTRASEÑA COINCIDE EN ALGO.
      let AccesoUsuario = await accesoBD(req.body.USUARIO.toString(),req.body.PASSS.toString());
    if(AccesoUsuario[0].rh_empleado_login == null){
      res.send({ 
        "Ttitulo:":"Inicio De Session", 
        "Mensaje":"Consulta de manera exitosa !", 
        "Detalle":"No existe el Uusario en la base de datos"
      });
      return;
    }
    else{
      let user = {
         id: AccesoUsuario[0].rh_empleado_login.id, 
         usuario: AccesoUsuario[0].rh_empleado_login.usuario,
         role:'admin'
        }

      let data = {
        token: await tokenSign(user),
        user
      }
      //Respondemos una vez el usurio exista.
      res.send({
        "titulo":"Incio De Session",
        "Mesnsaje":"Consulta correcta !", 
        data
      });
    }
  }
 
}



}

module.exports = { loginCtrl };