/**
 * @variable
 * 
 */

const models = {

    userModel:require('./nosql/users'),
    tracksModel:require('./nosql/tracks'),
    storageModel:require('./nosql/tracks')
}

/**
 * @module 
 */
module.exports = models;