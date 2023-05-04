/**
 *  @variable mongoose => 
 *  @variable NODE_ENV => 
 */
const mongoose = require("mongoose");
/**
 *  @variable dbConnect => 
 *  @variable DB_URI => 
 */
const dbConnect = async () => {
  try {
    const DB_URI = await process.env.DB_URI;
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("***************** conexion exitosa ");

  }
  catch (error) {
    console.log(error);
  }
}
/**
 * @module dbConnect =>
 */
module.exports = dbConnect;