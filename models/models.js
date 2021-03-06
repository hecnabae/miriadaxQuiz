var path = require('path');

// Postgres DATABASE_URL = postgres://user.passwd@host:port/database
// SQLITE DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name = (url[6]||null);
var user = (url[2]||null);
var pwd = (url[3]||null);
var protocol = (url[1]||null);
var dialect = (url[1]||null);
var port = (url[5]||null);
var host = (url[4]||null);
var storage = process.env.DATABASE_STORAGE;

var Indices = require('./indices.js');
exports.Indices = Indices;

// Cargar Modelo ORM
var sequelize = require('sequelize');

// Usar BBDD SQLite:
var db = new sequelize(DB_name, user, pwd, {
	dialect: protocol,
	protocol: protocol,
	port: port,
	host: host,
	storage: storage,
	omitNull: true
});

// Importar la definición de la tabla Quiz en quiz.js
var quiz_path = path.join(__dirname, 'quiz');
var Quiz = db.import(quiz_path);

// Importar definicion de la tabla Comment
var comment_path = path.join(__dirname, 'comment');
var Comment = db.import(comment_path);

Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);


exports.Quiz = Quiz; // exportar definición de la tabla Quiz
exports.Comment = Comment;

// sequelize.sync() crea e inicializa tabla de preguntas en DB
db.sync().then(function () {
	// success(..) ejecuta el manejador una vez creada la tabla
	Quiz.count().then(function (count) {
		if (count === 0) { // la tabla se inicializa solo si está vacía
			Quiz.create({
				pregunta: 'Capital de Italia',
				respuesta: 'Roma',
				indice: 'Otro'
			});
			Quiz.create({
				pregunta: 'Capital de Portugal',
				respuesta: 'Lisboa',
				indice: 'Otro'
			}).then(function () {
				console.log('Base de datos inicializada')
			});
		};
	});
});
