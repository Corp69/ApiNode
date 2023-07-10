const express = require("express");
const { lstTbClientes,TbClientes, AlmacenarCliente,EliminarCliente,Schemas } = require("../controllers/ventas/clientes");
const authMiddleware = require("../middleware/session");


const router = express.Router();
router.post("/",    authMiddleware, lstTbClientes);
router.post("/",    authMiddleware, TbClientes);
router.post("/",    authMiddleware, TbClientes);
router.post("/:id", authMiddleware, TbClientes);
router.post("/", authMiddleware, AlmacenarCliente);
router.post("/eliminar", authMiddleware, EliminarCliente);
//router.put("/:id", authMiddleware, validatorGetItem, validatorCreateItem, updateItem );
//router.delete("/:id", authMiddleware, validatorGetItem, deletItem );
router.post("/exce/schema",    Schemas);



module.exports = router;