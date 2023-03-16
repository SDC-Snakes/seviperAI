const router = require('express').Router();
const axios = require('axios');

router.get('/:product_id', (req, res) => {
  // Finding a way to add query params in axios config would be cleaner
  const page = req.query.page || 1;
  const count = req.query.count || 5;
  if (req.params.product_if) {
    axios.get(`${process.env.ATLIER_API_ROUTE}/qa/questions?product_id=${req.params.product_id}&page=${page}&count=${count}`, {
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
  } else {
    axios.get(`${process.env.ATLIER_API_ROUTE}/qa/questions/${req.params.question_id}/answers?page=${page}&count=${count}`, {
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
  }
});

// router.post('/', (req, res) => {
//   axios.post(`${process.env.ATLIER_API_ROUTE}/cart?sku_id=${req.params.sku_id}`, {
//     headers: {
//       Authorization: process.env.GITHUB_API_KEY,
//     },
//   })
//     .then(() => {
//       res.status(201).send('Content created');
//     })
//     .then((err) => {
//       res.status(422).send(err);
//     });
// });

module.exports = router;
