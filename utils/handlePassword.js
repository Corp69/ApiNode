const bcryptjs = require("bcryptjs");

const encrypt = async ( passwordPlain) => {

  const hash = await bcryptjs.hash(passwordPlain, 3);    
  return hash;

};

const compare = async ( passwordPlain, hashpassword ) => {

  return await bcryptjs.compare( passwordPlain, hashpassword);


};

module.exports = { encrypt, compare };