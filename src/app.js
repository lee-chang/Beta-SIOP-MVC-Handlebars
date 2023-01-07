import express from "express";
import session from "express-session";
import {create} from "express-handlebars";
import path from "path";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import passport from "passport";
import bodyParser from "body-parser";

import indexRoutes from "./routes/index.routes.js";
import inventarioRoutes from "./routes/inventario.routes.js";
import reportesRoutes from "./routes/reportes.routes.js";
import usersRoutes from "./routes/users.routes.js";
import materialRoutes from "./routes/material.routes.js";
import "./config/database.js"
import "./config/passport.js"
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
  console.log("Server is running on port " + port_server);
});
