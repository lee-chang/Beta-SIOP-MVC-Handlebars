export const renderIndex = (req, res) => {
  res.render("index", {layout:"main"});
};

export const renderDashboard = (req, res) => {

  
  if (res.locals.alertSuccess) {
    return res.render("escritorio", {
      username: res.locals.user.username,
      activeEscritorio: 1,
      indice1: "~",
      indice2: "Escritorio",
      indice3: "Escritorio",
      alertSuccess: res.locals.alertSuccess,

    })
  }

  res.render("escritorio", {
    username: res.locals.user.username,
    activeEscritorio: 1,
    indice1: "~",
    indice2: "Escritorio",
    indice3: "Escritorio",
  });
};