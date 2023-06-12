const jtw = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const tokenSign = async (user) => {
  const sign = await jtw.sign(
    { id: user.id, usuario: user.usuario, role:'admin'},
    JWT_SECRET, 
    {
      expiresIn: "4h"
    }
  );
  return sign;
};

const verifyToken = async ( tokenJwt ) => {
    try {
      console.log('Valor del Tokken verificado',jtw.verify(tokenJwt, JWT_SECRET));
      return jtw.verify(tokenJwt, JWT_SECRET);
    } catch (e) {
      return null;
    }
  };
  
module.exports = { tokenSign, verifyToken };