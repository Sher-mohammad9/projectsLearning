const mongoose = require("../mongodbConnection.js");

const studentSchema = new mongoose.Schema({
    studentName : {
        type : String,
        required : true
    },
    
    mobile : {
        type : Number,
        required : true,
        unique : true
    },

    aadhar : {
        type : Number,
        required : true,
        unique : true
    },

    class : {
        type : Number,
        required : true
    },

    address : {
        type : String,
        enum : ["merta", "jaipur"]
    }
})

const studentModel = new mongoose.model("student", studentSchema);




module.exports = studentModel;