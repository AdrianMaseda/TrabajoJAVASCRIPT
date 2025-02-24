/*  Se añade un listener al cargar la web para que se cree un Swiper en la galería, que tendrá
    efecto slide (deslizamiento) de las imágenes.*/
document.addEventListener("DOMContentLoaded", function() {
    var swiper = new Swiper(".swiper-container", {
        loop: true, // Infinito
        effect: "slide", //Desvanecer en lugar de cambio repentino
        slidesPerView: 1, //Muestra solo una imagen a la vez
        spaceBetween: 0, //Sin espacio entre imágenes
        autoplay: {
            delay: 3000, //Cambia cada 3 segundos
            disableOnInteraction: false, //Sigue operando aunque estemos, por ejemplo, en hover
        },
        on: {
            slideChange: function () {
                actualizarBarra();
            }
        }
    });

    /*  Función para que se muestre un porcentaje de progresión en una barra debajo de las imágenes
        de la galería.*/
    function actualizarBarra()  {
        const barra = document.getElementById("barra-progreso");
        const totalSlides = document.querySelectorAll(".swiper-slide").length;
        const indice = swiper.realIndex + 1;
        const progreso = (indice / totalSlides) * 100;
        barra.style.width = `${progreso}%`;
    }

    actualizarBarraProgreso();

});

