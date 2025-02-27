/*  Esta función inicializa el mapa, centrado en la ubicación de la empresa. Añade un
    marcador en la misma. Se crea un servicio de dirección y se traza la ruta al cargar la
    ventana. Se establece en coche.  */
    function initMap() {

        //Se crea el mapa con la ubicacion de la empresa en el centro
        var ubicacion = { lat: 43.382156, lng: -5.814776 };
        var map = new google.maps.Map(document.getElementById("map"), {
            zoom: 13,
            center: ubicacion,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
    
        //Creación del servicio de trazado de ruta
        var directionsService = new google.maps.DirectionsService();
        var directionsRenderer = new google.maps.DirectionsRenderer();
        directionsRenderer.setMap(map);
        directionsRenderer.setPanel(document.getElementById("ruta"));
    
        function trazarRuta() {
            //Se recoge la ubicación del navegador del cliente
            navigator.geolocation.getCurrentPosition(function(position) {
                var userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                console.log(ubicacion);
                console.log(userLocation);
                //Se crea ruta desde la ubicacion del usuario hasta la empresa
                var request = {
                    origin: userLocation,
                    destination: ubicacion,
                    travelMode: google.maps.DirectionsTravelMode.DRIVING
                };
    
                directionsService.route(request, function(result, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        directionsRenderer.setDirections(result);
                    } else {
                        alert('No se pudo calcular la ruta');
                    }
                });
            });
        }

        trazarRuta(); // Ejecutar la función automáticamente al cargar la página
    }

    window.onload = initMap;