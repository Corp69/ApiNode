const { handleHttpError } = require("../utils/handleError");

const checkRol = (roles) => (req, res, next) => {
  try {
    const { user } = req;
    const rolesByUser = user.role; 
    const checkValueRol = roles.some(
        (rolSingle) => rolesByUser.includes(rolSingle)
    ); //TODO: true, false
    if (!checkValueRol) {
      handleHttpError(res, "El Usuario No Tiene Permisos", 403);
      return;
    }
    next();
  } catch (e) {
    handleHttpError(res, "ERROR En Permisos", 403);
  }
};

module.exports = checkRol;