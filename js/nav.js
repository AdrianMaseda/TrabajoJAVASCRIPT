
/*  A partir de un event listener, guardo en una variable el scroll 0.
    En función del movimiento que se haga verticalmente en la web, se añade
    la clase scrolled al menú de navegación.    */
document.addEventListener("DOMContentLoaded", function() {
    let inicial = 0;
    const headerContainer = document.querySelector(".header-container");

    window.addEventListener("scroll", function() {
        let scrollActual = window.scrollY;

        if (scrollActual > inicial) {
            // El usuario está bajando
            headerContainer.classList.add("scrolled");
        } else {
            // El usuario está subiendo
            headerContainer.classList.remove("scrolled");
        }

        inicial = scrollActual;
    });
});