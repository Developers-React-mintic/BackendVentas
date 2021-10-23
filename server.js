import Express from 'express';
import  {conectarBD}  from './db.js';
import dotenv from 'dotenv';
import Cors from 'cors';
import rutasProductos from './views/productos/routes.js';
import rutasUsuarios from './views/usuarios/routes.js';
import rutasVentas from './views/ventas/routes.js';
dotenv.config({
    path: './.env'
});
const app = Express();

app.use(Express.json());
app.use(Cors());
app.use(rutasProductos);
app.use(rutasUsuarios);
app.use(rutasVentas);

const main = () => { 
    return app.listen(process.env.PORT, () => {
        console.log('escuchando peticiones puerto ', process.env.PORT);
    });
};
conectarBD(main);