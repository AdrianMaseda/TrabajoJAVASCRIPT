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
    });
});