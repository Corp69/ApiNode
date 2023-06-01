const express = require("express");
const { getItems, getItem, createItem, updateItem, deletItem } = require("../controllers/tracks");
const {
    validatorCreateItem,
    validatorGetItem,
  } = require("../validators/tracks");
const customHeader = require("../middleware/customHeader");
const authMiddleware = require("../middleware/session");

const router = express.Router();
router.get("/",  authMiddleware, getItems);
router.get("/:id", validatorGetItem, getItem);
router.post("/", validatorCreateItem, createItem );
router.put("/:id", validatorGetItem, validatorCreateItem, updateItem );
router.delete("/:id", validatorGetItem, deletItem );



module.exports = router;