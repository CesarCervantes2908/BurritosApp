const GastosList = require('../models/GastosList');

//---------------------------------CREATE CONTROLLERS------------------------------------------
exports.createList = async (newList) => {
    try {
        let list = await GastosList.create(newList);
        console.log(list);
        return list;
    } catch (error) {
        return error.message;
    }
};
//----------------------------------READ CONTROLLERS-------------------------------------------
exports.getAllLists = async () => {
    try {
        let lists = await GastosList.find({});
        return lists;
    } catch (error) {
        return error.message;
    }
};
exports.getListByID = async (id) => {
    try {
        let list = await GastosList.findOne({ _id: id });
        return list;
    } catch (error) {
        return error.message;
    };
};
//---------------------------------UPDATE CONTROLLERS------------------------------------------
exports.updateListByID = async (id, newList) => {
    try {
        console.log(id, newList);
        let query = await GastosList.updateOne({ _id: id }, { $set: newList });
        console.log(query);
        if (query.n < 1) throw new Error("La cuenta que quiere editar NO existe");
        if (query.nModified < 1) throw new Error("Los datos que envió son identicos a los de la BD");
        let updatedList = GastosList.findById(id);
        return updatedList;
    } catch (error) {
        return error.message;
    };
};
//---------------------------------DELETE CONTROLLERS------------------------------------------
exports.deleteListByID = async (id) => {
    try {
        let query = await GastosList.deleteOne({ _id: id });
        return { ok: query.deletedCount > 0 };
    } catch (error) {
        return error.message;
    };
};