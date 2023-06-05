const jtw = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const tokenSign = async ( user) => {
  const sign = await jtw.sign(
    {
    _id:user.id,
    role:user.role
    },
    JWT_SECRET, 
    {
      expiresIn: "4h"
    }
  );
  return sign;
  };

const verifyToken = async ( tokenJwt ) => {
    try {
      return jtw.verify(tokenJwt, JWT_SECRET);
    } catch (e) {
      return null;
    }
  };
  
module.exports = { tokenSign, verifyToken };