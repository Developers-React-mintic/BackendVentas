////

//mongodb+srv://admin_jeferson:admin_jeferson@proyectomintic.m7qai.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
//const express = require('express');
import Express, {
    response
} from 'express';
import {
    MongoClient,
    ObjectId
} from 'mongodb';

import Cors from 'cors';
const stringconexion = 'mongodb+srv://admin:axppEepj4IuwvyKN@proyectomintic.m7qai.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const client = new MongoClient(stringconexion, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let baseDeDatos;


const app = Express();
app.use(Express.json());
app.use(Cors());
//Listar Todos los productos
app.get("/productos", (req, res) => {
    console.log("alguien hizo get a mi ruta")
    baseDeDatos
        .collection('productos')
        .find({})
        // .limit(50)
        .toArray((err, result) => {
            if (err) {
                res.status(500).send('Error consultando productos');
            } else {
                res.json(result);
            }
        });


});
//Crear Productos
app.post("/productos/nuevo", (req, res) => {
    const datosProducto = req.body;
    try {

        baseDeDatos.collection('productos').insertOne(datosProducto, (err, result) => {
            if (err) {
                console.error(err);
                res.sendStatus(500);
            } else {
                // console.log(res);
                res.sendStatus(200);
            }

        })
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }


});
//actualizar
app.patch("/productos/editar", (req, res) => {
    const edicion = req.body;
    
    const filtroproducto = {
        _id: new ObjectId(edicion.id)
    };
    delete edicion.id;
    const operacion = {
        $set: edicion,
    };
    console.log(edicion);
    baseDeDatos
    .collection('productos')
    .findOneAndUpdate(
        filtroproducto,
      operacion,
      { upsert: true, returnOriginal: true },
      (err, result) => {
        if (err) {
          console.error('error actualizando el producto: ', err);
          res.sendStatus(500);
        } else {
          console.log('actualizado con exito');
          res.sendStatus(200);
        }
      }
    );
});

app.delete("/productos/eliminar", (req, res) => {
    const eliminar = req.body;
    const filtroproducto = {
        _id: new ObjectId(eliminar.id)
    };
    baseDeDatos
    .collection('productos')
    .deleteOne(
        filtroproducto,(err,result)=>{
                if(err){
                    console.error('error eliminando el producto: ', err);
                    res.sendStatus(500);

                }else {
                    console.log('eliminado con exito');
                    res.sendStatus(200);
                  }
        });
      



});

const main = () => {
    client.connect((err, db) => {

        if (err) {
            console.error('Error connect to database');

        }
        baseDeDatos = db.db('mintic');
        console.log('conexion exitosa');
        return app.listen(5000, () => {
            console.log('escuchando peticiones 5000');
        });

    });


};

main();