import CategoryHilos from "../../models/materialHiloCategory.js";
import Hilos from "../../models/materialHilo.js";
import UnitMedida from "../../models/unit.js";
import Colors from "../../models/colors.js";
import Proveedores from "../../models/proveedor.js";

const indices = [
    {
      activeMateriales: 1,
      indice1: "Materiales",
      indice2: "Material",
      indice3: "Hilo",
    },
  ];

export const HiloTable = async (req, res) => {
  const hilos = await Hilos.find().populate('color').populate('category').populate('unit').lean();
  res.render("material/hilo/hiloTable", {
      username: res.locals.user.username,
      activeMateriales: indices[0].activeMateriales,
      indice1: indices[0].indice1,
      indice2: indices[0].indice2,
      indice3: indices[0].indice3,
      hilos
    });
}

export const HiloAdd = async (req, res) => {

  const categories = await CategoryHilos.find().lean();
  const units = await UnitMedida.find().lean();
  const colors = await Colors .find().lean();

  res.render("material/hilo/hiloForm", {
      username: res.locals.user.username,
      activeMateriales: indices[0].activeMateriales,
      indice1: indices[0].indice1,
      indice2: indices[0].indice2,
      indice3: indices[0].indice3,
      categories,
      units,
      colors
    });
}

export const HiloAddPost = async (req, res) => {
  const { sku, name, description, color, marca, category, grosor, unit, minQuantity, priceRef } = req.body;

  const errors = [];
  if (!sku) {
    errors.push({
      title: "No se registro el hilo",
      description: "Por favor, ingrese un código",	
      time: "Ahora",
    });
  }
  if (!name) {
    errors.push({
      title: "No se registro el hilo",
      description: "Por favor, ingrese el nombre del hilo",
      time: "Ahora",
    });
  }
  if (!category) {
    errors.push({
      title: "No se registro el hilo",
      description: "Por favor, seleccione una categoría",
      time: "Ahora",
    });
  }
  if (!unit) {
    errors.push({
      title: "No se registro el hilo",
      description: "Por favor, seleccione una unidad de medida",
      time: "Ahora",
    });
  }
  if (!color) {
    errors.push({
      title: "No se registro el hilo",
      description: "Por favor, seleccione un color",
      time: "Ahora",
    });
  }
  if (!priceRef) {
    errors.push({
      title: "No se registro el hilo",
      description: "Por favor, ingrese un precio",
      time: "Ahora",
    });
  }
  
  // Comprobar si el código de color es duplicado
  const dcode = await Hilos.findOne({
    sku: sku,
  })

  if (dcode) {
    errors.push({
      title: "No se registro el hilo",
      description: "El código ya existe",
      time: "Ahora",
    });
  }

  if (errors.length > 0) {
    res.render("material/hilo/hiloForm", {
      errors,
      username: res.locals.user.username,
      activeMateriales: indices[0].activeMateriales,
      indice1: indices[0].indice1,
      indice2: indices[0].indice2,
      indice3: indices[0].indice3,
      sku, name, description, color, marca, category, grosor, unit, minQuantity, priceRef
    });
  }
  else {
    const newHilo = new Hilos({
      sku,
      name,
      description,
      color,
      marca,
      category,
      grosor,
      unit,
      minQuantity,
      priceRef
    });
    await newHilo.save();
    res.redirect("/material/hilo");
  }
}

export const HiloEdit = async (req, res) => {
  const { id } = req.params;
  const hilo = await Hilos.findById(id).lean();

  res.render("material/hilo/hiloEdit", {
      username: res.locals.user.username,
      activeMateriales: indices[0].activeMateriales,
      indice1: indices[0].indice1,
      indice2: indices[0].indice2,
      indice3: indices[0].indice3,
      hilo
    });
}

export const HiloEditPost = async (req, res) => {
  
}

export const HiloDelete = async (req, res) => {
  const { id } = req.params;
  // si id contiene una coma 
  if (id.includes(",")) {
    //separar elementos por coma para convertir en array
    const arrIds = id.split(",");
    //eliminar elementos
    await Hilos.deleteMany({ _id: arrIds });
  } else {
    //eliminar elemento
    await Hilos.findByIdAndDelete(id);
  }
  res.redirect("/material/hilo");
}


export const CategoryHiloTable = async (req, res) => {
  const categoria = await CategoryHilos.find().lean();
 
  res.render("material/hilo/hiloCategoryTable", {
      username: res.locals.user.username,
      activeMateriales: indices[0].activeMateriales,
      indice1: indices[0].indice1,
      indice2: indices[0].indice2,
      indice3: indices[0].indice3,
      categoria
    });
}

