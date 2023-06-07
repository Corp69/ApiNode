require("dotenv").config();
const express = require ("express"); 
const cors = require ("cors"); 
const dbConnectNoSql = require ('./config/mongo'); 
const { dbConnectMySql } = require("./config/pg");
const app = express(); 

//const { Client } = require('pg');

/*
const connectionData = {
    user: 'postgres',
    host: 'localhost',
    database: 'Dev',
    password: '12345dev',
    port: 5432
}
*/

/*
  const client = new Client(connectionData);
  client.connect();
  client.query('SELECT * FROM conf_empresa_estatus').then(response => {
          console.log(response.rows);
          client.end();
      }).catch(err => { client.end();});
*/

//const morganBody = require("morgan-body");
//const port = 3000;
//const ENGINE_DB = process.env.ENGINE_DB;



app.use(cors());
app.use(express.json());
app.use(express.static("storage"));

const port = process.env.PORT || 3000;

app.use("/api", require("./routes"));

app.listen(port , () => {
    console.log( ` Tu app esta lista por el puerto http://localhost:${port}`);
});

dbConnectMySql();

//(ENGINE_DB === 'nosql') ? dbConnectNoSql() : dbConnectMySql();