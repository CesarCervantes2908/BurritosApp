const express = require('express');
const billController = require('../controllers/billControllers');
const ventasRouter = express.Router();

ventasRouter.param('date', (req, res, next, date)=>{
    req.date = date;
    next();
});
ventasRouter.param('id', (req, res, next, id) => {
    req.id = id;
    next();
});

ventasRouter.post('/days/:date/cuentas',async(req, res, next)=>{
    try {
        let newBillID = await billController.createBill(req.body);
        res.status(200).send(newBillID);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});
ventasRouter.get('/days/:date/cuentas', async(req, res, next)=>{
    try {
        let bills = await billController.getAllBillsByDate(req.date);
        res.status(200).send(bills);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});
ventasRouter.get('/days/:date/cuentas/:id', async(req, res, next)=>{
    try {
        let bill = await billController.getBillByID(req.id);
        res.status(200).send(bill);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});



module.exports = ventasRouter;