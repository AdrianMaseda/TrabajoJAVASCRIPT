/*  Listener al cargar la vista para recoger los parámetros para hacer el cálculo.
    Se realiza el cálculo solicitado en calcularRuta() para que se actualize el
    precio total en función de lo seleccionado. */
document.addEventListener("DOMContentLoaded", function() {
    const producto = document.getElementById("producto");
    const plazo = document.getElementById("plazo");
    const extras = document.querySelectorAll(".extra");
    const cantidadTotal = document.getElementById("total");
    const condiciones = document.getElementById("condiciones");
    const submitButton = document.querySelector("button[type='submit']");

    function calcularTotal() {
        let total = parseInt(producto.value);
        extras.forEach(extra => {
            if (extra.checked){
                total += parseInt(extra.value);
            } 
        });
        total -= total * (plazo.value * 0.05); //Descuento del 5% por mes extras incluidos
        cantidadTotal.textContent = `${total.toFixed(2)} €`;
    }

    function validarFormulario() {
        submitButton.disabled = !condiciones.checked;
    }

    /*  Por cada parámetro que se pueda cambiar, se añade listener en caso de que
        se cambie algún valor. Acto seguido, se llama a la función otra vez. */
    producto.addEventListener("change", calcularTotal);
    plazo.addEventListener("input", calcularTotal);
    extras.forEach(extra => extra.addEventListener("change", calcularTotal));
    condiciones.addEventListener("change", validarFormulario);

    calcularTotal(); //Se actualizan los valores
});
