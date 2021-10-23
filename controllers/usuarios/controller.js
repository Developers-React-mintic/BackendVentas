import  { getDB}  from '../../db.js';
import { ObjectId } from 'mongodb';

const queryAllUsuarios = async(callback) => {
    const baseDeDatos = getDB();
    await baseDeDatos
        .collection('usuarios')
        .find({})
        .toArray(callback);
};
const consultarUsuario = async (id,callback) =>{
  const baseDeDatos = getDB();
  await baseDeDatos
      .collection('usuarios')
      .findOne({_id:new ObjectId(id) },callback);
};
const crearUsuario = async (datosusuarios, callback) => {
      const baseDeDatos = getDB();
      await baseDeDatos.collection('usuarios').insertOne(datosusuarios, callback);
};
const editarUsuario = async ( id, edicion, callback) => {
    const filtrousuarios = { _id: new ObjectId(id)};   
    const operacion = {$set: edicion,};
    const baseDeDatos = getDB();
    await baseDeDatos
        .collection('usuarios')
        .findOneAndUpdate(filtrousuarios,operacion, {upsert: true,returnOriginal: true },  callback );
};

const eliminarUsuario = async (id,callback)=>{
    const filtrousuarios = {
      _id: new ObjectId(id)
  };
  const baseDeDatos = getDB();
  await baseDeDatos
      .collection('usuarios')
      .deleteOne(
          filtrousuarios, callback);
};
export {queryAllUsuarios, crearUsuario, editarUsuario,eliminarUsuario, consultarUsuario};