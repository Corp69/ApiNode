
const uploadMiddleware = require("../utils/handleStorage");
const express = require("express");
const { validatorGetItem } = require("../validators/storage");
const router = express.Router();
const {
  getItems,
  getItem,
  deleteItem,
  createItem,
} = require("../controllers/storage");
// Todo http://localhost:3000/storage;

/*
router.get("/", getItems);
router.get("/:id", validatorGetItem, getItem);
router.post("/", uploadMiddleware.single("myfile"), createItem);
router.delete("/:id",validatorGetItem,deleteItem);
*/

module.exports = router;