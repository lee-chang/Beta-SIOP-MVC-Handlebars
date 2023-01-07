import { listDepartments, listaProvincias, listaDistritos } from "./consultasLocation.controller.js";

export const consultaDepartamentos = (req, res) => {
    res.json(listDepartments);
}

export const consultaProvincias = (req, res) => {
    const departamento = req.params.departamento;
    const provincias = listaProvincias(departamento);
    res.json(provincias);
}

export const consultaDistritos = (req, res) => {
    const departamento = req.params.departamento;
    const provincia = req.params.provincia;
    const distritos = listaDistritos(departamento, provincia);
    res.json(distritos);
}