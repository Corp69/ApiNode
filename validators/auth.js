const { check } = require("express-validator");
const validateResults = require("../utils/handleValidators")

const validatorRegisterItem = [
    check("name")
    .exists()
    .notEmpty()
    .isLength({ min:3, max:30}),
    check("age")
    .exists()
    .notEmpty()
    .isNumeric(),
    check("password")
    .exists()
    .notEmpty()
    .isLength({ min:3, max:10}),
    check("email")
    .exists()
    .notEmpty()
    .isEmail(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];

const validatorLoginItem = [
    check("name")
    .exists()
    .notEmpty()
    .isLength({ min:3, max:30}),
    check("age")
    .exists()
    .notEmpty()
    .isNumeric(),
    check("password")
    .exists()
    .notEmpty()
    .isLength({ min:3, max:10}),
    check("email")
    .exists()
    .notEmpty()
    .isEmail(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];


module.exports = { validatorRegisterItem, validatorLoginItem };