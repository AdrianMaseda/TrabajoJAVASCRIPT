/*  Al cargar la web, se busca el archivo JSON para poder convertir cada 
    elemento en un bloque en el html. Se depositan en el contenedor 
    noticias-container */
document.addEventListener("DOMContentLoaded", function () {
    fetch("../resources/noticias.json")
        .then(response => response.json())
        .then(noticias => {
            const noticiasContainer = document.getElementById("noticias-container");
            
            noticias.forEach(noticia => {
                const noticiaElemento = document.createElement("div");
                noticiaElemento.classList.add("noticia");
                
                noticiaElemento.innerHTML = `
                    <h3>${noticia.titulo}</h3>
                    <p><strong>Fecha:</strong> ${noticia.fecha}</p>
                    <p>${noticia.descripcion}</p>
                    <img src="${noticia.imagen}" alt="${noticia.titulo}">
                `;
                
                noticiasContainer.appendChild(noticiaElemento);
            });
        })
});