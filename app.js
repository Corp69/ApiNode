//?==========================================================================================================================================================================================
//? ********* APLICACION: lIBRERIAS PARA EL SERVER ************************************** 
require("dotenv").config();
const express = require ("express"); 
const cors = require ("cors"); 
const app = express(); 
//?==========================================================================================================================================================================================
//? ********* APLICACION: CORS CONFIGURACION EN SALIDA JSON ************************************** 
app.use(cors());
app.use(express.json());
app.use(express.static("storage"));
//?==========================================================================================================================================================================================
//? ********* APLICACION: PUERTO Y SALIDA DEL DOMINIO ************************************** 
const port = process.env.PORT || 3000;
app.use("/api", require("./routes"));
app.listen(port , () => {
    console.log( ` Tu app esta lista por el puerto http://localhost:${port}`);
});
//?==========================================================================================================================================================================================
//? ********* CONEXION: METODOS Y MAS ************************************** 
//const { accesoBD } = require ('./config/pg4');
//let usuario ="eli"; 
//let passs ="123"; 
//accesoBD( usuario , passs );


