const { handleHttpError } = require("../utils/handleError");
/**
 * Array con los roles permitidos
 * @param {*} rol
 * @returns
 */
const checkRol = (roles) => (req, res, next) => {
  try {
    const { user } = req;
    const rolesByUser = user.role; //TODO ["user"]
    //TODO: ["admin","manager"]
    const checkValueRol = roles.some(
        (rolSingle) => rolesByUser.includes(rolSingle)
    ); //TODO: true, false
    if (!checkValueRol) {
      handleHttpError(res, "USER NO TIENE PERMIOS", 403);
      return;
    }
    next();
  } catch (e) {
    handleHttpError(res, "ERROR PERMIOS", 403);
  }
};

module.exports = checkRol;