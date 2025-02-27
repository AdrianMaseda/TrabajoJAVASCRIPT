/*  Listener al cargar la vista para recoger los parámetros para hacer el cálculo.
    Se realiza el cálculo solicitado en calcularRuta() para que se actualize el
    precio total en función de lo seleccionado. */
document.addEventListener("DOMContentLoaded", function() {
    /* Control de parámetros para el segundo formulario */
    const producto = document.getElementById("producto");
    const plazo = document.getElementById("plazo");
    const extras = document.querySelectorAll(".extra");
    const cantidadTotal = document.getElementById("total");
    const condiciones = document.getElementById("condiciones");
    const submitButton = document.querySelector("button[type='submit']");
    /* Control de parámetros para el primer formulario */
    const formulario = document.getElementById("formulario");
    const nombre = document.getElementById("nombre");
    const apellidos = document.getElementById("apellidos");
    const telefono = document.getElementById("telefono");
    const email = document.getElementById("email");

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

    //Cualquier conjunto de letras con espaciado, limite 15 caracteres
    function validarNombre(nombre) {
        return /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]{1,15}$/.test(nombre);
    }

    //Cualquier conjunto de letras con espaciado, limite 40 caracteres
    function validarApellidos(apellidos) {
        return /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]{1,40}$/.test(apellidos);
    }

    //9 caracteres numéricos
    function validarTelefono(telefono) {
        return /^[0-9]{9}$/.test(telefono);
    }

    //Formato email
    function validarEmail(email) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    }

    //Entre 1 y 24 meses
    function validarPlazo(plazo) {
        return plazo >= 1 && plazo <= 24;
    }

    function validarFormulario() {
        const esValido = 
            validarNombre(nombre.value) &&
            validarApellidos(apellidos.value) &&
            validarTelefono(telefono.value) &&
            validarEmail(email.value) &&
            validarPlazo(parseInt(plazo.value)) &&
            condiciones.checked;
        
        submitButton.disabled = !esValido;
        return esValido;
    }


    /*  Por cada parámetro que se pueda cambiar, se añade listener en caso de que
        se cambie algún valor. Acto seguido, se llama a la función otra vez. */
        producto.addEventListener("change", calcularTotal);
        plazo.addEventListener("input", calcularTotal);
        extras.forEach(extra => extra.addEventListener("change", calcularTotal));
        condiciones.addEventListener("change", validarFormulario);
        formulario.addEventListener("input", validarFormulario);
        formulario.addEventListener("submit", function (event) {
            if (!validarFormulario()) {
                event.preventDefault();
                alert("Por favor, revisa los datos del formulario antes de enviarlo.");
            }
        });

    calcularTotal();
});
