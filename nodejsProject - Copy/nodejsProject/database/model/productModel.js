const mongoose = require("mongoose");

const productModel = new mongoose.Schema({
    companyName : {
        type : String,
        require : true
    },

    productName : {
        type : String,
        required : true
    },

    productPrice : {
        type : Number,
        require : true
    },

    category : {
        type : String,
        required : true
    },

    userId : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model("product", productModel);