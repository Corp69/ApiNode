const jtw = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const getProperties = require("../utils/handlePropertiesEngine")
const propertiesKey = getProperties()

const tokenSign = async ( user) => {
  const sign = await jtw.sign(
    {
    [ propertiesKey.id ]:user[ propertiesKey.id ],
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