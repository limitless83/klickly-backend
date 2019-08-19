const mongoose = require('mongoose');

const Product = mongoose.model('product');

module.exports = (app) => {
  app.get('/api/products', async (req, res) => {
    try {
      const { storeName } = req.query;
      const products = await Product.find({ vendor: storeName });
      res.send(products);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        error: error.toString(),
      });
    }
  });
};
