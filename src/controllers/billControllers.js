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
    };
};
exports.getBillByID = async(id)=>{
    try {
        let bill = await Bill.findById(id);
        return bill;
    } catch (error) {
        return error;
    };
};
//---------------------------------UPDATE CONTROLLERS------------------------------------------
exports.updateBillByID = async(id, bill)=>{
    try {
      let updatedBill = await Bill.findByIdAndUpdate(id, bill, {new: true});  
      return updatedBill;
    } catch (error) {
        return error;
    };
};
exports.closeBillByID = async(id)=>{
    try {
        let updatedBill = await Bill.findByIdAndUpdate(id, { isClosed: true }, {new: true});
        return updatedBill;
    } catch (error) {
        return error;
    }
};
//---------------------------------DELETE CONTROLLERS------------------------------------------
exports.deleteBillByID = async(id)=>{
    try {
        let deletedBill =  await Bill.findByIdAndDelete(id);
        return deletedBill;
    } catch (error) {
        return error;
    };
};
exports.DeleteAll = async()=>{
    try {
        let deletedBills = await Bill.deleteMany();
        return deletedBills;
    } catch (error) {
        return error;
    };
};
exports.DeleteByEntry = async(entry)=>{
    try {
        let deletedBills = await Bill.deleteMany({ entry });
        return deletedBills;
    } catch (error) {
        return error;
    };
};