import  { getDB}  from '../../db.js';
import { ObjectId } from 'mongodb';

const queryAllProductos = async(callback) => {
    const baseDeDatos = getDB();
    await baseDeDatos
        .collection('productos')
        .find({})
        // .limit(50)
        .toArray(callback);


};

const crearProducto = async (datosProducto, callback) => {
    if (
      Object.keys(datosProducto).includes('nombre') &&
      Object.keys(datosProducto).includes('categoria') &&
      Object.keys(datosProducto).includes('precio')
    ) {
      const baseDeDatos = getDB();
      // implementar código para crear vehículo en la BD
  
      await baseDeDatos.collection('productos').insertOne(datosProducto, callback);
    } else {
      return 'error';
    }
  };

const editarProducto = async ( edicion, callback) => {
    const filtroproducto = {_id: new ObjectId(edicion.id)};
    delete edicion.id;
    const operacion = {$set: edicion,};
    const baseDeDatos = getDB();
    await baseDeDatos
        .collection('productos')
        .findOneAndUpdate(filtroproducto,operacion, {upsert: true,returnOriginal: true },  callback );
};

const eliminarProducto = async (id,callback)=>{
    const filtroproducto = {
      _id: new ObjectId(id)
  };
  const baseDeDatos = getDB();
  await baseDeDatos
      .collection('productos')
      .deleteOne(
          filtroproducto, callback);
};

export {queryAllProductos, crearProducto, editarProducto,eliminarProducto};