const mongoose = require('mongoose');

const Account = mongoose.model('account');
const { validateShopifyHmac, getShopifyAccessToken } = require('../helpers/auth');

module.exports = (app) => {
  // Returns information about the store
  app.get('/api/store', async (req, res) => {
    try {
      const { storeName } = req.query;
      const account = await Account.findOne({ name: storeName });

      if (account === null) {
        res.send({
          error: 'The account does\'t exist',
        });
      } else {
        // Do not send access token to the client.
        account.accessToken = (account.accessToken) ? true : false;
        res.send(account);
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        error: error.toString(),
      });
    }
  });

  // Create store record
  app.post('/api/store', async (req, res) => {
    try {
      const {
        shop,
        code,
        hmac,
        timestamp,
      } = req.body;

      if (!validateShopifyHmac(hmac, { code, shop, timestamp })) {
        res.send({
          error: 'HMAC validation failed.',
        });
      } else {
        // Get Access Token
        const response = await getShopifyAccessToken(shop, code);
        if (!response.access_token) {
          throw new Error('Fail to get access token from Shopify');
        }
        const newAccount = new Account({
          name: shop.replace('.myshopify.com', ''),
          accessToken: response.access_token,
        });
        newAccount.save()
          .then((record) => res.send(record))
          .catch((err) => {
            throw err;
          });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        error: error.toString(),
      });
    }
  });

  // Update store record
  app.delete('/api/store/:id', (req, res) => {
    try {
      const { id } = req.params;
      Account.deleteOne({ _id: id })
        .then(() => {
          res.send({
            message: 'Account removed successfully.',
          });
        });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        error: error.toString(),
      });
    }
  });
};