export const CategoryHiloAdd = async (req, res) => {

  const proveedor = await Proveedores.find().lean();

  res.render("material/hilo/hiloCategoryForm", {
    username: res.locals.user.username,
    activeMateriales: indices[0].activeMateriales,
    indice1: indices[0].indice1,
    indice2: indices[0].indice2,
    indice3: indices[0].indice3,
    proveedor
  });
}

export const CategoryHiloAddPost = async (req, res) => {

  const { code, name } = req.body;
  const proveedor = JSON.parse(req.body.proveedor)
  const errors = [];
  if (!code) {
    errors.push({
      title: "No se registro la categoría",
      description: "Por favor, ingrese un código",	
      time: "Ahora",
    });
  }
  if (!name) {
    errors.push({
      title: "No se registro la categoría",
      description: "Por favor, ingrese el nombre de la categoría",
      time: "Ahora",
    });
  }
  
  if (!proveedor) {
    errors.push({
      title: "No se registro la categoría",
      description: "Por favor, seleccione un proveedor",
      time: "Ahora",
    });
  }

  // Comprobar si el código de color es duplicado
  const dcode = await CategoryHilos.findOne({ code: code });
  if (dcode) {
    errors.push({
      title: "No se registro la categoría",
      description: "El código de la categoría ya existe",
      time: "Ahora",
    })
  }

  if (errors.length > 0) {
    res.render("material/hilo/hiloCategoryForm", {
      username: res.locals.user.username,
      activeMateriales: indices[0].activeMateriales,
      indice1: indices[0].indice1,
      indice2: indices[0].indice2,
      indice3: indices[0].indice3,
      errors,
      name,
      code,
      proveedor
    });
  } else {
    const newHiloCategory = new CategoryHilos({ code, name, proveedor });
    await newHiloCategory.save();
    res.redirect("/material/hilo/categoria");
  }

  res.render("material/hilo/hiloCategoryForm", {
      username: res.locals.user.username,
      activeMateriales: indices[0].activeMateriales,
      indice1: indices[0].indice1,
      indice2: indices[0].indice2,
      indice3: indices[0].indice3,
    });
}

export const CategoryHiloEdit = async (req, res) => {
  const { id } = req.params;
  const categoria = await CategoryHilos.findById(id).populate("proveedor").lean();
  console.log(categoria);
  
  const proveedor = await Proveedores.find().lean();
  res.render("material/hilo/hiloCategoryEdit", {
    username: res.locals.user.username,
    activeMateriales: indices[0].activeMateriales,
    indice1: indices[0].indice1,
    indice2: indices[0].indice2,
    indice3: indices[0].indice3,
    categoria,
    proveedor
  });
}

export const CategoryHiloEditPost = async (req, res) => {
  const { id } = req.params;
  const { code, name } = req.body;
  const errors = [];
  if (!code) {
    errors.push({
      title: "No se registro la categoría",
      description: "Por favor, ingrese un código",	
      time: "Ahora",
    });
  }
  if (!name) {
    errors.push({
      title: "No se registro la categoría",
      description: "Por favor, ingrese el nombre de la categoría",
      time: "Ahora",
    });
  }
  
  // Comprobar si el código de color es duplicado
  const dcode = await CategoryHilos.findOne({ code: code });

  if (dcode) {
    errors.push({
      title: "No se registro la categoría",
      description: "El código de la categoría ya existe",
      time: "Ahora",
    })
  }

  if (errors.length > 0) {
    res.render("material/hilo/hiloCategoryEdit", {
      username: res.locals.user.username,
      activeMateriales: indices[0].activeMateriales,
      indice1: indices[0].indice1,
      indice2: indices[0].indice2,
      indice3: indices[0].indice3,
      errors,
      name,
      code,
    })
  } else {
    await CategoryHilos.findByIdAndUpdate(id, req.body);
    res.redirect("/material/hilo/categoria");
  }
}

export const CategoryHiloDelete = async (req, res) => {
  const { id } = req.params;
  // si id contiene una coma 
  if (id.includes(",")) {
    //separar elementos por coma para convertir en array
    const arrIds = id.split(",");
    //eliminar elementos
    await CategoryHilos.deleteMany({ _id: arrIds });
  } else {
    //eliminar elemento
    await CategoryHilos.findByIdAndDelete(id);
  }
  res.redirect("/material/hilo/categoria");
}