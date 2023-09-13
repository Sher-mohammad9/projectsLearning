const mongoose = require("mongoose");
const config = require("../config.js");
mongoose.connect(config.mongodb+"e-commerce", {useNewUrlParser : true})
.then(()=>{
    console.log("Connect mongoDB")
});