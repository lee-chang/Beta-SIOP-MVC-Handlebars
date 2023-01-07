const obtener_departamentos = async () => {
    try {
        const result = await axios ({
            method: 'get',
            url:`http://localhost:3000/api/consulta-departamentos`,
            responseType: 'json'
        })
        .then ((resp) => {
            const departamentos = resp.data
            const departamentosContainer = document.getElementById('choices-departamento') 

            departamentos.forEach((d) => {
                const option = document.createElement('option')
                option.value = d.code
                option.text = d.name
                departamentosContainer.appendChild(option)

            })
        })


    } catch (error) {
        console.log(error)
    }
}
obtener_departamentos()

let obtener_provincias = async (departamento) => {
    try {
        const provincias = await axios ({
            method: 'get',
            url:`http://localhost:3000/api/consulta-provincias/${departamento}`,
            responseType: 'json'
        })
        .then ((resp) => {
            const provincias = resp.data
            const provinciasContainer = document.getElementById('choices-provincia')
            const distritosContainer = document.getElementById('choices-distrito') 

            provincias.forEach((p) => {
                const option = document.createElement('option')
                option.value = p.code
                option.text = p.name
                provinciasContainer.appendChild(option)
            })
            const option = document.createElement('option')
            option.value = ""
            option.text = "Provincias ..."
            option.selected = true
            option.disabled = true
            option.hidden = true
            provinciasContainer.appendChild(option)
            // distritosContainer.appendChild(option)

            
        })


    } catch(error){
        console.log(error)
    }
}

let obtener_distritos = async (departamento, provincia) => {
    try {
        const distritos = await axios ({
            method: 'get',
            url:`http://localhost:3000/api/consulta-distritos/${departamento}/${provincia}`,
            responseType: 'json'
        })
        .then ((resp) => {
            const distritos = resp.data
            const distritosContainer = document.getElementById('choices-distrito') 

            distritos.forEach((d) => {
                const option = document.createElement('option')
                option.value = d.code
                option.text = d.name
                distritosContainer.appendChild(option)

            })
            const option = document.createElement('option')
            option.value = ""
            option.text = "Distritos ..."
            option.selected = true
            option.disabled = true
            option.hidden = true
            distritosContainer.appendChild(option)
        })


    } catch(error){
        console.log(error)
    }
}