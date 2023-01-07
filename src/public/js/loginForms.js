// import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
// import { auth } from "./firebase.js";

// import './firebase.js'

// let signInForm = document.querySelector("#signIn-form");
// let signUpForm = document.querySelector("#signUp-form");

// export const signIn = signInForm.addEventListener("submit", async (e) => {
//   e.preventDefault();

//   const email = signInForm["login-email"].value;
//   const password = signInForm["login-password"].value;

//   try {
//     const credentials = await signInWithEmailAndPassword(auth, email, password);
//     console.log(credentials);
//     // reset the form
//     // signInForm.reset();

//     // show welcome message
//     showMessageSuccess(
//       "Ingreso correctamente",
//       "Ahora",
//       "Bienvenido " + credentials.user.email
//     );
//   } catch (error) {
//     console.log(error.code);
//     if (error.code === "auth/wrong-password") {
//       showMessageError(
//         "No se pudo ingresar.",
//         "Ahora",
//         "Contraseña incorrecta"
//       );
//     } else if (error.code === "auth/user-not-found") {
//       showMessageError(
//         "No se pudo ingresar.",
//         "Ahora",
//         "Usuario no encontrado"
//       );
//     } else if (error.code) {
//       showMessageError("No se pudo ingresar.", "Ahora", "Ups! error al ingresar :(");
//     }
//   }
// });

// export const signUp = signUpForm.addEventListener("submit", async (e) => {
//   e.preventDefault();
//   const email = signUpForm["signup-email"].value;
//   const password = signUpForm["signup-password"].value;

//   try {
//     const userCredentials = await createUserWithEmailAndPassword(
//       auth,
//       email,
//       password
//     );
//     console.log(userCredentials);
//     console.log(userCredentials.user.email);
//     // reset the form
//     // signUpForm.reset();

//     // show welcome message
//     showMessageSuccess(
//       "Registro completado",
//       "Ahora",
//       "Bienvenido " + userCredentials.user.email
//     );
//   } catch (error) {
//     console.log(error.code);
//     if (error.code === "auth/email-already-in-use") {
//       showMessageError(
//         "No se completo el registro.",
//         "Ahora",
//         "Email ya registrado"
//       );
//     } else if (error.code === "auth/invalid-email") {
//       showMessageError(
//         "No se completo el registro.",
//         "Ahora",
//         "Email invalido"
//       );
//     } else if (error.code === "auth/weak-password") {
//       showMessageError(
//         "No se completo el registro.",
//         "Ahora",
//         "Contraseña débil"
//       );
//     } else if (error.code) {
//       showMessageError(
//         "No se completo el registro.",
//         "Ahora",
//         "Ups! Error al registrarse :("
//       );
//     }
//   }
// });

//Show and hide the form
const signUpContent = document.querySelector("#signUp");
const signInContent = document.querySelector("#signIn");
document.querySelector("#switchForm1").addEventListener("click", toggleForm);
document.querySelector("#switchForm2").addEventListener("click", toggleForm);

function toggleForm() {
  signInContent.classList.toggle("hidden");
  signInContent.classList.toggle("visible");
  signUpContent.classList.toggle("hidden");
  signUpContent.classList.toggle("visible");
}