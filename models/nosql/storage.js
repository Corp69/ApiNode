/**
 * @variable mongoose => 
 */
const mongoose = require("mongoose");

/**
 *  @variable StorageScheme => 
 */
const StorageScheme = new mongoose.Schema(
    {
      url: {
        type: String,
      },
      filename: {
        type: Number,
      },
    },
    {
      timestamps: true,
      versionKey: false,
    }
  );

  module.exports = mongoose.model("storages", StorageScheme);


