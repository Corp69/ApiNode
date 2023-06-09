const express = require("express");
const { registerCtrl, loginCtrl, RegistrarCtrl, EntrarCtrl } = require("../controllers/auth");
const { validatorRegister, validatorLogin } = require("../validators/auth");

const router = express.Router();
router.post("/register", validatorRegister, registerCtrl);
router.post("/login", validatorLogin, loginCtrl);

router.post("/Registrar", validatorRegister, RegistrarCtrl);
router.post("/entrar", validatorLogin, EntrarCtrl);

module.exports = router;