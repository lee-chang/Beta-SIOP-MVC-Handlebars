export const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      res.locals.user = req.user
      return next();
    } else {
      res.redirect ('/users/signin?alertError=1&&titleAlert=No estas autorizado&&descriptionAlert=Por favor inicia sesion&&timeAlert=Ahora');
    }
  };