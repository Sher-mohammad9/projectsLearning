const express = require("express");
const productController = require("../../controller/productController/productController.js");
const productAuthentication = require("../../middleware/productAuthentication/productAuthentication.js")
const productRouter = express.Router();

productRouter.route("/").get(productAuthentication, productController.getProduct);
productRouter.route("/add").post(productController.createProduct);
productRouter.route("/update").put(productAuthentication, productController.updateProduct);
productRouter.route("/delete").delete(productAuthentication, productController.deleteProduct);

module.exports = productRouter;