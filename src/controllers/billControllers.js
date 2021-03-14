const Bill = require("../models/Bill")

//---------------------------------CREATE CONTROLLERS------------------------------------------
exports.createBill = async(body)=>{
    let newBill = new Bill(body);
    try {
        let newBillSaved = await newBill.save();
        if(newBill === newBillSaved){
            console.log(newBillSaved);
            return newBillSaved._id;
        }
    } catch (error) {
        return error;
    }
};
//----------------------------------READ CONTROLLERS-------------------------------------------
exports.getAllBillsByDate = async(date)=>{
    try {
        let allBills = await Bill.find({date});
        return allBills;
    } catch (error) {
        return error;
    }
};
//---------------------------------UPDATE CONTROLLERS------------------------------------------
//---------------------------------DELETE CONTROLLERS------------------------------------------