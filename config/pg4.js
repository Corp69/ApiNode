//=========================================================================================================================================================================================================================
//?===> Variables de entorno
const ENGINE_PG4user = process.env.PG4user;
const ENGINE_PG4host = process.env.PG4host;
const ENGINE_PG4database = process.env.PG4database;
const ENGINE_PG4password = process.env.PG4password;
const ENGINE_PG4port = process.env.PG4port;
//=========================================================================================================================================================================================================================
//? ====> Cliente O libreria de conexion Pg4
const { Client } = require('pg');
const { Pool } = require('pg');

//=========================================================================================================================================================================================================================
//? ====> Generamos la Conexion.
//const connectionData = { user: ENGINE_PG4user, host: ENGINE_PG4host, database: ENGINE_PG4database, password: ENGINE_PG4password, port: ENGINE_PG4port,  max: 3, // Limitar el pool a 3 conexiones}
const poolConfig = {
  user: ENGINE_PG4user,
  host: ENGINE_PG4host,
  database: ENGINE_PG4database,
  password: ENGINE_PG4password,
  port: ENGINE_PG4port,
  max: 3, // Limitar el pool a 3 conexiones
};
//=========================================================================================================================================================================================================================
const dbConnectPg4 = async (Tablapg) => {
  const client = new Pool(poolConfig);
  try {
    await client.connect();
    const query = `SELECT * FROM ${Tablapg}`;
    const response = await client.query(query);
    console.log(response.rows);
  } catch (err) {
    console.error(err);
  } finally {
    client.end();
  }
};

const listTabla = async (Tablapg) => {
  const client = new Pool(poolConfig);
  try {
    await client.connect();
    const query = `SELECT * FROM ${Tablapg}`;
    const response = await client.query(query);
  } catch (err) {
    console.error(err);
  } finally {
    client.end();
  }
};
//!===================================================================================================================================    
module.exports = { dbConnectPg4, listTabla } ;