const productModel = require("../../database/model/productModel.js");

const productAuthentication = async (req, resp, next) => {
  const productQuery = req.query;
  try {
    const product = await productModel.find(productQuery);
    if (product.length > 0) {
        next();
    } else if (product.length === 0) {
      resp.status(200).send({ status: false, message: "Not Found", product });
    }
  } catch (error) {
    resp.status(500).send({ status: true, Error: error.message });
  }
};

module.exports = productAuthentication;
