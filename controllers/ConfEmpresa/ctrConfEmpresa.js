const { Qtabla } = require ('../../config/pg4'); 

const Tbempresa = async ( req, res) => {
  
  let tablaempresa = await Qtabla("conf_empresa");

  res.status(200);
  res.send({ 
    "Ttitulo:":"API NODE", 
    "Mensaje":"la consulta de manera exitosa !", 
    "Detalle": tablaempresa
  });
  
};

const getItem  = async( req, res) => {

};
const createItem = async ( req, res ) => {

};

const updateItem = async ( req, res ) => {
    
};

const deletItem  = async ( req, res ) => {
       
};

/**
 * @module 
 */
module.exports = { Tbempresa, getItem, createItem, updateItem, deletItem };