const ToDoList = require('../models/ToDoList');

//---------------------------------CREATE CONTROLLERS------------------------------------------
exports.createList = async(newList)=>{
    try {
        let list = await ToDoList.create(newList);
        console.log(list);
        return list;
    } catch (error) {
        return error.message;
    }
};
//----------------------------------READ CONTROLLERS-------------------------------------------
exports.getAllLists = async()=>{
    try {
        let lists = await ToDoList.find({});
        return lists;
    } catch (error) {
        return error.message;        
    }
};
exports.getListByID = async(id)=>{
    try {
        let list = await ToDoList.findOne({_id: id});
        return list; 
    } catch (error) {
        return error.message;
    };
};
exports.getActiveList = async () => {
    try {
        let list = await ToDoList.findOne({ finishedList: false });
        return list;
    } catch (error) {
        return error.message;
    };
};
//---------------------------------UPDATE CONTROLLERS------------------------------------------
exports.updateListByID = async(id ,newList)=>{
    try {
        let query = await ToDoList.updateOne({_id: id}, {$set: newList});
        if(query.n < 1) throw new Error("La cuenta que quiere editar NO existe");
        if(query.nModified < 1) throw new Error("Los datos que envió son identicos a los de la BD");
        let updatedList = ToDoList.findById(id);
        return updatedList;
    } catch (error) {
        return error.message;
    };
};
//---------------------------------DELETE CONTROLLERS------------------------------------------
exports.deleteListByID = async(id)=>{
    try {
        let query = await ToDoList.deleteOne({_id: id});
        return {ok: query.deletedCount > 0};
    } catch (error) {
        return error.message;
    };
};