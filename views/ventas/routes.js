import Express from 'express';
import {queryAllVentas, crearVenta, editarVenta,eliminarVenta, consultarVenta} from '../../controllers/Ventas/controller.js';
const rutasVentas = Express.Router();
const genericCallBack = (res) => (err, result) => {
    if (err) {
      console.log('error', err);
      res.status(500).json({ error: err });
    } else {
      res.json(result);
    }
  };
  
rutasVentas.route('/Ventas').get((req, res) => {
    queryAllVentas(genericCallBack(res));
});
rutasVentas.route('/Ventas').post((req, res) => {
    crearVenta(req.body, genericCallBack(res));
});
rutasVentas.route('/Ventas/:id').get((req, res) => {
    consultarVenta(req.params.id,genericCallBack(res));
});
rutasVentas.route('/Ventas/:id').patch((req, res) => {
    editarVenta(req.params.id,req.body , genericCallBack(res));
});
rutasVentas.route('/Ventas/:id').delete((req, res) => {
    eliminarVenta(req.params.id, genericCallBack(res));
});



export default rutasVentas;