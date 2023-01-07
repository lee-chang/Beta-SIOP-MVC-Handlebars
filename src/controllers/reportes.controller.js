export const renderExample = (req, res) => {
    res.render("example-forms", {
        layout: "dash",
        activeInventario: 1,
        indice1: "~",
        indice2: "Reportes",
        indice3: "Ejemplo",
    })
}