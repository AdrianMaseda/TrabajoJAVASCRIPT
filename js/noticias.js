/*  Al cargar la web, se busca el archivo XML para poder convertir cada 
    elemento en un bloque en el html. Se depositan en el contenedor 
    noticias-container */
    document.addEventListener("DOMContentLoaded", function () {
        var request = new XMLHttpRequest();
        request.open("GET", "resources/noticias.xml", true);
        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status === 200) {
                let xml = request.responseXML;
                procesarNoticias(xml);
            }
        };
        request.send();
    });
    
    /*  Función que apunta a los bloques en el html y convierte cada clave-valor
        en un div noticia con los atributos especificados */
    function procesarNoticias(xml) {
        let noticias = xml.getElementsByTagName("noticia");
        const noticiasContainer = document.getElementById("noticias-container");
    
        for (let i = 0; i < noticias.length; i++) {
            let titulo = noticias[i].getElementsByTagName("titulo")[0].textContent;
            let fecha = noticias[i].getElementsByTagName("fecha")[0].textContent;
            let descripcion = noticias[i].getElementsByTagName("descripcion")[0].textContent;
            let imagen = noticias[i].getElementsByTagName("imagen")[0].textContent;
    
            const noticiaElemento = document.createElement("div");
            noticiaElemento.classList.add("noticia");
    
            noticiaElemento.innerHTML = `
                <img src="resources/${imagen}" alt="${titulo}">
                <h3>${titulo}</h3>
                <p><strong>Fecha:</strong> ${fecha}</p>
                <p>${descripcion}</p>
            `;
    
            noticiasContainer.appendChild(noticiaElemento);
        }
    }