const router = require('express').Router();
const questions = require('../controllers/questionsController');

router.get('/:product_id', questions.get);
router.post('/', questions.postAnswer);
router.post('/:question_id/answers', questions.postQuestion);
router.put('/:question_id/helpful', questions.putHelpful);
router.put('/:question_id/report', questions.putReport);

module.exports = router;
