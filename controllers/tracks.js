const { matchedData } = require("express-validator");
const { tracksModel } = require("../models");
const handleHttpError  = require("../utils/handleHttpError");

const getItems = async ( req, res) => {
  try {
    const usuario = req.user;
    const data = await tracksModel.find({});
    res.send({data, usuario});
    
  } catch (e) {
    handleHttpError( res, "ERROR AL MOMENTO DE GENERAR EL LISTADO");
  }
};

const getItem  = async( req, res) => {
    try 
    { 
      req = matchedData( req );   
      const {id} = req;
      const data = await tracksModel.findById(id);
      res.send({ data });
    } catch (e) {
        handleHttpError( res, "ERROR AL BUSCAR ")
    }
};
const createItem = async ( req, res ) => {
    try {
        const body = matchedData(req);
        const data = await tracksModel.create(body);
        res.status(201);
        res.send({ "Response": "Se Almaceno Correctamente " });
      } catch (e) {
        handleHttpError(res, "ERROR AL ALMACENAR");
      }
};

const updateItem = async ( req, res ) => {
    try {
      const {id, ...body} = matchedData(req);
      const data = await tracksModel.findByIdAndUpdate(
        id, body
      );
      res.status(200);
      res.send({ "Response": " Actualizado Correctamente" });
      } catch (e) {
        console.log( e );
        handleHttpError(res, "ERROR AL ACTUALIZAR");
      }
};

const deletItem  = async ( req, res ) => {
    try 
    {
    req = matchedData( req );   
    const {id} = req;
    //const data = await tracksModel.delete({_id: id});
    const data = await tracksModel.findByIdAndDelete({_id: id});
    res.status(200);
    res.send({ "Response": "Se elimino Correctamente " });
    } catch (e)
    {
        console.log(e);
        handleHttpError( res, "ERROR AL ELIMINAR");
    }    
};

/**
 * @module 
 */
module.exports = { getItems, getItem, createItem, updateItem, deletItem };