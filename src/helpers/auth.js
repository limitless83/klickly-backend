const crypto = require('crypto');
const axios = require('axios');

const validateShopifyHmac = (hmac, { code, shop, timestamp }) => {
  const message = `code=${code}&shop=${shop}&timestamp=${timestamp}`;
  const newHmac = crypto
    .createHmac('sha256', process.env.SHOPIFY_API_SECRET)
    .update(message)
    .digest('hex');

  return (hmac === newHmac);
};

const getShopifyAccessToken = (shop, code) => {
  const url = `https://${shop}/admin/oauth/access_token`;
  return axios.post(
    url,
    {
      client_id: process.env.SHOPIFY_API_KEY,
      client_secret: process.env.SHOPIFY_API_SECRET,
      code,
    },
    {
      headers: {
        'Context-Type': 'application/json',
      },
    },
  )
    .then((res) => res.data);
};

module.exports = {
  validateShopifyHmac,
  getShopifyAccessToken,
};
