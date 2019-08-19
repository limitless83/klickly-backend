const mongoose = require('mongoose');

require('../database');

const Account = mongoose.model('account');
const Product = mongoose.model('product');
const { getProducts } = require('../helpers/shopifyApi');

const migrate = async (storeName) => {
  const account = await Account.findOne({ name: storeName });
  const list = await getProducts(storeName, account.accessToken);
  list.forEach((product) => {
    const newProduct = new Product({
      ...product,
    });
    newProduct.save()
      .catch((err) => {
        throw err;
      });
  });
};

const storeName = process.argv[2] || null;
if (storeName !== null) {
  migrate(storeName);
}
