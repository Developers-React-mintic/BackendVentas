import  { getDB}  from '../../db.js';
import { ObjectId } from 'mongodb';

const queryAllVentas = async(callback) => {
    const baseDeDatos = getDB();
    await baseDeDatos
        .collection('ventas')
        .find({})
        // .limit(50)
        .toArray(callback);
};
const consultarVenta = async (id,callback) =>{
  const baseDeDatos = getDB();
  await baseDeDatos
      .collection('ventas')
      .findOne({_id:new ObjectId(id) },callback);
};
const crearVenta = async (datosVentas, callback) => {
      const baseDeDatos = getDB();
      // implementar código para crear vehículo en la BD
      await baseDeDatos.collection('ventas').insertOne(datosVentas, callback);
};
const editarVenta = async ( id, edicion, callback) => {
    const filtroVentas = { _id: new ObjectId(id)};   
    const operacion = {$set: edicion,};
    const baseDeDatos = getDB();
    await baseDeDatos
        .collection('ventas')
        .findOneAndUpdate(filtroVentas,operacion, {upsert: true,returnOriginal: true },  callback );
};

const eliminarVenta = async (id,callback)=>{
    const filtroVentas = {
      _id: new ObjectId(id)
  };
  const baseDeDatos = getDB();
  await baseDeDatos
      .collection('ventas')
      .deleteOne(
          filtroVentas, callback);
};
export {queryAllVentas, crearVenta, editarVenta,eliminarVenta, consultarVenta};