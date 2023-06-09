require("dotenv").config();
const express = require ("express"); 
const cors = require ("cors"); 
const dbConnectNoSql = require ('./config/mongo'); 
const dbConnectPg4 = require ('./config/pg4'); 
const app = express(); 

//const morganBody = require("morgan-body");
//const port = 3000;
//const ENGINE_DB = process.env.ENGINE_DB;

const ENGINE_DB = process.env.ENGINE_DB;
const NODE_ENV = process.env.NODE_ENV || 'development';

app.use(cors());
app.use(express.json());
app.use(express.static("storage"));

const port = process.env.PORT || 3000;

app.use("/api", require("./routes"));

app.listen(port , () => {
    console.log( ` Tu app esta lista por el puerto http://localhost:${port}`);
});

//? EVALUAMOS EL MOTOR 
//(ENGINE_DB === 'nosql') ? dbConnectNoSql() : dbConnectMySql();

dbConnectPg4("users");