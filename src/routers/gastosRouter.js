const express = require('express');
const gastosController = require('../controllers/gastosController');
const gastosRouter = express.Router();

//---------------------------------------------PARAMS--------------------------------------------------------//
gastosRouter.param("id", (req, res, next, id) => {
    req.id = id;
    next();
});
//------------------------------------------POST ROUTES------------------------------------------------------//
gastosRouter.post("/", async (req, res, next) => {
    try {
        let data = await gastosController.createList(req.body.list);
        res.status(200).json({ data });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    };
});
//-------------------------------------------GET ROUTES------------------------------------------------------//
gastosRouter.get("/", async (req, res, next) => {
    try {
        let data;
        if(req.query.filter === 'active'){
            data = await gastosController.getActiveList();
            console.log(data);
            if(data === null || data._id){
                res.status(200).json({ data });
            }else{
                throw new Error(data);
            };
        }else{
            data = await gastosController.getAllLists();
            console.log(data);
            if (data.length !== undefined) {
                res.status(200).json({ data })
            } else {
                throw new Error(data);
            };
        };
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    };
});
gastosRouter.get("/:id", async (req, res, next) => {
    try {
        let data = await gastosController.getListByID(req.id);
        console.log(data);
        if (data.date) {
            res.status(200).json({ data });
        } else {
            throw new Error(data);
        };
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    };
});
//-------------------------------------------PUT ROUTES------------------------------------------------------//
gastosRouter.put('/:id', async (req, res, next) => {
    try {
        let data = await gastosController.updateListByID(req.id, req.body.list);
        if (data.date) {
            res.status(200).json({ data });
        } else {
            throw new Error(data);
        };
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    };
});
//-----------------------------------------DELETE ROuTES-----------------------------------------------------//
gastosRouter.delete('/:id', async (req, res, next) => {
    try {
        let data = await gastosController.deleteListByID(req.id);
        if (data.ok) {
            res.sendStatus(200);
        } else {
            throw new Error("No se pudo borrar la lista");
        };
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});



module.exports = gastosRouter;