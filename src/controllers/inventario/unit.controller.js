import Unit from "../../models/unit.js";

const indices = [
  {
    activeInventario: 1,
    indice1: "Inventario",
    indice2: "Inventario",
    indice3: "Unidad de Medida",
  },
];

export const UnitTable = async (req, res) => {
  const unit = await Unit.find().lean().sort({ code: "ascending" });
  res.render("inventario/unit/unitTable", {
    username: res.locals.user.username,
    activeInventario: indices[0].activeInventario,
    indice1: indices[0].indice1,
    indice2: indices[0].indice2,
    indice3: indices[0].indice3,
    unit: unit,
  });
};

export const UnitAdd = async (req, res) => {
    const unit = await Unit.find({ validUnitBase: true }).lean().sort({ code: "ascending" });
    res.render("inventario/unit/UnitForm", {
      username: res.locals.user.username,
      activeInventario: indices[0].activeInventario,
      indice1: indices[0].indice1,
      indice2: indices[0].indice2,
      indice3: indices[0].indice3,
      unit: unit,
    });
};

export const UnitAddPost = async (req, res) => {
  const { code, name,unitBase, operator, operationValue } = req.body;
  const errors = [];
  if (!code) {
    errors.push({
      title: "No se registro la Unidad de Medida",
      description: "Por favor, ingrese un código",
      time: "Ahora",
    });
  }
  if (!name) {
    errors.push({
      title: "No se registro la Unidad de Medida",
      description: "Por favor, ingrese un nombre",
      time: "Ahora",
    });
  }

  
  // Comprobar si el código de unidad es duplicado
  const codeUnit = await Unit.findOne({ code: code });
  if (codeUnit) {
    errors.push({
      title: "No se registro la Unidad de Medida",
      description: "El código de unidad ya existe",
      time: "Ahora",
    })
  }


  if (unitBase !== "N/A") {
    if (!operator) {
      errors.push({
        title: "No se registro la Unidad de Medida",
        description: "Por favor, ingrese un operador",
        time: "Ahora",
      })
    }
  
    if (!operationValue) {
      errors.push({
        title: "No se registro la Unidad de Medida",
        description: "Por favor, ingrese un valor de operación",
        time: "Ahora",
      });
    }
  } 

  if (errors.length > 0) {
    const unit = await Unit.find({ validUnitBase: true }).lean().sort({ code: "ascending" });
    res.render("inventario/unit/unitForm", {
      username: res.locals.user.username,
      activeInventario: indices[0].activeInventario,
      indice1: indices[0].indice1,
      indice2: indices[0].indice2,
      indice3: indices[0].indice3,
      errors,
      unit: unit,
      code, name, unitBase, operator, operationValue
    });
  } else if (unitBase === "N/A"){
    const newUnidad = new Unit({ code, name, unitBase, validUnitBase: true , operator:"*", operationValue:1 });
    await newUnidad.save();
    res.redirect("/inventario/unidad-medida");

  } else {
    const newUnidad = new Unit({ code, name, unitBase, validUnitBase: false ,operator, operationValue });
    await newUnidad.save();
    res.redirect("/inventario/unidad-medida");
  }
};


export const UnitEdit = async (req, res) => {
  const units = await Unit.findById(req.params.id).lean();
  const unit = await Unit.find({ validUnitBase: true }).lean().sort({ code: "ascending" });
  res.render("inventario/unit/unitEdit", {
    username: res.locals.user.username,
    activeInventario: indices[0].activeInventario,
    indice1: indices[0].indice1,
    indice2: indices[0].indice2,
    indice3: indices[0].indice3,
    units,
    unit
  })
}

export const UnitEditPost = async (req, res) => {
  const { id } = req.params;
  const { code, name, unitBase, operator, operationValue } = req.body;
  const units = await Unit.findById(id).lean();
  const unit = await Unit.find({ validUnitBase: true }).lean().sort({ code: "ascending" });
  const errors = [];
  if (!code) {
    errors.push({
      title: "No se registro la Unidad de Medida",
      description: "Por favor, ingrese un código",
      time: "Ahora",
    });
  }
  if (!name) {
    errors.push({
      title: "No se registro la Unidad de Medida",
      description: "Por favor, ingrese un nombre",
      time: "Ahora",
    });
  }

  // Comprobar si el código de unidad es duplicado
  const codeUnit = await Unit.find({ code: code });
  const fCodeDup = codeUnit.filter((el) => el._id != id);
  if (fCodeDup.length > 0) {
    errors.push({
      title: "No se registro la Unidad de Medida",
      description: "El código de unidad ya existe",
      time: "Ahora",
    })
  }


  if (unitBase !== "N/A") {
    if (!operator) {
      errors.push({
        title: "No se registro la Unidad de Medida",
        description: "Por favor, ingrese un operador",
        time: "Ahora",
      })
    }
  
    if (!operationValue) {
      errors.push({
        title: "No se registro la Unidad de Medida",
        description: "Por favor, ingrese un valor de operación",
        time: "Ahora",
      });
    }
  }
  if (errors.length > 0) {

    res.render("inventario/unit/unitEdit", {
    username: res.locals.user.username,
    activeInventario: indices[0].activeInventario,
    indice1: indices[0].indice1,
    indice2: indices[0].indice2,
    indice3: indices[0].indice3,
    errors,
    units:units,
    unit:unit
    });
  } else if (unitBase === "N/A"){
    //create object with new values of req.body
    const newUnidad = { code, name, unitBase, validUnitBase: true , operator:"*", operationValue:1 };

    await Unit.findByIdAndUpdate(id, newUnidad);
    res.redirect("/inventario/unidad-medida");

  } else {
    const newUnidad = { code, name, unitBase, validUnitBase: false , operator, operationValue };
    await Unit.findByIdAndUpdate(id, newUnidad);
    res.redirect("/inventario/unidad-medida");
  }
}

export const UnitDelete = async (req, res) => {
  const { id } = req.params;
  // si id contiene una coma 
  if (id.includes(",")) {
    //separar elementos por coma para convertir en array
    const arrIds = id.split(",");
    //eliminar elementos
    await Unit.deleteMany({ _id: arrIds });
  } else {
    //eliminar elemento
    await Unit.findByIdAndDelete(id);
  }
  res.redirect("/inventario/unidad-medida");
};