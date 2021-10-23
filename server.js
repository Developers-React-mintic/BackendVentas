import Express from 'express';
import  {conectarBD}  from './db.js';
import dotenv from 'dotenv';
import Cors from 'cors';
import rutasProductos from './views/productos/routes.js';
dotenv.config({
    path: './.env'
});
const app = Express();

app.use(Express.json());
app.use(Cors());
app.use(rutasProductos);

const main = () => { 
    return app.listen(process.env.PORT, () => {
        console.log('escuchando peticiones puerto ', process.env.PORT);
    });
};
conectarBD(main);