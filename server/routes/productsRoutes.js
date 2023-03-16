const router = require('express').Router();
const products = require('../controllers/productsController');

router.get('/:product_id/styles', products.getStyles);
router.get('/:product_id/related', products.getRelated);
router.get('/:product_id', products.getOne);
router.get('/', products.getAll);

module.exports = router;
