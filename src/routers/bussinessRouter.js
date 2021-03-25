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
            if(sellingDays.length !== undefined){
                res.status(200).json({data: sellingDays})
            }else{
                throw new Error(sellingDays);
            };
        }else{
            throw new Error("No se pudo actualizar");
        };
    } catch (error) {
        console.log(error)
        res.status(500).json({error: error.message});
    };
});
//-------------------------------------------GET ROUTES------------------------------------------------------//
bussinessRouter.get('/', async(req, res, next)=>{
    try {
        let bussiness = await bussinessController.getBussiness();
        res.status(200).json({data: bussiness});
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
});
bussinessRouter.get('/days', async(req, res, next)=>{
    try {
        let sellingDays = await bussinessController.getAllDays();
        res.status(200).json({data: sellingDays});
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    };
});
bussinessRouter.get('/days/:date', async(req, res, next)=>{
    try {
        let sellingDay = await bussinessController.getDayByDate(req.date);
        res.status(200).send(sellingDay);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
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
        console.log(error)
        res.status(500).json({ error: error.message });
    }
});
bussinessRouter.put('/days/:date/close', async(req, res, next)=>{
    try {
        let queryResponse = await bussinessController.closeDayByDate(req.date, req.body.dayTotal);
        if(queryResponse.nModified > 0){
            let updatedDay = await bussinessController.getDayByDate(req.date);
            res.status(200).json({data: updatedDay});
        }else{
            res.status(500).json({error: "El día no existe en la BD"});
        };
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
});
bussinessRouter.put('/total', async(req, res, next)=>{
    try {
        let updateBussines = await bussinessController.updateBussinessTotal(req.body.newTotal);
        res.json({data: updateBussines});
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
});
//-----------------------------------------DELETE ROuTES-----------------------------------------------------//
bussinessRouter.delete('/days/:date', async(req, res, next)=>{
    try {
        let remainDays = await bussinessController.deleteDayByDate(req.date);
        res.send(remainDays);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    };
});



module.exports = bussinessRouter;