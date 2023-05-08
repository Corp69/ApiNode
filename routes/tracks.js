/**
 * @variable express =>
 * @variable router =>
 * @variable router =>
 */
const express = require("express");
const router = express.Router();
const { getItems, getItem, createItem } = require("../controllers/tracks");


router.get("/", getItems);

router.post("/",createItem);



/**
 * @module router =>
 */
module.exports = router;