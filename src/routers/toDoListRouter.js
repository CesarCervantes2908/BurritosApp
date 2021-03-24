const express = require('express');
const toDoListController = require('../controllers/toDoListController');
const toDoListRouter = express.Router();

//---------------------------------------------PARAMS--------------------------------------------------------//
toDoListRouter.param("id",(req, res, next, id)=>{
    req.id = id;
    next();
});
//------------------------------------------POST ROUTES------------------------------------------------------//
toDoListRouter.post("/", async(req, res, next)=>{
    try {
        let data = await toDoListController.createList(req.body.list);
        res.status(200).json({data});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    };
});
//-------------------------------------------GET ROUTES------------------------------------------------------//
toDoListRouter.get("/", async(req, res, next)=>{
    try {
        let data;
        if (req.query.filter === 'active'){
            data = await toDoListController.getActiveList();
            console.log(data);
            if (data === null || data._id) {
                res.status(200).json({ data });
            } else {
                throw new Error(data);
            };
        }else{
            data = await toDoListController.getAllLists();
            console.log(data);
            if(data.length !== undefined){
                res.status(200).json({data})
            }else{
                throw new Error(data);
            };
        };
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});    
    };
});
toDoListRouter.get("/:id", async(req, res, next)=>{
    try {
        let data = await toDoListController.getListByID(req.id);
        console.log(data);
        if(data.date){
            res.status(200).json({data});
        }else{
            throw new Error(data);
        };
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    };
});
//-------------------------------------------PUT ROUTES------------------------------------------------------//
toDoListRouter.put('/:id', async(req, res, next)=>{
    try {
        let data = await toDoListController.updateListByID(req.id, req.body.list);
        if(data.date){
            res.status(200).json({data});
        }else{
            throw new Error(data);
        };
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });  
    };
});
//-----------------------------------------DELETE ROuTES-----------------------------------------------------//
toDoListRouter.delete('/:id', async(req, res, next)=>{
    try {
        let data = await toDoListController.deleteListByID(req.id);
        if(data.ok){
            res.sendStatus(200);
        }else{
            throw new Error("No se pudo borrar la lista");
        };
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});



module.exports = toDoListRouter;