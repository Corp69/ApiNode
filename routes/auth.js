const express = require("express");
const { loginCtrl, tokken } = require("../controllers/auth");
//const { validatorRegister, validatorLogin } = require("../validators/auth");
//const customHeader = require("../middleware/customHeader");

const router = express.Router();
//router.post("/register", registerCtrl);
router.post("/login", loginCtrl);
router.post("/Tokken", tokken);


module.exports = router;