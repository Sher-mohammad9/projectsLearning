const mongoose = require("mongoose");

const singUpSchema = new mongoose.Schema({
    userName : {
        type : String,
        required : true
    },

    mobile : {
        type : Number,
        required : true,
        validate: {
            validator: function (mobile) {
              return /^[6-9]\d{9}$/.test(mobile);
            },
            message: 'Invalid mobile number',
          }
    },

    email : {
        type : String,
        required : true,
        validate: {
            validator: function (email) {
              return /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/.test(email);
            },
            message: 'Invalid email address',
          }
    },

    password : {
        type : String,
        required : true,
        validate : {
            validator : function(password){
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);            }
        },
        message : 'Invalid password'
    }
})

module.exports = mongoose.model("user", singUpSchema, "users");