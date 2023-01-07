import { connect } from "mongoose";
import { MONGODB_URI } from "./config.js";

//connect mongoose to mongodb
(async () => {
  try {
    const db = await connect(MONGODB_URI)
    console.log("Base de Datos conectado: ", db.connection.name);
  } catch (error) {
    console.log(error);
  }
})();
