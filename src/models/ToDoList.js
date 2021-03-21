const mongoose = require('mongoose');
const toDoSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, "Los pendientes deben contener texto"]
    },
    checked: {
        type: Boolean,
        default: false
    }
});
const toDoListSchema = new mongoose.Schema({
    date: {
        type: String,
        required: [true, "La lista debe contener una fecha"]
    },
    toDos: [
        toDoSchema
    ],
    finishedList: {
        type: Boolean,
        default: false
    }
});

const ToDoList = mongoose.model('ToDoList', toDoListSchema);
module.exports = ToDoList;