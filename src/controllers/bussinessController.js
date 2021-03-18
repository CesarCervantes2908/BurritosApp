const Bussiness = require('../models/Bussiness');

//---------------------------------CREATE CONTROLLERS------------------------------------------
exports.createDay = async (newDate) => {
    try {
        let { sellingDays } = await Bussiness.findOne({});
        if(sellingDays.some(sellingDay=> sellingDay.date === newDate)) throw new Error("Este día ya existe en la base de datos");
        let updatedBussiness = await Bussiness.updateOne({},
            {
                sellingDays: [...sellingDays, { date: newDate }]
            }, {new: true});
        return updatedBussiness;
    } catch (error) {
        return error.message;
    };
};
//----------------------------------READ CONTROLLERS-------------------------------------------
exports.getBussiness = async()=>{
    try {
        let bussiness = await Bussiness.findOne({});
        return bussiness;
    } catch (error) {
        return error;
    }
};
exports.getAllDays = async () => {
    try {
        let { sellingDays } = await Bussiness.findOne({});
        return sellingDays;
    } catch (error) {
        return error;
    };
};
exports.getDayByDate = async (lookingDate) => {
    try {
        let { sellingDays } = await Bussiness.findOne({});
        let found = sellingDays.find(({ date })=> date === lookingDate) || "No existe ese día en la BD";
        console.log(found);
        return found;
    } catch (error) {
        return error;
    };
};
// //---------------------------------UPDATE CONTROLLERS------------------------------------------
exports.updateDayTotalByDate = async (date, newTotal) => {
    try {
        let updated = await Bussiness.updateOne({"sellingDays.date": date}, {
            $set: {
                "sellingDays.$.totalSold": newTotal
            }
        });
        console.log(updated);
        return updated;
    } catch (error) {
        return error;
    };
};
exports.closeDayByDate = async (date, newTotal) => {
    try {
        let updated = await Bussiness.updateOne({ "sellingDays.date": date }, {
            $set: {
                "sellingDays.$.isClosed": true,
                "sellingDays.$.totalSold": newTotal
            }
        });
        console.log(updated);
        return updated;
    } catch (error) {
        return error;
    };
};
exports.updateBussinessTotal = async(newTotal)=>{
    try {
        let queryResponse = await Bussiness.updateOne({}, {
            $set: {
                "totalAmount" : newTotal
            }
        });
        if (queryResponse.nModified > 0) {
            let bussiness = await Bussiness.findOne({});
            return bussiness;
        } else if(queryResponse.n > 0){
            throw new Error("La cantidad para actualizar y la de la BD es igual");
        }else{
            throw new Error("No se pudo actualizar la cantidad");
        };
    } catch (error) {
        return error.message;
    }
};
// //---------------------------------DELETE CONTROLLERS------------------------------------------
exports.deleteDayByDate = async (date) => {
    try {
        let { sellingDays } = await Bussiness.findOne({});
        if(!sellingDays.some(sellingDay => sellingDay.date === date)) throw new Error("El día que proporcionó NO existe en la BD");
        let newSellingDays = sellingDays.filter(sellingDay => sellingDay.date !== date);
        let queryResponse = await Bussiness.updateOne({},
            {
                sellingDays: newSellingDays
            }, { new: true });
        if (queryResponse.nModified > 0) {
            let bussiness = await Bussiness.findOne({});
            return bussiness.sellingDays;
        } else if (queryResponse.n > 0) {
            throw new Error("La cantidad para actualizar y la de la BD es igual");
        } else {
            throw new Error("No se pudo actualizar la cantidad");
        };
    } catch (error) {
        return error.message;
    };
};
exports.DeleteAllDays = async () => {
    try {
        let updatedBussiness = await Bussiness.updateOne({},{sellingDays: []});
        return updatedBussiness;
    } catch (error) {
        return error;
    };
};