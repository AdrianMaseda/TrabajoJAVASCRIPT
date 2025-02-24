/*  Al cargar la web, se busca el archivo XML para poder convertir cada 
    elemento en un bloque en el html. Se depositan en el contenedor 
    noticias-container */
    document.addEventListener("DOMContentLoaded", function () {
        fetch("../resources/noticias.xml") // Ruta al XML
            .then(response => response.text()) // Convertimos a texto
            .then(str => {
                let parser = new DOMParser();
                let xml = parser.parseFromString(str, "application/xml");
                let noticias = xml.getElementsByTagName("noticia");
    
                const noticiasContainer = document.getElementById("noticias-container");
    
                /*  Por cada elemento del xml se recogen los atributos y se crea
                    un div noticia con esos valores*/
                for (let i = 0; i < noticias.length; i++) {
                    let titulo = noticias[i].getElementsByTagName("titulo")[0].textContent;
                    let fecha = noticias[i].getElementsByTagName("fecha")[0].textContent;
                    let descripcion = noticias[i].getElementsByTagName("descripcion")[0].textContent;
                    let imagen = noticias[i].getElementsByTagName("imagen")[0].textContent;
    
                    const noticiaElemento = document.createElement("div");
                    noticiaElemento.classList.add("noticia");
    
                    noticiaElemento.innerHTML = `
                        <img src="${imagen}" alt="${titulo}">
                        <h3>${titulo}</h3>
                        <p><strong>Fecha:</strong> ${fecha}</p>
                        <p>${descripcion}</p>
                    `;
    
                    noticiasContainer.appendChild(noticiaElemento);
                }
            })
    });