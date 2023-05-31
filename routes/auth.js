const express = require("express");
const { matchedData } = require("express-validator");
const router = express.Router();
const { validatorLoginItem, validatorRegisterItem} =  require("../validators/auth");


router.post("/register", validatorRegisterItem, (req, res) => {
    req = matchedData( req );
    res.send({ data:req });
});

module.exports = router;