const express = require("express");
require("../database/db-Config.js");
const userRouter = require("../router/userRouter/signUpRouter.js");
const productRouter = require("../router/productRouter/productRouter.js");

const app = express();

app.use(express.json());

app.route("/").get((req,resp)=>{
    resp.status(200).json({
        status : "Success",
        welcome : "Ordernow appliaction"
    })
})

app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productRouter);


module.exports = app;