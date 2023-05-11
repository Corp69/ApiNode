const { matchedData } = require("express-validator");
const { tracksModel } = require("../models");
const handleHttpError  = require("../utils/handleHttpError");

const getItems = async ( req, res) => {
    
    const data = await tracksModel.find({});
    res.send({data});

};

const getItem  = ( req, resp) => {
    const data = tracksModel.find({});
};
const createItem = async ( req, res ) => {
    try {
        const body = matchedData(req);
        const data = await tracksModel.create(body);
        res.status(201);
        res.send({ data });
      } catch (e) {
        handleHttpError(res, "ERROR_CREATE_ITEMS");
      }
};

const updateItem = ( req, resp ) => {
    const data = tracksModel.find({});
};

const deletItem  = ( req, resp ) => {
    const data = tracksModel.find({});
};

/**
 * @module 
 */
module.exports = { getItems, getItem, createItem, updateItem, deletItem };