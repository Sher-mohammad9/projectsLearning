const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
    teacherName : {
        type : String,
        required : true
    },
    
    mobile : {
        type : Number,
        required : true,
        unique : true
    },
    address : {
        type : String,
        required : true
    }
})

const teacherModel = new mongoose.model("teacher", teacherSchema);

module.exports = teacherModel;