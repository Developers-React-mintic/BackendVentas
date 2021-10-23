import {
    MongoClient,
    ObjectId
} from 'mongodb';
import dotenv from 'dotenv';

dotenv.config({
    path: './.env'
});

const stringconexion = process.env.DATABASE_URL;
const client = new MongoClient(stringconexion, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let baseDeDatos;


const conectarBD = (callback) => {
    client.connect((err, db) => {

        if (err) {
            console.error('Error connect to database');

        }
        baseDeDatos = db.db('mintic');
        console.log('conexion exitosa');
        return callback;
    });
};


const getDB = () => {
    return baseDeDatos;

};

export {
    conectarBD,
    getDB
};