const axios = require('axios');

module.exports = {
  getStyles: (req, res) => {
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
  },
  getRelated: (req, res) => {
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
  },
  getOne: (req, res) => {
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
  },
  getAll: (req, res) => {
    // Finding a way to add query params in axios config would be cleaner
    const page = req.query.page || 1;
    const count = req.query.count || 5;
    axios.get(`${process.env.ATLIER_API_ROUTE}/products?page=${page}&count=${count}`, {
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
  },
};
