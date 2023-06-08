const express = require("express");
const { getItems, getItem, createItem, updateItem, deletItem } = require("../controllers/tracks");
const {
    validatorCreateItem,
    validatorGetItem,
  } = require("../validators/tracks");
const customHeader = require("../middleware/customHeader");
const authMiddleware = require("../middleware/session");
const checkRol = require("../middleware/rol");


const router = express.Router();
router.get("/",  authMiddleware, getItems);
router.get("/:id", authMiddleware, validatorGetItem, getItem);
router.post("/", authMiddleware, checkRol(["user"]), validatorCreateItem, createItem );
router.put("/:id", authMiddleware, validatorGetItem, validatorCreateItem, updateItem );
router.delete("/:id", authMiddleware, validatorGetItem, deletItem );



module.exports = router;