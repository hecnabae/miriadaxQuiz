var inactTime = 2 * 60 * 1000; // 2 min. en ms.

module.exports = function(t) {

  var temporizador = t || inactTime;

  return function(req, res, next) {
    var ahora = new Date().getTime();

    var lastReqTime = req.session.reqTime || ahora;

    if (req.session.user && (ahora - lastReqTime > temporizador)) {
      delete req.session.user; // Destruimos la sesión
    }

    req.session.reqTime = ahora;

    next();
  };
};
