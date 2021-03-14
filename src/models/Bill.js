const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Los productos deben tener un nombre"]
    },
    price: {
        type: Number,
        required: [true, "Los productos deben tener un precio"],
    },
    quantity: {
        type: Number,
        required: [true, "Los productos deben contener una cantidad"]
    }
});

const billSchema = new mongoose.Schema({
    date: {
        type: String,
        required: [true, "Debe contener una fecha"]
    },
    products: {
        type: [productSchema],
        required: [true, "Debe contener productos"]
    },
    billName: {
        type: String,
        required: [true, "Debe contener un nombre de Cuenta"]
    },
    billTotal: {
        type: Number,
        required: [true, "Debe contener un total"]
    },
    isClosed: {
        type: Boolean,
        default: false,
    }
});

const Bill = mongoose.model('Bill', billSchema);

module.exports = Bill;