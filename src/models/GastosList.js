const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Los productos deben contener nombre"]
    },
    quantity: {
        type: Number,
        required: [true, "Los productos deben contener cantidad"]
    },
    pricePerQuantity: {
        type: Number,
        required: [true, "Los productos deben contener precio por catidad"]
    },
    total: {
        type: Number,
        required: [true, "Los productos deben tener una cantidad total"]
    },
    checked: {
        type: Boolean,
        default: false
    }
});
const gastosListSchema = new mongoose.Schema({
    date: {
        type: String,
        required: [true, "La lista debe contener fecha"]
    },
    products: [productSchema],
    finished: {
        type: Boolean,
        default: false
    },
    gastosTotal: {
        type: Number,
        default: 0
    }
});
const GastosList = mongoose.model('GastosList', gastosListSchema);
module.exports = GastosList;