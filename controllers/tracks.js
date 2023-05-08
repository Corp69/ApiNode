/**
 * 
 */
const { tracksModel } = require('../models');

/**
 * @variable   getItems:  => 
 * @param  {*} req  : 
 * @param  {*} resp : 
 * @variable   getItem:  =>
 * @param  {*} req  : 
 * @param  {*} resp : 
 * @variable   createItem:  => 
 * @param  {*} req  : 
 * @param  {*} resp : 
 * @variable   updateItem:  => 
 * @param  {*} req  : 
 * @param  {*} resp :
 * @variable   deletItem:  => 
 * @param  {*} req  : 
 * @param  {*} resp :
*/
const getItems = async ( req, res) => {
    const data = await tracksModel.find({});
    res.send({data});
};

const getItem  = ( req, resp) => {
    const data = tracksModel.find({});
};
const createItem = async ( req, res ) => {
    
    const { body } = req;
    console.log( " datos del body" ,  body  );
    const data = await tracksModel.create( body );
    res.send( { data });


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