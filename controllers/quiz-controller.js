var models = require('../models/models.js');
var listaIndices = models.Indices.listaIndices;

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
	if (req.query.termino) {
		// TODO: Implementar
		models.Quiz.findAll({
			where: ["pregunta like ?", "%" + req.query.termino.replace('', '%') + "%"]
		}).then(function (quizes) {
			res.render('quizes/index.ejs', {
				quizes: quizes,
				errors: []
			}).catch(function (error) {
				next(error);
			});
		});
	} else {

		models.Quiz.findAll().then(function (quizes) {
			res.render('quizes/index.ejs', {
				quizes: quizes,
				errors: []
			})
		}).catch(function (error) {
			next(error);
		});
	}
};

exports.show = function (req, res) {
	res.render('quizes/show', {
		quiz: req.quiz,
		errors: []
	});
};

exports.answer = function (req, res) {
	var resultado = 'Incorrecto';
	if (req.query.respuesta === req.quiz.respuesta) {
		resultado = 'Correcto';
	}
	res.render('quizes/answer', {
		quiz: req.quiz,
		respuesta: resultado,
		errors: []
	});
};

exports.authors = function (req, res) {
	res.render('quizes/autores', {
		autores: 'Héctor Navarro',
		imagen: 'https://avatars0.githubusercontent.com/u/3764990?v=3&s=460',
		errors: []
	});
}

exports.new = function (req, res) {
	var quiz = models.Quiz.build( // crea objeto quiz
		{
			pregunta: "Pregunta",
			respuesta: "Respuesta",
			indice: "Otro"
		}
	);
	// Abrimos
	res.render('quizes/new', {
		quiz: quiz,
		errors: [],
		indices: listaIndices
	});
};

exports.create = function (req, res) {
	var quiz = models.Quiz.build(req.body.quiz);

	var errors = quiz.validate();
	if (errors) {
		res.render('quizes/new', {
			quiz: quiz,
			errors: err.errors,
			indices: listaIndices
		});
	} else {
		//Guarda en DB los campos pregunta y respuesta de quiz
		quiz.save({
			fields: ["pregunta", "respuesta", "indice"]
		}).then(function () {
			res.redirect('/quizes')
		})
	}

};

exports.edit = function (req, res) {
	var quiz = req.quiz;
	res.render('quizes/edit', {
		quiz: quiz,
		errors: [],
		indices: listaIndices
	});
};

exports.update = function (req, res) {
	req.quiz.pregunta = req.body.quiz.pregunta;
	req.quiz.respuesta = req.body.quiz.respuesta;
	req.quiz.indice = req.body.quiz.indice;

	req.quiz.validate().then(function (err) {;
		if (err) {
			res.render('quizes/edit', {
				quiz: req.quiz,
				errors: err.errors,
				indices: listaIndices
			});
		} else {
			req.quiz.save({
					fields: ["pregunta", "respuesta", "indice"]
				})
				.then(function () {
					res.redirect('/quizes');
				});
		}
	}).catch(function (error) {
		next(error);
	});
};

exports.destroy = function (req, res) {
	req.quiz.destroy().then(function () {
		res.redirect('/quizes');
	}).catch(function (error) {
		next(error)
	});
}
