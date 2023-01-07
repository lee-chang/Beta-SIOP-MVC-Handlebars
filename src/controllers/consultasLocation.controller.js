import ubigeoPeru from "ubigeo-peru";

const dReniec = Object.values(ubigeoPeru.reniec);

// const dInei = Object.values(ubigeoPeru.inei);



export function departamento() {
  let departmentsFiltrado = dReniec.filter((d) => d.provincia == "00" && d.distrito == "00");
  const departamentos = []
  if (departmentsFiltrado.length > 0) {
    departmentsFiltrado.forEach((d) => {
      departamentos.push({code: d.departamento , name: d.nombre});
    });
  } else {
    console.log("No hay departamentos");
  }
  return departamentos;
}
export const listDepartments = departamento()

export function buscarDepartamento(departamento) {
  let departmentsFiltrado = dReniec.filter((d) => d.departamento == departamento && d.provincia == "00" && d.distrito == "00");
  const departamentos = []
  if (departmentsFiltrado.length > 0) {
    departmentsFiltrado.forEach((d) => {
      departamentos.push({code: d.departamento , name: d.nombre});
    });
  } else {
    departamentos.push( {code:"" , name:""});
  }
  return departamentos;
}

//array de provincias

export function listaProvincias(department) {
  const provincias = []
  let provinciasFiltrado = dReniec.filter(
    (d) =>
      d.departamento == department &&
      d.provincia !== "00" &&
      d.distrito == "00"
  );
  if (provinciasFiltrado.length > 0) {
    provinciasFiltrado.forEach((d) => {
        provincias.push({code:d.provincia, name:d.nombre});
    });
  } else {
    console.log("No hay provincias");
  }
  return provincias
}

export function buscarProvincia(departamento,provincia) {
  const provincias = []
  let provinciasFiltrado = dReniec.filter(
    (d) =>
      d.departamento == departamento &&
      d.provincia == provincia &&
      d.distrito == "00"
  );
  if (provinciasFiltrado.length > 0) {
    provinciasFiltrado.forEach((d) => {
        provincias.push({code:d.provincia, name:d.nombre});
    });
  } else {
    provincias.push( {code:"" , name:""});
  }
  return provincias
}

// array de distritos

export function listaDistritos(departamento, provincia) {
  const distritos = []
  let distritosFiltrados = dReniec.filter(
    (d) =>
      d.departamento == departamento &&
      d.provincia == provincia &&
      d.distrito !== "00"
  );
  if (distritosFiltrados.length > 0) {
    distritosFiltrados.forEach((d) => {
      distritos.push( {code:d.distrito , name:d.nombre});
    });
  } else {
    console.log("No hay distritos");
  }
  return distritos;
}

export function buscarDistrito(departamento, provincia, distrito) {
  const distritos = []
  let distritosFiltrados = dReniec.filter(
    (d) =>
      d.departamento == departamento &&
      d.provincia == provincia &&
      d.distrito == distrito
  );
  if (distritosFiltrados.length > 0) {
    distritosFiltrados.forEach((d) => {
      distritos.push( {code:d.distrito , name:d.nombre});
    });
  } else {
    distritos.push( {code:"" , name:""});
  }
  return distritos;
}
