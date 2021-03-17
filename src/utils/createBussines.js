require('dotenv').config();
const connectDB = require('../config/db');
const Bussiness = require('../models/Bussiness');

connectDB();
const createBussiness = async()=>{
    try {
        await Bussiness.create({
            sellingDays: [{date: '0-0-0'}]
        });
        console.log("Negocio Creado con éxito");
        process.exit();
    } catch (error) {
        console.log(error);
        process.exit(1);
    };
};

createBussiness();