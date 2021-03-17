const mongoose = require('mongoose');

const sellingDaySchema = new mongoose.Schema({
    date: {
        type: String,
        required: [true, "Los días deben tener una fecha"]
    },
    totalSold: {
        type: Number,
        default: 0
    },
    isClosed: {
        type: Boolean,
        default: false
    }
});

const SellingDay = mongoose.model('SellingDay', sellingDaySchema);
module.exports = SellingDay;