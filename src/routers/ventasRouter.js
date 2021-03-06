const express = require('express');
const billController = require('../controllers/billControllers');
const ventasRouter = express.Router();

//---------------------------------------------PARAMS--------------------------------------------------------//
ventasRouter.param('date', (req, res, next, date)=>{
    req.date = date;
    next();
});
ventasRouter.param('id', (req, res, next, id) => {
    req.id = id;
    next();
});
//------------------------------------------POST ROUTES------------------------------------------------------//
ventasRouter.post('/days/:date/cuentas',async(req, res, next)=>{
    try {
        let newBillID = await billController.createBill(req.body);
        res.status(200).send(newBillID);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});
//-------------------------------------------GET ROUTES------------------------------------------------------//
ventasRouter.get('/days/:date/cuentas', async(req, res, next)=>{
    try {
        let bills = await billController.getAllBillsByDate(req.date);
        res.status(200).json({data: bills});
    } catch (error) {
        console.log(error);
        res.status(500).json({error});
    }
});
ventasRouter.get('/days/:date/cuentas/:id', async(req, res, next)=>{
    try {
        let bill = await billController.getBillByID(req.id);
        res.status(200).json({data: bill}); 
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
});
//-------------------------------------------PUT ROUTES------------------------------------------------------//
ventasRouter.put('/days/:date/cuentas/:id/edit/products', async(req, res, next)=>{
    try {
        let updatedBill = await billController.updateBillByID(req.id, req.body);
        console.log(updatedBill);
        res.status(200).json({data: updatedBill});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
});
ventasRouter.put('/days/:date/cuentas/:id/edit/close', async(req, res, next)=>{
    try {
        let updatedBill = await billController.closeBillByID(req.id);
        res.status(200).send(updatedBill);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});
//-----------------------------------------DELETE ROUTES-----------------------------------------------------//


module.exports = ventasRouter;