import Express from 'express';
import { queryAllProductos, crearProducto, editarProducto, eliminarProducto} from '../../controllers/productos/controller.js';
const rutasProductos = Express.Router();
const genericCallBack = (res) => (err, result) => {
    if (err) {
      console.log('error', err);
      res.status(500).json({ error: err });
    } else {
      res.json(result);
    }
  };
  
rutasProductos.route('/productos').get((req, res) => {
    queryAllProductos(genericCallBack(res));
});
rutasProductos.route('/productos/nuevo').post((req, res) => {
    crearProducto(req.body, genericCallBack(res));
});

rutasProductos.route('/productos/editar').patch((req, res) => {
    editarProducto(req.body, genericCallBack(res));
});

rutasProductos.route('/productos/eliminar').delete((req, res) => {
    eliminarProducto(req.body.id, genericCallBack(res));


});



export default rutasProductos;