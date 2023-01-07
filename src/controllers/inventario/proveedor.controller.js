import Proveedor from "../../models/proveedor.js";
// import { buscarDepartamento, buscarDistrito, buscarProvincia } from "./consultasLocation.controller.js";

const indices = [
  {
    activeInventario: 1,
    indice1: "Inventario",
    indice2: "Inventario",
    indice3: "Proveedores",
  },
];

export const ProvTable = async (req, res) => {
  const proveedores = await Proveedor.find().lean();
  res.render("inventario/proveedor/provTable", {
    username: res.locals.user.username,
    activeInventario: indices[0].activeInventario,
    indice1: indices[0].indice1,
    indice2: indices[0].indice2,
    indice3: indices[0].indice3,
    proveedores,
  });
};

export const ProvAdd = (req, res) => {
  res.render("inventario/proveedor/provForm", {
    username: res.locals.user.username,
    activeInventario: indices[0].activeInventario,
    indice1: indices[0].indice1,
    indice2: indices[0].indice2,
    indice3: indices[0].indice3,
  });
};

export const ProvAddPost = async (req, res) => {
  const { typeId, nroId, name, about } = req.body;
  const emailArr = JSON.parse(req.body.email);
  const email = emailArr.email
  const numberPhone = JSON.parse(req.body.numberPhone);
  const address = JSON.parse(req.body.address);

  // Validar que no haya campos vacios
  const errors = [];

  if (!typeId) {
    errors.push({
      title: "No se registro el Proveedor",
      description: "Por favor, ingrese el tipo de documento",
      time: "Ahora",
    });
  }
  if (!nroId) {
    errors.push({
      title: "No se registro el Proveedor",
      description: "Por favor, ingrese el número de documento",
      time: "Ahora",
    });
  }
  if (!name) {
    errors.push({
      title: "No se registro el Proveedor",
      description: "Por favor, ingrese un nombre",
      time: "Ahora",
    });
  }
  // Comprobar si el typo de id y el nroId es duplicado
  const IdProveedor = await Proveedor.findOne({ nroId: nroId });
  if (IdProveedor) {
    errors.push({
      title: "No se registro el Proveedor",
      description: "El numero de identificación ya existe",
      time: "Ahora",
    });
  }

  if (errors.length > 0) {
    res.render("inventario/proveedor/provForm", {
      username: res.locals.user.username,
      activeInventario: indices[0].activeInventario,
      indice1: indices[0].indice1,
      indice2: indices[0].indice2,
      indice3: indices[0].indice3,
      errors,
      typeId,
      nroId,
      name,
      email,
      numberPhone,
      about,
    });

  } else {
    const newProveedor = new Proveedor({
      typeId,
      nroId,
      name,
      about,
      email,
      numberPhone,
      address
    });
    await newProveedor.save();

    res.redirect("/inventario/proveedor");
  }
};

export const ProvEdit = async (req, res) => {
  const { id } = req.params;
  const proveedor = await Proveedor.findById(id).lean();
  res.render("inventario/proveedor/provEdit", {
    username: res.locals.user.username,
    activeInventario: indices[0].activeInventario,
    indice1: indices[0].indice1,
    indice2: indices[0].indice2,
    indice3: indices[0].indice3,
    proveedor,
  });
};

export const ProvEditPost = async (req, res) => {
  const { id } = req.params;

  const { typeId, nroId, name, about } = req.body;
  const emailArr = JSON.parse(req.body.email);
  const email = emailArr.email
  const numberPhone = JSON.parse(req.body.numberPhone);
  const address = JSON.parse(req.body.address);

  //data para actualizar
  const dataUpdate = {
    typeId,
    nroId,
    name,
    about,
    email,
    numberPhone,
    address
  };

  const errors = [];

  const proveedor = await Proveedor.findById(id).lean();
  if (!typeId) {
    errors.push({
      title: "No se registro el Proveedor",
      description: "Por favor, ingrese el tipo de documento",
      time: "Ahora",
    });
  }
  if (!nroId) {
    errors.push({
      title: "No se registro el Proveedor",
      description: "Por favor, ingrese el número de documento",
      time: "Ahora",
    });
  }
  if (!name) {
    errors.push({
      title: "No se registro el Proveedor",
      description: "Por favor, ingrese un nombre",
      time: "Ahora",
    });
  }

  // Comprobar si el typo de id y el nroId es duplicado menos el mismo
  const searchIdProveedor = await Proveedor.find({ nroId: nroId });
  const fIdDup = searchIdProveedor.filter((el) => el._id != id);
  if (fIdDup.length > 0) {
    errors.push({
      title: "No se registro el Proveedor",
      description: "El numero de identificación ya existe",
      time: "Ahora",
    });
  }

  if (errors.length > 0) {
    res.render("inventario/proveedor/provEdit", {
      username: res.locals.user.username,
      activeInventario: indices[0].activeInventario,
      indice1: indices[0].indice1,
      indice2: indices[0].indice2,
      indice3: indices[0].indice3,
      errors,
      proveedor: proveedor,
    });
  } else {
    await Proveedor.findByIdAndUpdate(id, dataUpdate);
    res.redirect("/inventario/proveedor");
  }
};

export const ProvDelete = async (req, res) => {
  const { id } = req.params;
  // si id contiene una coma 
  if (id.includes(",")) {
    //separar elementos por coma para convertir en array
    const arrIds = id.split(",");
    //eliminar elementos
    await Proveedor.deleteMany({ _id: arrIds });
  } else {
    //eliminar elemento
    await Proveedor.findByIdAndDelete(id);
  }
  res.redirect("/inventario/proveedor");
};
