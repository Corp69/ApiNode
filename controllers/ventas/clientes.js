const { Qtabla, QTbBuscarId, QAlmacenarActualizar, QMaxID } = require ('../../config/pg4'); 

const TbClientes = async ( req, res) => {
    if (req.params.id > 0) {
        let QTbBuscarId = await Qtabla("cliente",req.params.id);
        res.status(200);
        res.send({ 
          "Ttitulo:":"Cliente", 
          "Mensaje":"la consulta de manera exitosa !",
          "Detalle": QTbBuscarId
        });
    }
    else {
        let tablaempresa = await Qtabla("cliente");
        res.status(200);
        res.send({ 
          "Ttitulo:":"API NODE", 
          "Mensaje":"la consulta de manera exitosa !",
          "Detalle": tablaempresa
        });
    }
 
};

const AlmacenarCliente = async ( req, res) => {
    if ( req.body.id > 0) {
        let resCliente = await QAlmacenarActualizar("cliente",req.body);
        console.log(resCliente.rowCount);
        if (resCliente.rowCount != 1 ) {
          res.status(200);
          res.send({ 
            "Ttitulo:":"Modulo Cliente", 
            "Mensaje":"No Actualizo Correctamente!",
            "Detalle": resCliente
          });
        } else {
          res.status(200);
          res.send({ 
            "Ttitulo:":"Modulo Cliente", 
            "Mensaje":"Se Actualizo Correctamente!",
            "Detalle": req.body.id
          });          
        }
    }
    else {
        let resCliente = await QAlmacenarActualizar("cliente",req.body);
        if (resCliente.rowCount != 1 ) {
          res.status(200);
          res.send({ 
            "Ttitulo:":"Modulo Cliente", 
            "Mensaje":"No Actualizo Correctamente!",
            "Detalle": resCliente
          });
        } else {
          let maxId = await QMaxID("cliente");
          console.log(maxId)
          res.status(201);
          res.send({ 
            "Ttitulo:":"Modulo Cliente", 
            "Mensaje":"Se Almaceno Correctamente!",
            "Detalle": maxId[0].id
          });          
        }
    }
 
};




module.exports = { TbClientes, AlmacenarCliente };