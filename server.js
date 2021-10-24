import Express from "express";
import jwt from "express-jwt";
import jwks from "jwks-rsa";
import { conectarBD } from "./db.js";
import dotenv from "dotenv";
import Cors from "cors";
import rutasProductos from "./views/productos/routes.js";
import rutasUsuarios from "./views/usuarios/routes.js";
import rutasVentas from "./views/ventas/routes.js";
dotenv.config({
  path: "./.env",
});
const app = Express();
const puerto= process.env.PORT || 5000;
app.use(Express.json());
app.use(Cors());
var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://mision-tic.us.auth0.com/.well-known/jwks.json",
  }),
  audience: "api-autenticacion-ferreteria-mintic",
  issuer: "https://mision-tic.us.auth0.com/",
  algorithms: ["RS256"],
});
app.use(jwtCheck);
app.use(rutasProductos);
app.use(rutasUsuarios);
app.use(rutasVentas);

const main = () => {
  return app.listen(puerto, () => {
    console.log("escuchando peticiones puerto ", puerto);
  });
};
conectarBD(main);
