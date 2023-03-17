const router = require('express').Router();
const reviews = require('../controllers/reviewsController');

router.get('/', reviews.get);
router.post('/', reviews.post);
router.get('/meta', reviews.getMeta);
router.put('/:review_id/helpful', reviews.putHelpful);
router.put('/:review_id/report', reviews.putReport);

module.exports = router;
