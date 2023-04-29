/**
 * 
 * 
 * 
 * @Const express => 
 * @Const cors => 
 * @Const app => 
 * @Const port => 
 */
const express = require ("express"); 
const cors = require ("cors"); 
const app = express(); 
//const port = 3000;

app.use(cors());

/**
 * @Const port: =>
 * 
 */
const port = process.env.PORT || 3000;

/**
 * @Variable App => 
 */
app.listen(port , () => {
    console.log( ' Tu app esta lista por el puerto http://localhost' + port ); 
})