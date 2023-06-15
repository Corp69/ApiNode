const express = require("express");
const { TbClientes, AlmacenarCliente } = require("../controllers/ventas/clientes");
const authMiddleware = require("../middleware/session");


const router = express.Router();
router.get("/",    authMiddleware, TbClientes);
router.get("/:id", authMiddleware, TbClientes);
router.post("/", authMiddleware, AlmacenarCliente);
//router.put("/:id", authMiddleware, validatorGetItem, validatorCreateItem, updateItem );
//router.delete("/:id", authMiddleware, validatorGetItem, deletItem );



module.exports = router;