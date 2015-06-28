var inactTime = 2 * 60 * 1000; // tiempo por defecto en ms

module.exports = function(t) {

	//temporizador
  var temporizador = t || inactTime;

  return function(req, res, next) {
    var ahora = new Date().getTime();

    // Obtenemos la ultima hora
    var lastReqTime = req.session.reqTime || ahora;

    if (req.session.user && (ahora - lastReqTime > temporizador)) {
      delete req.session.user; // Destruimos la sesión
      console.log("Inactividad");
    }

    // Actualizamos hora
    req.session.reqTime = ahora;

    // siguiente petición
    next();
  };
};
