const express = require('express');
const bussinesRouter = require('./bussinessRouter');
const toDoListRouter = require('./toDoListRouter');
const ventasRouter = require('./ventasRouter');
const APIRouter = express.Router();

APIRouter.use('/ventas', ventasRouter);
APIRouter.use('/bussiness', bussinesRouter);
APIRouter.use('/pendientes', toDoListRouter);

module.exports = APIRouter;