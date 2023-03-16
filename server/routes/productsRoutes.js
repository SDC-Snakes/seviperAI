const router = require('express').Router();
const axios = require('axios');

router.get('/:product_id/styles', (req, res) => {
  // Finding a way to add query params in axios config would be cleaner
  axios.get(`${process.env.ATLIER_API_ROUTE}/products/${req.params.product_id}/styles`, {
    headers: {
      Authorization: process.env.GITHUB_API_KEY,
    },
  })
    .then((response) => {
      res.status(200).send(response.data);
    })
    .then((err) => {
      res.status(404).send(err);
    });
});

router.get('/:product_id/related', (req, res) => {
  // Finding a way to add query params in axios config would be cleaner
  axios.get(`${process.env.ATLIER_API_ROUTE}/products/${req.params.product_id}/related`, {
    headers: {
      Authorization: process.env.GITHUB_API_KEY,
    },
  })
    .then((response) => {
      res.status(200).send(response.data);
    })
    .then((err) => {
      res.status(404).send(err);
    });
});

router.get('/:product_id', (req, res) => {
  // Finding a way to add query params in axios config would be cleaner
  axios.get(`${process.env.ATLIER_API_ROUTE}/products/${req.params.product_id}`, {
    headers: {
      Authorization: process.env.GITHUB_API_KEY,
    },
  })
    .then((response) => {
      res.status(200).send(response.data);
    })
    .then((err) => {
      res.status(404).send(err);
    });
});

router.get('/', (req, res) => {
  // Finding a way to add query params in axios config would be cleaner
  axios.get(`${process.env.ATLIER_API_ROUTE}/products?page=${req.query.page}&count=${req.query.count}`, {
    headers: {
      Authorization: process.env.GITHUB_API_KEY,
    },
  })
    .then((response) => {
      res.status(200).send(response.data);
    })
    .then((err) => {
      res.status(404).send(err);
    });
});

module.exports = router;
