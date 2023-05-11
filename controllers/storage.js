const { storageModel } = require('../models');
const PUBLIC_URL = process.env.PUBLIC_URL;


const getItems = async ( req, res) => {
    const data = await storageModel.find({});
    res.send({data});
};

const getItem  = ( req, resp) => {
    const data = storageModel.find({});
};

const createItem = async ( req, res ) => {
    const { file } = req;
    
    const fileData = {
        filename: file.filename,
        url: `${PUBLIC_URL}/${file.filename}`,
      };
      console.log( " ====> " ,  fileData  );
   
    const data = await storageModel.create( fileData );
    res.send( { data });

};

const updateItem = ( req, resp ) => {
    const data = storageModel.find({});
};

const deletItem  = ( req, resp ) => {
    const data = storageModel.find({});
};

/**
 * @module 
 */
module.exports = { getItems, getItem, createItem, updateItem, deletItem };