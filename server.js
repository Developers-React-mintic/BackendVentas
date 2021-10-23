////

//mongodb+srv://admin_jeferson:admin_jeferson@proyectomintic.m7qai.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
//const express = require('express');
import Express, {
    response
} from 'express';
import {
    MongoClient
} from 'mongodb';


const stringconexion = 'mongodb+srv://admin:axppEepj4IuwvyKN@proyectomintic.m7qai.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const client = new MongoClient(stringconexion, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let baseDeDatos;


const app = Express();
app.use(Express.json());
//Listar Todos los productos
app.get("/productos", (req, res) => {
    console.log("alguien hizo get a mi ruta")
    baseDeDatos
        .collection('productos')
        .find({})
       // .limit(50)
        .toArray((err,result)=>{
            if(err){
                res.status(500).send('Error consultando productos');
            }else{
                res.json(result);
            }
        });
  

});
//Crear Productos
app.post("/productos/nuevo", (req, res) => {
    const datosProducto=req.body;
    try {
        
        baseDeDatos.collection('productos').insertOne(datosProducto,(err, result)=>{
            if (err){
                console.error(err);
                res.sendStatus(500);
            }else{
               // console.log(res);
                res.sendStatus(200);
            }

        })
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
    
   
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