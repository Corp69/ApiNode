const ENGINE_DB = process.env.ENGINE_DB;
const pathModels = ENGINE_DB === "nosql" ? "./nosql" : "./Sql";

const models = {
    userModel: require(`${pathModels}/users`),
    tracksModel: require(`${pathModels}/track`),
    storageModel: require(`${pathModels}/storage`),
}


module.exports = models;