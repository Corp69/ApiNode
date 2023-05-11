
require("dotenv").config();
const express = require ("express"); 
const cors = require ("cors"); 
const dbConnect = require ('./config/mongo'); 
const app = express(); 
//const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("storage"));
/**
 * @Const port: =>
 * 
 */
const port = process.env.PORT || 3000;
/***
 * 
 * @variable Routes => 
 * 
 */
app.use("/api", require("./routes"));


/**
 * @Variable App => 
 */
app.listen(port , () => {
    console.log( ` Tu app esta lista por el puerto http://localhost:${port}`);
})

dbConnect();