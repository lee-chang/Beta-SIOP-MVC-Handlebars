export const Listado = (req, res) => {
  res.render("inventario/listado", {
    activeInventario: 1,
    indice1: "Inventario",
    indice2: "Inventario",
    indice3: "Listado",
  });
};

export const NotaIngreso = (req, res) => {
  res.render("inventario/nota-ingreso", {
    activeInventario: 1,
    indice1: "Inventario",
    indice2: "Inventario",
    indice3: "Nota de Ingreso",
  });
};

export const NotaSalida = (req, res) => {
  res.render("inventario/nota-salida", {
    activeInventario: 1,
    indice1: "Inventario",
    indice2: "Inventario",
    indice3: "Nota de Salida",
  });
};

