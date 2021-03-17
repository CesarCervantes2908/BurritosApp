const { response } = require('express');
const express = require('express');
const bussinessController = require('../controllers/bussinessController');
const bussinessRouter = express.Router();


//---------------------------------------------PARAMS--------------------------------------------------------//
bussinessRouter.param('date', (req, res, next, date)=>{
    req.date = date;
    next();
});
//------------------------------------------POST ROUTES------------------------------------------------------//
bussinessRouter.post('/days/:date', async(req, res, next)=>{
    try {
        let queryResponse = await bussinessController.createDay(req.date);
        if (queryResponse.nModified > 0){
            let sellingDays = await bussinessController.getAllDays();
            res.status(200).send(sellingDays)
        }else{
            throw new Error(bussiness);
        };
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message);
    };
});
//-------------------------------------------GET ROUTES------------------------------------------------------//
bussinessRouter.get('/', async(req, res, next)=>{
    try {
        let bussiness = await bussinessController.getBussiness();
        res.status(200).send(bussiness);
    } catch (error) {
        res.status(500).send(error);
    }
});
bussinessRouter.get('/days', async(req, res, next)=>{
    try {
        let sellingDays = await bussinessController.getAllDays();
        res.status(200).send(sellingDays);
    } catch (error) {
        res.status(500).send(error);
    };
});
bussinessRouter.get('/days/:date', async(req, res, next)=>{
    try {
        let sellingDay = await bussinessController.getDayByDate(req.date);
        res.status(200).send(sellingDay);
    } catch (error) {
        res.status(500).send(error);
    }
});
//-------------------------------------------PUT ROUTES------------------------------------------------------//
bussinessRouter.put('/days/:date', async(req, res, next)=>{
    try {
        let queryResponse = await bussinessController.updateDayTotalByDate(req.date, req.body.newTotal);
        if(queryResponse.nModified > 0){
            let updatedDay = await bussinessController.getDayByDate(req.date);
            res.status(200).send(updatedDay);
        }else{
            res.status(500).send("El día no existe en la BD");
        };
    } catch (error) {
        res.status(500).send(error);
    }
});
bussinessRouter.put('/days/:date/close', async(req, res, next)=>{
    try {
        let queryResponse = await bussinessController.closeDayByDate(req.date);
        if(queryResponse.nModified > 0){
            let updatedDay = await bussinessController.getDayByDate(req.date);
            res.status(200).send(updatedDay);
        }else{
            res.status(500).send("El día no existe en la BD");
        };
    } catch (error) {
        res.status(500).send(error);
    }
});
bussinessRouter.put('/total', async(req, res, next)=>{
    try {
        let updateBussines = await bussinessController.updateBussinessTotal(req.body.newTotal);
        res.send(updateBussines);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});
//-----------------------------------------DELETE ROUTES-----------------------------------------------------//
bussinessRouter.delete('/days/:date', async(req, res, next)=>{
    try {
        let remainDays = await bussinessController.deleteDayByDate(req.date);
        res.send(remainDays);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    };
});



module.exports = bussinessRouter;