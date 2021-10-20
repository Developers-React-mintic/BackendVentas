//const express = require('express');
import Express, { response } from 'express';

const app = Express();
app.use(Express.json());
//Listar Todos los productos
app.get("/productos",(req, res)=>{
    console.log("alguien hizo get a mi ruta")
    const productos =[
        {nombre:'martillo',categoria: 'Basicas', precio:'$30.000'  },
        {nombre:'Arena',categoria: 'Material', precio:'$50.000'  },
        {nombre:'Ducha',categoria: 'Baño', precio:'$100.000'  }
    ];
    res.send(productos);

});
//Crear Productos
app.post("/productos/nuevo", (req, res)=>{
    console.log(req.body);
    res.send('ok, producto creado');
});


app.listen(5000, () => {
    console.log('escuchando peticiones 5000');
});