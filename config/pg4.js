//=========================================================================================================================================================================================================================
//?===> Variables de entorno
const ENGINE_PG4user = process.env.PG4user;
const ENGINE_PG4host = process.env.PG4host;
const ENGINE_PG4database = process.env.PG4database;
const ENGINE_PG4password = process.env.PG4password;
const ENGINE_PG4port = process.env.PG4port;
//=========================================================================================================================================================================================================================
//? ====> Cliente O libreria de conexion Pg4
//const { Client } = require('pg');
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
/*
const dbConnectPg4 = async (Tablapg) => {
  let client = new Pool(poolConfig);
  try {
    await client.connect();
    let query = `SELECT * FROM ${Tablapg}`;
    let response = await client.query(query);
    console.log(response.rows);
  } catch (err) {
    console.error(err);
  } finally {
    client.end();
  }
};
*/
const QlstTable = async (Tablapg) => {
  let client = new Pool(poolConfig);
  try {
    await client.connect();
    let query = `SELECT id, descripcion FROM ${Tablapg}`;
    let response = await client.query(query);
    return response.rows;
  } catch (err) {
    console.error(err);
  } finally {
    client.end();
  }
};

const accesoBD = async (_user, _pass) => {
  let client = new Pool(poolConfig);
  try {
    await client.connect();
    let query = `SELECT rh.rh_empleado_login('${_user.toString()}','${_pass.toString()}')`;
    let response = await client.query(query);
    return response.rows;
  } catch (err) {
    console.error(err);
  } finally {
    client.end();
  }
};

const Qtabla = async (_tabla) => {
  let client = new Pool(poolConfig);
  try {
    await client.connect();
    let query = `SELECT * from ${_tabla.toString()}`;
    let response = await client.query(query);
    return response.rows;
  } catch (err) {
    console.error(err);
  } finally {
    client.end();
  }
};

const QTbBuscarId = async (Tablapg, _id_) => {
  let client = new Pool(poolConfig);
  try {
    await client.connect();
    let query = `SELECT * from ${Tablapg} where id =${_id_}`;
    let response = await client.query(query);
    console.log(response)
    return response.rows;
  } catch (err) {
    console.error(err);
  } finally {
    client.end();
  }
};

const QAlmacenarActualizar = async (_tabla, _jsonBody_) => {
  let client = new Pool(poolConfig);
  let response = null;
  let body = _jsonBody_;
  try {
    await client.connect();
    if (_jsonBody_.id < 0) {
      delete body.id;
      let resTablaCampos = Object.keys(body);
      let valores = Object.values(body).map(parsearValor);
      let SQLqueryInsert = `INSERT INTO public.${_tabla} (id,${resTablaCampos.join(', ')}) VALUES ((select max(id) + 1 from ${_tabla}),${valores})`;
      response = await client.query(SQLqueryInsert);
    } else {    
      let resTablaCampos = Object.keys(body);
      let valores = Object.values(body).map(parsearValor);
      let sets = resTablaCampos.map((campo, index) => `${campo} = ${valores[index]}`).join(', ');
      let where = `${resTablaCampos[0]} = ${valores[0]}`;
      let SQLqueryUpdate = `UPDATE ${_tabla} SET ${sets} WHERE ${where}`;
      response = await client.query(SQLqueryUpdate);
    }
    return response;
  } catch (err) {
    console.error(err);
  } finally {
    client.end();
  }
};

const QMaxID = async (Tablapg) => {
  let client = new Pool(poolConfig);
  try {
    await client.connect();
    let query = `SELECT max(id) id FROM ${Tablapg}`;
    let response = await client.query(query);
    return response.rows;
  } catch (err) {
    console.error(err);
  } finally {
    client.end();
  }
};

const QPgValidaTabla = async (Tablapg) => {
  let client = new Pool(poolConfig);
  try {
    await client.connect();
    let query = `select "Cliente".Buscar_Tabla('${Tablapg}') tabla`;
    let response = await client.query(query);
    return response.rows[0].tabla.id;
  } catch (err) {
    console.error(err);
  } finally {
    client.end();
  }
};

const Vschema = async (Tablapg) => {
  let client = new Pool(poolConfig);
  try {
    await client.connect();
    let query = `SELECT 1 id, schema_name FROM information_schema.schemata where schema_name ='${Tablapg}'`;
    let response = await client.query(query);
    return response.rows[0];
  } catch (err) {
    console.error(err);
  } finally {
    client.end();
  }
};

const QTBEliminar = async (_Tablapg_, _ids_) => {
  let client = new Pool(poolConfig);
  try {
    await client.connect();
    let query = `delete from ${_Tablapg_} where id in (${_ids_.join(', ')})`;
    let response = await client.query(query);
    return { id: 1, "Eliminaciones": response};
  } catch (err) {
    console.error('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    console.error(err);
    console.error('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    return { id: 0, "error": err.detail } ;
  } finally {
    client.end();
  }
};

//=====================================================================================================================================
//Ejecucion de esquemas
const QEschema = async (schema, _function, _jsonBody_) => {
  let client = new Pool(poolConfig);
  let response = null;
  let body = _jsonBody_;
  try {
    await client.connect();
      //let resTablaCampos = Object.keys(body);
      let valores = Object.values(body).map(parsearValor);
      let EXCSchema = `select "${schema}".${_function}(${valores.join(', ')})`;
      response = await client.query(EXCSchema);
      console.log(response);
    return response;
  } catch (err) {
    console.error(err);
  } finally {
    client.end();
  }
};





//=====================================================================================================================================
parsearValor = (valor) => {
  if (valor === null || valor === undefined) {
    let fieldfinal = null;
    return `${fieldfinal}`
  } else if (/^\d+(\.\d+)?$/.test(valor)) {
    return parseFloat(valor);
  } else {
    let fieldfinal;
    let texto = valor.toString();
    if (texto == 'default') {
      fieldfinal = `${texto}`;
    }
    else {
      fieldfinal = `'${texto}'`;
    }
    return `${fieldfinal}`;
  }
}



//!===================================================================================================================================    
module.exports = { QlstTable, accesoBD, Qtabla, QTbBuscarId, QAlmacenarActualizar, QMaxID, QTBEliminar, QPgValidaTabla, Vschema, QEschema };