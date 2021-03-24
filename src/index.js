require('dotenv').config();
const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const APIRouter = require('./routers/APIRouter');
//---------------------------------------CONST--------------------------------------------
const app = express();
const PORT = process.env.PORT;
connectDB();

//------------------------------------MIDDLEWARES-----------------------------------------
app.use(express.json());

//--------------------------------------ROUTERS-------------------------------------------
app.use('/api/v1', APIRouter);


//---------------------------------------SETUP--------------------------------------------
if(process.env.NODE_ENV === 'development'){
    console.log("Development Enviroment");
    const morgan = require('morgan');
    app.use(morgan('dev'));
};
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '../client', 'build')));
    app.get('/', (req, res, next)=>{
        res.sendFile(path.join(__dirname, '../client', 'build', 'index.html'));
    });
};

app.listen(PORT, ()=>{
    console.log(`Server Listening on Port: ${PORT}`);
});