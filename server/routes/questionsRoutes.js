const router = require('express').Router();
const questions = require('../controllers/questionsController');

router.get('/', questions.get);
// router.post('/', questions.postAnswer);
router.post('/:question_id/answers', questions.postAnswer);
router.put('/:answerOrQuestion_id/helpful', questions.putHelpful);
router.put('/:answerOrQuestion_id/report', questions.putReport);

module.exports = router;
