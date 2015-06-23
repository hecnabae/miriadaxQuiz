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

exports.answer = function (req, res) {
	//	if (req.query.respuesta === 'Roma') {
	//		res.render('quizes/answer', {
	//			respuesta: 'Correcto'
	//		});
	//	} else {
	//		res.render('quizes/answer', {
	//			respuesta: 'Incorrecto'
	//		});
	//	}
	models.Quiz.findAll().success(function (quiz) {
		if (req.query.respuesta === quiz[0].respuesta) {
			res.render('quizes/answer', {
				respuesta: 'Correcto'
			});
		} else {
			res.render('quizes/answer', {
				respuesta: 'Incorrecto'
			});
		}
	})
};

exports.authors = function (req, res) {
	res.render('quizes/autores', {
		autores: 'Héctor Navarro',
		imagen: 'https://avatars0.githubusercontent.com/u/3764990?v=3&s=460'
	});
}
