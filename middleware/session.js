const { handleHttpError } = require("../utils/handleHttpError");
const { verifyToken } = require("../utils/handleJwt");
const { userModel } = require("../models");
const getProperties = require("../utils/handlePropertiesEngine");
const propertiesKey = getProperties();


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
       
        const query = {
            [propertiesKey.id]:dataToken[propertiesKey.id]
          }

          console.log( 'valores del query ===> ID ', query);

        // sacamos el usuario.
        const user = await userModel.findOne(query)
        req.user = user
        // dejamos pasar si tiene todo en orden
        next();

    } catch (e) {
        console.log(e);
        handleHttpError(res, " No Hay Session Iniciada, Ingresar Token ");
  
    }
}

module.exports = authMiddleware;