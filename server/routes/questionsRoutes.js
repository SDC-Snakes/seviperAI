const router = require('express').Router();
const axios = require('axios');
const questions = require('../controllers/questionsController');

router.get('/:product_id', questions.get);

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
