const express = require("express");
const router = express.Router();
const { getItems, getItem, createItem } = require("../controllers/tracks");
const {   validatorCreateItem } = require("../validators/tracks");
const customHeader = require("../middleware/customHeader");

router.get("/", getItems);

router.post("/", validatorCreateItem, createItem );

module.exports = router;