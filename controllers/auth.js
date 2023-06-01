const { matchedData } = require("express-validator");
const { encrypt } = require("../utils/handlePassword");
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
    console.log(e)
    handleHttpError(res, "ERROR_REGISTER_USER")
  }
};

module.exports = { registerCtrl };