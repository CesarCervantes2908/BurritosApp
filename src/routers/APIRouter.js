const express = require('express');
const bussinesRouter = require('./bussinessRouter');
const gastosRouter = require('./gastosRouter');
const toDoListRouter = require('./toDoListRouter');
const ventasRouter = require('./ventasRouter');
const APIRouter = express.Router();

APIRouter.use('/ventas', ventasRouter);
APIRouter.use('/bussiness', bussinesRouter);
APIRouter.use('/pendientes', toDoListRouter);
APIRouter.use('/gastos', gastosRouter);

module.exports = APIRouter;