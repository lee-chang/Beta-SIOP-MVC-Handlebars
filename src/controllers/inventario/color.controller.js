import Colors from "../../models/colors.js";

const indices = [
  {
    activeInventario: 1,
    indice1: "Inventario",
    indice2: "Inventario",
    indice3: "Color",
  },
];

export const ColorTable = async (req, res) => {
  const color = await Colors.find().lean();

  res.render("inventario/color/colorTable", {
    username: res.locals.user.username,
    activeInventario: indices[0].activeInventario,
    indice1: indices[0].indice1,
    indice2: indices[0].indice2,
    indice3: indices[0].indice3,
    color: color,
  });
};

export const ColorEdit = async (req, res) => {
  try {
    const color = await Colors.findById(req.params.id).lean();
    res.render("inventario/color/colorEdit", {
      username: res.locals.user.username,
      activeInventario: indices[0].activeInventario,
      indice1: indices[0].indice1,
      indice2: indices[0].indice2,
      indice3: indices[0].indice3,
      color: color,
    });
  } catch (err) {
    console.log(error.message);
  }
};

export const ColorEditPost = async (req, res) => {
    const {id} = req.params;
    const errors = [];
    const { name, codeColor } = req.body;
    const color = await Colors.findById(req.params.id).lean();
    
    //Color name TEST

    
    if (!name) {
      errors.push({
        title: "No se actualizó el color",
        description: "Por favor, ingrese un nombre",
        time: "Ahora",
      });
    }
    if (!codeColor) {
      errors.push({
        title: "No se actualizó el color",
        description: "Por favor, ingrese el código del color",
        time: "Ahora",
      });
    }

    // Comprobar si el código de color es duplicado menos el mismo
    const searchCodeColor = await Colors.find({ codeColor: codeColor })
    const fCodeDup = searchCodeColor.filter((el) => el._id != id);
    if (fCodeDup.length > 0) {
      errors.push({
        title: "No se registro el color",
        description: "El código de color ya existe",
        time: "Ahora",
      })
    }
    
    if (errors.length > 0) {
      res.render("inventario/color/colorEdit", {
        username: res.locals.user.username,
        activeInventario: indices[0].activeInventario,
        indice1: indices[0].indice1,
        indice2: indices[0].indice2,
        indice3: indices[0].indice3,
        errors,
        color:color
      });
    } else {
      await Colors.findByIdAndUpdate(id, req.body)
      res.redirect("/inventario/color")
    }
};

export const ColorDelete = async (req, res) => {
  const { id } = req.params;
  // si id contiene una coma 
  if (id.includes(",")) {
    //separar elementos por coma para convertir en array
    const arrIds = id.split(",");
    //eliminar elementos
    await Colors.deleteMany({ _id: arrIds });
  } else {
    //eliminar elemento
    await Colors.findByIdAndDelete(id);
  }
  res.redirect("/inventario/color");
}

export const ColorAddPost = async (req, res) => {
  const { name, codeColor } = req.body;
  const errors = [];
  if (!name) {
    errors.push({
      title: "No se registro el color",
      description: "Por favor, ingrese un nombre",
      time: "Ahora",
    });
  }
  if (!codeColor) {
    errors.push({
      title: "No se registro el color",
      description: "Por favor, ingrese el código del color",
      time: "Ahora",
    });
  }
  
  // Comprobar si el código de color es duplicado
  const dcodeColor = await Colors.findOne({ codeColor: codeColor });
  if (dcodeColor) {
    errors.push({
      title: "No se registro el color",
      description: "El código de color ya existe",
      time: "Ahora",
    })
  }

  if (errors.length > 0) {
    res.render("inventario/color/colorForm", {
      username: res.locals.user.username,
      activeInventario: indices[0].activeInventario,
      indice1: indices[0].indice1,
      indice2: indices[0].indice2,
      indice3: indices[0].indice3,
      errors,
      name,
      codeColor,
    });
  } else {
    const newColors = new Colors({ name, codeColor });
    await newColors.save();
    res.redirect("/inventario/color");
  }
};

export const ColorAdd = (req, res) => {
  res.render("inventario/color/colorForm", {
    username: res.locals.user.username,
    activeInventario: indices[0].activeInventario,
    indice1: indices[0].indice1,
    indice2: indices[0].indice2,
    indice3: indices[0].indice3,
  });
};
