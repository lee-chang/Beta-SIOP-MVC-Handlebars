import passport from "passport";
import bcrypt from "bcryptjs";
import { Strategy as LocalStrategy } from "passport-local";

import User from "../models/user.js";

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      const user =  await User.findOne({ email: email });
      if (!user) {
        return done(null, false, { 
            title: "No se inicio sesión",
            description: "Usuario no encontrado",
            time: "Ahora",
            error: true,
 });
      } else {
        const isMatch = await bcrypt.compare(password, user.password)
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { 
            title: "No se inicio sesión",
            description: "Contraseña incorrecta",
            time: "Ahora",
            error: true,
           });
        }
      }
    }
  )
);

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user)
    })
})
