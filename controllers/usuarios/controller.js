import { getDB } from "../../db.js";
import { ObjectId } from "mongodb";
import jwt_decode from "jwt-decode";
import { response } from "express";
const queryAllUsuarios = async (callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection("usuarios").find({}).toArray(callback);
};
const consultarUsuario = async (id, callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos
    .collection("usuarios")
    .findOne({ _id: new ObjectId(id) }, callback);
};
const consultarOcrearUsuario = async (req, callback) => {
  const token = req.headers.authorization.split("Bearer ")[1];
  //   la url se debe cambiar por la del heroku
  const user = jwt_decode(token)["http://localhost/userData"];
  console.log(user);
  const baseDeDatos = getDB();
  await baseDeDatos
    .collection("usuarios")
    .findOne({ email: user.email }, async (err, response) => {
      console.log("response consultar DB", response);

      if (response) {
        callback(err, response);
      } else {
        user.auth0ID = user._id;
        delete user._id;
        user.rol = "inactivo";
        await crearUsuario(user, (err, respuesta) => callback(err, user));
      }
    });
};
const crearUsuario = async (datosusuarios, callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection("usuarios").insertOne(datosusuarios, callback);
};
const editarUsuario = async (id, edicion, callback) => {
  const filtrousuarios = { _id: new ObjectId(id) };
  const operacion = { $set: edicion };
  const baseDeDatos = getDB();
  await baseDeDatos
    .collection("usuarios")
    .findOneAndUpdate(
      filtrousuarios,
      operacion,
      { upsert: true, returnOriginal: true },
      callback
    );
};

const eliminarUsuario = async (id, callback) => {
  const filtrousuarios = {
    _id: new ObjectId(id),
  };
  const baseDeDatos = getDB();
  await baseDeDatos.collection("usuarios").deleteOne(filtrousuarios, callback);
};
export {
  queryAllUsuarios,
  crearUsuario,
  editarUsuario,
  eliminarUsuario,
  consultarUsuario,
  consultarOcrearUsuario,
};
