const express = require('express');
const bussinesRouter = require('./bussinessRouter');
const ventasRouter = require('./ventasRouter');
const APIRouter = express.Router();

APIRouter.use('/ventas', ventasRouter);
APIRouter.use('/bussiness', bussinesRouter);


module.exports = APIRouter;