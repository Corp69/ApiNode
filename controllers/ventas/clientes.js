const {
  Qtabla,
  QTbBuscarId,
  QAlmacenarActualizar,
  QMaxID,
  QTBEliminar,
  QPgValidaTabla,
  QlstTable
} = require('../../config/pg4');

const lstTbClientes = async (req, res) => {
  let QtablaPg = await QPgValidaTabla(req.body.Qtabla.toString());
  if (QtablaPg > 0) {
    if (req.params.id > 0) {
      let QBusqueda = await QlstTable(req.body.Qtabla.toString(), req.params.id);
      res.status(200);
      res.send({
        "Ttitulo:": `Modulo Cliente: ${req.body.Qtabla.toString()}`,
        "Mensaje": "la consulta de manera exitosa !",
        "Detalle": QBusqueda
      });
    }
    else {
      let tablaempresa = await Qtabla(req.body.Qtabla.toString());
      res.status(200);
      res.send({
        "Ttitulo:": `Modulo Cliente: ${req.body.Qtabla.toString()}`,
        "Mensaje": "la consulta de manera exitosa !",
        "Detalle": tablaempresa
      });
    }
  }
  else {
    res.status(200);
    res.send({
      "Ttitulo:": `Modulo: Cliente`,
      "Mensaje": `Error tu Tabla No Existe, verificar Nombre: ${req.body.Qtabla.toString()}`
    });
  }
};

const TbClientes = async (req, res) => {
  let QtablaPg = await QPgValidaTabla(req.body.Qtabla.toString());
  if (QtablaPg > 0) {
    if (req.params.id > 0) {
      let QBusqueda = await QTbBuscarId(req.body.Qtabla.toString(), req.params.id);
      res.status(200);
      res.send({
        "Ttitulo:": `Modulo Cliente: ${req.body.Qtabla.toString()}`,
        "Mensaje": "la consulta de manera exitosa !",
        "Detalle": QBusqueda
      });
    }
    else {
      let tablaempresa = await Qtabla(req.body.Qtabla.toString());
      res.status(200);
      res.send({
        "Ttitulo:": `Modulo Cliente: ${req.body.Qtabla.toString()}`,
        "Mensaje": "la consulta de manera exitosa !",
        "Detalle": tablaempresa
      });
    }
  }
  else {
    res.status(200);
    res.send({
      "Ttitulo:": `Modulo: Cliente`,
      "Mensaje": `Error tu Tabla No Existe, verificar Nombre: ${req.body.Qtabla.toString()}`
    });
  }
};

const AlmacenarCliente = async (req, res) => {
  let QtablaPg = await QPgValidaTabla(req.body.Qtabla.toString());
  if (QtablaPg > 0) {
    if (req.body.Datos.id > 0) {
      let resCliente = await QAlmacenarActualizar(req.body.Qtabla.toString(), req.body.Datos);
      if (resCliente.rowCount != 1) {
        res.status(200);
        res.send({
          "Ttitulo:": `Modulo Cliente: ${req.body.Qtabla.toString()}`,
          "Mensaje": "No Actualizo Correctamente!",
          "Detalle": resCliente
        });
      } else {
        res.status(200);
        res.send({
          "Ttitulo:": `Modulo Cliente: ${req.body.Qtabla.toString()}`,
          "Mensaje": "Se Actualizo Correctamente!",
          "Detalle": req.body.Datos.id
        });
      }
    }
    else {
      let resCliente = await QAlmacenarActualizar(req.body.Qtabla.toString(), req.body.Datos);
      if (resCliente.rowCount != 1) {
        res.status(200);
        res.send({
          "Ttitulo:": `Modulo Cliente: ${req.body.Qtabla.toString()} `,
          "Mensaje": "No Actualizo Correctamente!",
          "Detalle": resCliente
        });
      } else {
        let maxId = await QMaxID(req.body.Qtabla.toString());
        console.log(maxId)
        res.status(201);
        res.send({
          "Ttitulo:": `Modulo Cliente: ${req.body.Qtabla.toString()}`,
          "Mensaje": "Se Almaceno Correctamente!",
          "Detalle": maxId[0].id
        });
      }
    }
  } else {
    res.status(200);
    res.send({
      "Ttitulo:": `Modulo: Cliente`,
      "Mensaje": `Error tu Tabla No Existe, verificar Nombre: ${req.body.Qtabla.toString()}`
    });
  }
};

const EliminarCliente = async (req, res) => {
  //let Qrespuesta = await QTBEliminar(req.body.Qtabla.toString(), req.body.Datos);
  let QtablaPg = await QPgValidaTabla(req.body.Qtabla.toString());
  if (QtablaPg > 0) {
    let QEliminaIDS = await QTBEliminar(req.body.Qtabla.toString(), req.body.Datos.ids);
    if (QEliminaIDS.id <= 0) {
      res.status(200);
      res.send({
        "Ttitulo:": `Modulo Cliente: ${req.body.Qtabla.toString()}`,
        "Mensaje": `Error No se Elimino.`,
        "Detalle": `${QEliminaIDS.error.toString()}.`,
      });
    }
    else {
      res.status(200);
      res.send({
        "Ttitulo:": `Modulo Cliente: ${req.body.Qtabla.toString()}`,
        "Mensaje": `Se Eliminan Correctamente.`
      });
    }
  }
  else {
    res.status(200);
    res.send({
      "Ttitulo:": `Modulo: Cliente`,
      "Mensaje": `Error tu Tabla No Existe, verificar Nombre: ${req.body.Qtabla.toString()}`
    });
  }
};


function RCaracteres(cadena) {
  // Expresión regular para buscar caracteres especiales y espacios
  let regex = /[^a-zA-Z0-9]/g;
  // Reemplazar los caracteres especiales y espacios con una cadena vacía
  let nuevaCadena = cadena.replace(regex, '');
  return nuevaCadena.trim();
}

module.exports = { TbClientes, AlmacenarCliente, EliminarCliente, lstTbClientes };