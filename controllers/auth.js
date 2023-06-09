const { matchedData } = require("express-validator");
const { encrypt, compare } = require("../utils/handlePassword");
const { tokenSign } = require("../utils/handleJwt");
const { handleHttpError }  = require("../utils/handleHttpError");
const { userModel } = require("../models");

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

const RegistrarCtrl = async (req, res) => {
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

const EntrarCtrl = async (req, res) => {
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


module.exports = { registerCtrl, loginCtrl, RegistrarCtrl, EntrarCtrl };