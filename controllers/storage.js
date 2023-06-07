const { storageModel } = require('../models');
const { matchedData } = require("express-validator");
const PUBLIC_URL = process.env.PUBLIC_URL;
const handleHttpError  = require("../utils/handleHttpError");
const fs = require('fs');
const MEDIA_PATH = `${__dirname}/../storage`;


const getItems = async (req, res) => {
    try {
      const data = await storageModel.find({});
      res.send({ data });
    } catch (e) {
      handleHttpError(res, "Error Al Generar Listado");
    }
  };

  const getItem = async (req, res) => {
    try {
      const { id } = matchedData(req);
      const data = await storageModel.findById(id);
      res.send({ data });
    } catch (e) {
      console.log(e)
      handleHttpError(res, "Error al obtener Storage");
    }
  };

  const createItem = async (req, res) => {
    try {
      const { file } = req;
      const fileData = {
        filename: file.filename,
        url: `${PUBLIC_URL}/${file.filename}`,
      };
      const data = await storageModel.create(fileData);
      res.status(201);
      res.send({ data });
    } catch (e) {
      handleHttpError(res, "ERROR AL ALMACENAR EL STORAGE");
    }
  };
/*
const updateItem = ( req, resp ) => {
    const data = storageModel.find({});
};
*/
const deleteItem = async (req, res) => {
    try {
      const { id } = matchedData(req);
      const dataFile = await storageModel.findById(id);
      const deleteResponse = await storageModel.delete({ _id: id });
      //await storageModel.delete({_id: id})
      const { filename } = dataFile;
      const filePath = `${MEDIA_PATH}/${filename}`; //TODO c:/miproyecto/file-1232.png
  
      fs.unlinkSync(filePath);
      const data = {
        filePath,
        deleted: deleteResponse.matchedCount,
      };
  
      res.send({ data });
    } catch (e) {
      handleHttpError(res, "ERROR AL ELIMINAR EL STORAGE");
    }
  };


module.exports = { getItems, getItem, createItem, deleteItem };