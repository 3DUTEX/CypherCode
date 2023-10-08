exports.middlewareGlobal = (req, res, next) => {

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
