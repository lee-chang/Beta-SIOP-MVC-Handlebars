import Tallas from "../../models/talla.js";

const indices = [
  {
    activeInventario: 1,
    indice1: "Inventario",
    indice2: "Inventario",
    indice3: "Talla",
  },
];

export const TallaTable = async (req, res) => {
  const talla = await Tallas.find().lean().sort({ code: "ascending" });
  res.render("inventario/talla/tallaTable", {
    username: res.locals.user.username,
    activeInventario: indices[0].activeInventario,
    indice1: indices[0].indice1,
    indice2: indices[0].indice2,
    indice3: indices[0].indice3,
    talla: talla,
  });
};

export const TallaAdd = (req, res) => {
  res.render("inventario/talla/tallaForm", {
    username: res.locals.user.username,
    activeInventario: indices[0].activeInventario,
    indice1: indices[0].indice1,
    indice2: indices[0].indice2,
    indice3: indices[0].indice3,
  });
};

export const TallaAddPost = async (req, res) => {
  const { code, description } = req.body;
  const errors = [];
  if (!code) {
    errors.push({
      title: "No se registro el número de la talla",
      description: "Por favor, ingrese una talla",
      time: "Ahora",
    });
  }
  if (!description) {
    errors.push({
      title: "No se registro la descripción de la talla",
      description: "Por favor, ingrese una descripción",
      time: "Ahora",
    });
  }

  // Comprobar si el número de talla es duplicado
  const codeTalla = await Tallas.findOne({ code });
  if (codeTalla) {
    errors.push({
      title: "No se registro la talla",
      description: "El número de talla ya existe",
      time: "Ahora",
    });
  }

  if (errors.length > 0) {
    res.render("inventario/talla/tallaForm", {
      username: res.locals.user.username,
      activeInventario: indices[0].activeInventario,
      indice1: indices[0].indice1,
      indice2: indices[0].indice2,
      indice3: indices[0].indice3,
      errors,
      code,
      description,
    });
  } else {
    const newTallas = new Tallas({ code, description });
    await newTallas.save();
    res.redirect("/inventario/talla");
  }
};

export const TallaDelete = async (req, res) => {
  const { id } = req.params;
  // si id contiene una coma 
  if (id.includes(",")) {
    //separar elementos por coma para convertir en array
    const arrIds = id.split(",");
    //eliminar elementos
    await Tallas.deleteMany({ _id: arrIds });
  } else {
    //eliminar elemento
    await Tallas.findByIdAndDelete(id);
  }
  res.redirect("/inventario/talla");
};

export const TallaEdit = async (req, res) => {
  const talla = await Tallas.findById(req.params.id).lean();
  res.render("inventario/talla/tallaEdit", {
    username: res.locals.user.username,
    activeInventario: indices[0].activeInventario,
    indice1: indices[0].indice1,
    indice2: indices[0].indice2,
    indice3: indices[0].indice3,
    talla,
  });
};

export const TallaEditPost = async (req, res) => {
  const { id } = req.params;
  const errors = [];
  const { code, description } = req.body;
  const talla = await Tallas.findById(id).lean();
  if (!code) {
    errors.push({
      title: "No se actualizó la talla",
      description: "Por favor, ingrese una talla",
      time: "Ahora",
    });
  }
  if (!description) {
    errors.push({
      title: "No se actualizó la talla",
      description: "Por favor, ingrese una descripción",
      time: "Ahora",
    });
  }

  // Comprobar si el número de talla es duplicado
  const coderTalla = await Tallas.find({ code });
  const fTallaDup = coderTalla.filter((el) => el._id != id);
  if (fTallaDup.length > 0) {
    errors.push({
      title: "No se registro la talla",
      description: "El número de talla ya existe",
      time: "Ahora",
    });
  } 

  if (errors.length > 0) {
    res.render("inventario/talla/tallaEdit", {
      username: res.locals.user.username,
      activeInventario: indices[0].activeInventario,
      indice1: indices[0].indice1,
      indice2: indices[0].indice2,
      indice3: indices[0].indice3,
      errors,
      talla,
    });
  } else {
    await Tallas.findByIdAndUpdate(id, req.body);
    res.redirect("/inventario/talla");
  }
};
