const axios = require('axios');

module.exports = {
  get: (req, res) => {
    axios.get(`${process.env.ATLIER_API_ROUTE}/cart?sku_id=${req.params.sku_id}`, {
      headers: {
        Authorization: process.env.GITHUB_API_KEY,
      },
    })
      .then((response) => {
        res.status(200).send(response.data);
      })
      .catch((err) => {
        res.status(404).send(err);
      });
  },
  post: (req, res) => {
    axios.post(`${process.env.ATLIER_API_ROUTE}/cart?sku_id=${req.params.sku_id}`, {
      headers: {
        Authorization: process.env.GITHUB_API_KEY,
      },
    })
      .then(() => {
        res.status(201).send('Content created');
      })
      .catch((err) => {
        res.status(422).send(err);
      });
  },
};
