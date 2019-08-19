const axios = require('axios');

const getProducts = (storeName, accessToken) => {
  const url = `https://${storeName}.myshopify.com/admin/api/${process.env.SHOPIFY_API_VERSION}/products.json`;
  return axios.get(
    url,
    {
      headers: {
        'X-Shopify-Access-Token': accessToken,
      },
    },
  )
    .then(({ data: { products } }) => products || []);
};

module.exports = {
  getProducts,
};
