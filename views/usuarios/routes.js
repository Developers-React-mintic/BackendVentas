import Express from 'express';
import  {queryAllUsuarios, crearUsuario, editarUsuario,eliminarUsuario, consultarUsuario} from '../../controllers/usuarios/controller.js';
const rutasUsuarios = Express.Router();
const genericCallBack = (res) => (err, result) => {
    if (err) {
      console.log('error', err);
      res.status(500).json({ error: err });
    } else {
      res.json(result);
    }
  };
  
rutasUsuarios.route('/usuarios').get((req, res) => {
    queryAllUsuarios(genericCallBack(res));
});
rutasUsuarios.route('/usuarios').post((req, res) => {
    crearUsuario(req.body, genericCallBack(res));
});
rutasUsuarios.route('/usuarios/:id').get((req, res) => {
    consultarUsuario(req.params.id,genericCallBack(res));
});
rutasUsuarios.route('/usuarios/:id').patch((req, res) => {
    editarUsuario(req.params.id,req.body , genericCallBack(res));
});
rutasUsuarios.route('/usuarios/:id').delete((req, res) => {
    eliminarUsuario(req.params.id, genericCallBack(res));
});



export default rutasUsuarios;