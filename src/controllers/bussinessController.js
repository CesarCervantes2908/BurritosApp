const Bussiness = require('../models/Bussiness');

//---------------------------------CREATE CONTROLLERS------------------------------------------
exports.createDay = async (newSellingDay) => {
    try {
        let bussiness = Bussiness.find();
        let {sellingDays} = bussiness;
        sellingDays.forEach(({date})=>{
            if(newSellingDay.date === date) throw new Error("El día que intenta crear, ya existe en la BD");
        });
        bussiness.sellingDays = [...sellingDays, newSellingDay];
        return bussiness.save();
    } catch (error) {
        return error;
    };
};
//----------------------------------READ CONTROLLERS-------------------------------------------
// exports.getAllBillsByDate = async (date) => {
//     try {
//         let allBills = await Bill.find({ date });
//         return allBills;
//     } catch (error) {
//         return error;
//     };
// };
// exports.getBillByID = async (id) => {
//     try {
//         let bill = await Bill.findById(id);
//         return bill;
//     } catch (error) {
//         return error;
//     };
// };
// //---------------------------------UPDATE CONTROLLERS------------------------------------------
// exports.updateBillProductsByID = async (id, products) => {
//     try {
//         let updatedBill = await Bill.findByIdAndUpdate(id, { products }, { new: true });
//         return updatedBill;
//     } catch (error) {
//         return error;
//     };
// };
// exports.closeBillByID = async (id) => {
//     try {
//         let updatedBill = await Bill.findByIdAndUpdate(id, { isClosed: true }, { new: true });
//         return updatedBill;
//     } catch (error) {
//         return error;
//     }
// };
// //---------------------------------DELETE CONTROLLERS------------------------------------------
// exports.deleteBillByID = async (id) => {
//     try {
//         let deletedBill = await Bill.findByIdAndDelete(id);
//         return deletedBill;
//     } catch (error) {
//         return error;
//     };
// };
// exports.DeleteAll = async () => {
//     try {
//         let deletedBills = await Bill.deleteMany();
//         return deletedBills;
//     } catch (error) {
//         return error;
//     };
// };
// exports.DeleteByEntry = async (entry) => {
//     try {
//         let deletedBills = await Bill.deleteMany({ entry });
//         return deletedBills;
//     } catch (error) {
//         return error;
//     };
// };