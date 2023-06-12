const { handleHttpError } = require("../utils/handleHttpError");
const { verifyToken } = require("../utils/handleJwt");

const authMiddleware = async ( req, res, next ) => {    
    try {
       if(!req.headers.authorization){
            handleHttpError(res, "No Hay Tokken", 401);
            return; 
        }
        let token = req.headers.authorization.split(' ').pop(); /// Bearer
        //verificar el tokken.
        let dataToken = await verifyToken(token);
        switch (dataToken) {
            case null:
                handleHttpError(res, "Token Invalidado", 401);
                return;    
            break;
            default:
                req.user = dataToken;
                next();
            break;
        }
    } catch (e) {
        console.log(e);
        handleHttpError(res, " No Hay Un problema al Iniciar Session Iniciada.");
  
    }
}

module.exports = authMiddleware;