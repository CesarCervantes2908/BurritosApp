require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT;
connectDB();

if(process.env.NODE_ENV === 'development'){
    const morgan = require('morgan');
    app.use(morgan('dev'));
};

app.listen(PORT, ()=>{
    console.log(`Server Listening on Port: ${PORT}`);
});