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
    const data = JSON.stringify({
      sku_id: req.body.sku_id,
    });

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${process.env.ATLIER_API_ROUTE}/cart`,
      headers: {
        Authorization: process.env.GITHUB_API_KEY,
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(() => {
        res.setHeader('content-type', 'text/plain');
        res.status(201).send(JSON.stringify('Content created'));
      })
      .catch((err) => {
        res.status(422).send(err);
      });
  },
};
