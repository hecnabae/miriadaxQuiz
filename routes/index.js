var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz-controller');

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', {
		title: 'Quiz'
	});
});


router.param('quizId', quizController.load); // autoload :quizId

router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);

router.get('/quizes/:search', quizController.index);

module.exports = router;
