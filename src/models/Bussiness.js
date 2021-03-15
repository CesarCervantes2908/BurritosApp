const mongoose = require('mongoose');
const sellingDaySchema = new mongoose.Schema({
    date: {
        type: String,
        required: [true, "Los días deben tener una fecha"]
    },
    totalSold: {
        type: Number,
        required: [true, "Debe haber una suma total vendida"]
    }
});
const bussinessSchema = new mongoose.Schema({
    totalAmount: {
        type: Number,
        required: [true, "Debe haber una suma total"]
    },
    sellingDays: {
        type: [sellingDaySchema],
        required: [true, "Debe haber días de venta"]
    }
});

const Bussiness = mongoose.model('Bussiness', bussinessSchema);
module.exports = Bussiness;