const { handleHttpError } = require("../utils/handleHttpError");
const { verifyToken } = require("../utils/handleJwt");

const authMiddleware = async ( req, res, next ) => {

    try {
        if(!req.headers.authorization){

            handleHttpError(res, "No Hay Session Iniciada", 401);
        
        }
        const token = req.headers.authorization.split(' ').pop();
        const dataToken = await verifyToken(token);
        
        if(!dataToken._id){

            handleHttpError(res, "ERROR_ID_TOKEN", 401);
       
        }
    } catch (e) {
        console.log(e);
        handleHttpError(res, " No Hay Session Iniciada errror ver el log ");
  
    }
}

module.exports = authMiddleware;