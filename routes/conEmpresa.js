const express = require("express");
const { Tbempresa } = require("../controllers/ConfEmpresa/ctrConfEmpresa");
const authMiddleware = require("../middleware/session");


const router = express.Router();
//router.get("/config",  authMiddleware, Tbempresa);
router.get("/config", Tbempresa);
//router.get("/:id", authMiddleware, validatorGetItem, getItem);
//router.post("/", authMiddleware, checkRol(["user"]), validatorCreateItem, createItem );
//router.put("/:id", authMiddleware, validatorGetItem, validatorCreateItem, updateItem );
//router.delete("/:id", authMiddleware, validatorGetItem, deletItem );



module.exports = router;