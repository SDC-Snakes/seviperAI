const router = require('express').Router();
const questions = require('../controllers/questionsController');

router.get('/questions', questions.get);
router.post('/questions', questions.postQuestion);
router.post('/questions/:question_id/answers', questions.postAnswer);
router.put('/questions/:question_id/helpful', questions.putQuestionHelpful);
router.put('/answers/:answer_id/helpful', questions.putAnswerHelpful);
router.put('/answers/:answer_id/report', questions.putAnswerReport);

// need to set up routes for PUT request

module.exports = router;
