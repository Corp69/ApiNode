const { handleHttpError } = require("../utils/handleHttpError");
const { verifyToken } = require("../utils/handleJwt");
const { userModel } = require("../models");

const authMiddleware = async ( req, res, next ) => {

    try {
        if(!req.headers.authorization){

            handleHttpError(res, "No Hay Tokken", 401);
            return; 
        }

        const token = req.headers.authorization.split(' ').pop(); /// Bearer
        //verificar el tokken.
        const dataToken = await verifyToken(token);
        
        if(!dataToken._id){

            handleHttpError(res, "ERROR_ID_TOKEN", 401);
            return;
        }
        // sacamos el usuario.
        const user = await userModel.findById(dataToken._id); 
        req.user = user;
        // dejamos pasar si tiene todo en orden
        next();

    } catch (e) {
        console.log(e);
        handleHttpError(res, " No Hay Session Iniciada errror ver el log ");
  
    }
}

module.exports = authMiddleware;