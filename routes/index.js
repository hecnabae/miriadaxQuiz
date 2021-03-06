var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz-controller');
var commentController = require('../controllers/comment-controller');
var sessionController = require('../controllers/session-controller');

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', {
		title: 'Quiz',
		errors: []
	});
});


router.param('quizId', quizController.load); // autoload :quizId
//TODO: PROBAR A AÑADIR PARAMETRO :SEARCH
router.param('commentId', commentController.load); //autoload: commentId

// Definición de rutas de sesion
router.get('/login', sessionController.new); //form login
router.post('/login', sessionController.create); // crear sesion
router.get('/logout', sessionController.destroy); // destruir session


router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/author', quizController.authors);
router.get('/quizes/new', sessionController.loginRequired, quizController.new);
router.post('/quizes/create', sessionController.loginRequired, quizController.create);
router.get('/quizes/:quizId(\\d+)/edit', sessionController.loginRequired, quizController.edit);
router.put('/quizes/:quizId(\\d+)', sessionController.loginRequired, quizController.update);
router.delete('/quizes/:quizId(\\d+)', sessionController.loginRequired, quizController.destroy);

router.get('/quizes/:search', quizController.index);

router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', commentController.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish', sessionController.loginRequired, commentController.publish);

module.exports = router;
