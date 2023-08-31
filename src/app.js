import express from "express";
import session from "express-session";
import {create} from "express-handlebars";
import path from "path";

import passport from "passport";
import bodyParser from "body-parser";

import indexRoutes from "./routes/index.routes";
import inventarioRoutes from "./routes/inventario.routes";
import reportesRoutes from "./routes/reportes.routes";
import usersRoutes from "./routes/users.routes";
import materialRoutes from "./routes/material.routes";
import "./config/database"
import "./config/passport"
//INITIALIZATIONS
const app = express();

//SETTINGS
const port_server = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "views"));
app.set('view options', { layout: 'dash' });
app.engine(
  ".hbs",
  create({
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    defaultLayout: "dash",
    extname: ".hbs",
  }).engine
); 
app.set("view engine", ".hbs");



//MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(express.urlencoded({extended: false}));

app.use(session({
  secret: "el-secreto-de-mel",
  resave: true,
  saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());



//ROUTES
app.use(indexRoutes, usersRoutes ,inventarioRoutes, reportesRoutes, materialRoutes);

//GLOBAL VARIABLES
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

//STATIC FILES

app.use( express.static(path.join(__dirname, "/public")));


//SERVER IS LISTENING

app.listen(port_server, () => {
  console.log("Server is running on port " + port_server, "http://localhost:" + port_server);
});
