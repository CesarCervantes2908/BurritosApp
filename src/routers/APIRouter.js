const express = require('express');
const ventasRouter = require('./ventasRouter');
const APIRouter = express.Router();

APIRouter.use('/ventas', ventasRouter);



module.exports = APIRouter;