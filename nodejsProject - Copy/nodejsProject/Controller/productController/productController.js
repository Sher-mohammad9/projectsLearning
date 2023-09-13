const productModel = require("../../database/model/productModel.js");

const getProduct = async (req, resp) => {
  const productDetails = req.body;
  try {
    const product = await productModel.find(productDetails);
    resp.status(201).send({ status: true, message: "Response data", product });
  } catch (error) {
    resp.status(500).send({ status: false, Error: error.message });
  }
};

const createProduct = async (req, resp) => {
  const productDetails = req.body;
  try {
    const product = await productModel.create(productDetails);
    resp.status(200).send({ status: true, message: "Create product", product });
  } catch (error) {
    resp.status(500).send({ status: false, message: error.message });
  }
};

const updateProduct = async (req, resp) => {
  const productDetails = req.body;
  const productQuery = req.query;
  try {
    const product = await productModel.updateMany(productQuery, {$set : productDetails});
    resp
      .status(200)
      .send({ status: true, message: "Product successfully update", product,});
  } catch (error) {
    resp.status(500).send({ status: false, Error: error.message });
  }
};

const deleteProduct = async (req, resp)=>{
   const productQuery = req.query;
   try{
      const product = await productModel.deleteMany(productQuery);
      resp.status(200).send({status : true, message : "Delete product", deleteProduct : product});
   } catch(error){
      resp.status(500).send({status : false, Error : error.message});
   }
}

module.exports = {
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
