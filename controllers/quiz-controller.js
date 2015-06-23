var models = require('../models/models.js');

exports.question = function (req, res) {
	//	res.render('quizes/question', {
	//		pregunta: 'Capital de Italia'
	//	});
	models.Quiz.findAll().success(function (quiz) {
		res.render('quizes/question', {
			pregunta: quiz[0].pregunta
		})
	})
};

exports.load = function (req, res, next, quizId) {
	models.Quiz.find(quizId).then(function (quiz) {
		if (quiz) {
			req.quiz = quiz;
			next();
		} else {
			next(new Error('No existe quizid=' + quizId));
		}
	}).catch(function (error) {
		next(error);
	});
};

exports.index = function (req, res) {

	if (req.search) {
		// TODO: Implementar
		models.Quiz.findAll({
			where: ["pregunta like ?", "%" + req.busqueda.replace('', '%') + "%"]
		}).then(function (quizes) {
			res.render('quizes/index.ejs', {
				quizes: quizes
			}).catch(function (error) {
				next(error);
			});
		});
	} else {

		models.Quiz.findAll().then(function (quizes) {
			res.render('quizes/index.ejs', {
				quizes: quizes
			}).catch(function (error) {
				next(error);
			});
		})
	}
};

exports.show = function (req, res) {
	res.render('quizes/show', {
		quiz: req.quiz
	});
};

exports.answer = function (req, res) {
	var resultado = 'Incorrecto';
	if (req.query.respuesta === req.quiz.respuesta) {
		resultado = 'Correcto';
	}
	res.render('quizes/answer', {
		quiz: req.quiz,
		respuesta: resultado
	});
};

exports.authors = function (req, res) {
	res.render('quizes/autores', {
		autores: 'Héctor Navarro',
		imagen: 'https://avatars0.githubusercontent.com/u/3764990?v=3&s=460'
	});
}
