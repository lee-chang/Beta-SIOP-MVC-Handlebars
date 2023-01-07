import User from "../models/user.js";
import passport from "passport";


export const renderSignUp = (req, res) => {
  //mainJs public
  res.render("users/login", { layout: "main" });
};

export const renderSignIn = (req, res) => {
  
  if ( res.locals.alertError) {
    return res.render("users/login", {
      layout: "main",
      showSignIn: true,
      errors: res.locals.alertError,
    });
  }
  console.log(res.locals.alertError);
  //mainJs public
  res.render("users/login", { layout: "main", showSignIn: true });

};

export const renderSignUpPost = async (req, res) => {
  const { username, email, password, confirm_password } = req.body;
  console.log(req.body);
  const errors = [];

  if (username.length <= 0) {
    errors.push({
      title: "No se registro el usuario",
      description: "Por favor, ingrese un nombre de usuario",
      time: "Ahora",
    });
  }

  if (email.length <= 0) {
    errors.push({
      title: "No se registro el usuario",
      description: "Por favor, ingrese un correo electrónico",
      time: "Ahora",
    });
  }

  if (password.length <= 0) {
    errors.push({
      title: "No se registro el usuario",
      description: "Por favor, ingrese una contraseña",
      time: "Ahora",
    });
  }

  if (password != confirm_password) {
    errors.push({
      title: "No se registro el usuario",
      description: "Las contraseña no coinciden",
      time: "Ahora",
    });
  }
  
  if (password.length < 4) {
    errors.push({
      title: "No se registro el usuario",
      description: "Las contraseña debe tener al menos 4 caracteres",
      time: "Ahora",
    });
  }

  // Comprobar si el email existe, registro duplicado
  const emailUser = await User.findOne({ email: email });
  if (emailUser) {
    errors.push({
      title: "No se registro el usuario",
      description: "El correo electrónico ya existe, por favor ingrese otro",
      time: "Ahora",
    });
  }

   // Comprobar si el username existe, registro duplicado
   const usernameUser = await User.findOne({ username: username });
   if (usernameUser) {
    errors.push({
      title: "No se registro el usuario",
      description: "El nombre de usuario ya existe, por favor ingrese otro",
      time: "Ahora",
    });
  }

  if (errors.length > 0) {
    res.render("users/login", {
      layout: "main",
      errors,
      username,
      email,
      password,
      confirm_password,
    });
  } else {
    const newUser = new User({ username, email, password });
    newUser.password = await newUser.encryptPassword(password);
    await newUser.save();
    res.render("users/login", {
      layout: "main",
      title: "Registro completado",
      description: "Ya puedes iniciar sesión",
      time: "Ahora",
      success: true,
      showSignIn: true,
    });
  }
};

export const renderSignInPost = passport.authenticate("local", {
  successRedirect: `/escritorio?alertSuccess=1&&titleAlert=Bienvenido&&descriptionAlert=Bienvenido al sistema de gestión de inventario&&timeAlert=Ahora`,
  failureRedirect: "/users/signin?alertError=1&&titleAlert=Inicio de sesión fallido&&descriptionAlert=El correo o la contraseña son incorrectos&&timeAlert=Ahora"
});

export const renderLogout = async (req, res) => {
  await req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
};