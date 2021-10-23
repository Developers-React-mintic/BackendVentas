import Express from 'express';
import { queryAllProductos, crearProducto, editarProducto, eliminarProducto, consultarProducto} from '../../controllers/productos/controller.js';
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
rutasProductos.route('/productos').post((req, res) => {
    crearProducto(req.body, genericCallBack(res));
});

rutasProductos.route('/productos/:id').get((req, res) => {
    consultarProducto(req.params.id,genericCallBack(res));
});

rutasProductos.route('/productos/:id').patch((req, res) => {
    editarProducto(req.params.id,req.body , genericCallBack(res));
});

rutasProductos.route('/productos/:id').delete((req, res) => {
    eliminarProducto(req.params.id, genericCallBack(res));


});



export default rutasProductos;