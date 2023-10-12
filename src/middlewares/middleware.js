exports.middlewareGlobal = (req, res, next) => {
  res.locals.erros = req.flash("erros");
  res.locals.sucesso = req.flash("sucesso");
  res.locals.usuario = req.session.usuario;
  next();
};

exports.checkCsrfError = (error, req, res, next) => {
  if (error) {
    return res.render("404");
  }

  next();
};

exports.csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
};

exports.loginNecessario = (req, res, next) => {
  if(req.session.usuario){
    next();
    return;
  }

  res.render("404");
}

exports.naoLogado = (req, res, next) => {
  if(req.session.usuario){
    res.render("404");
    return;
  }

  next();
}
