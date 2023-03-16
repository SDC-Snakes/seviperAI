const router = require('express').Router();
const cart = require('../controllers/cartController');

router.get('/', cart.get);
router.post('/', cart.post);

module.exports = router;
