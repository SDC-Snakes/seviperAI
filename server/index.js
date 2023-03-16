const express = require('express');
const morgan = require('morgan');
const router = require('./routes');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/products', router.products);
// app.use('/reviews', router.reviews);
app.use('/qa/questions', router.questions);
// app.use('/cart', router.cart);
// app.use('/interactions', router.interactions);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
