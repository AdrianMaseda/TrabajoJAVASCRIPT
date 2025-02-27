/*  Esta función inicializa el mapa, centrado en la ubicación de la empresa. Añade un
    marcador en la misma. Se crea un servicio de dirección y se traza la ruta al cargar la
    ventana. Se establece en coche.  */
    function initMap() {
        var ubicacion = { lat: 43.383, lng: -5.833 };
        var map = new google.maps.Map(document.getElementById("mapa"), {
            zoom: 13,
            center: ubicacion
        });
    
        var marker = new google.maps.Marker({
            position: ubicacion,
            map: map,
            title: "Nuestra Empresa - La Media Legua 20, Oviedo"
        });
    
        //Creación del servicio de trazado de ruta
        var directionsService = new google.maps.DirectionsService();
        var directionsRenderer = new google.maps.DirectionsRenderer();
        directionsRenderer.setMap(map);
    
        function trazarRuta() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    var userLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
    
                    var request = {
                        origin: userLocation,
                        destination: ubicacion,
                        travelMode: 'DRIVING'
                    };
    
                    directionsService.route(request, function(result, status) {
                        if (status == 'OK') {
                            directionsRenderer.setDirections(result);
                        } else {
                            alert('No se pudo calcular la ruta');
                        }
                    });
                },function() {  //Si no se pudo obtener la ubicación del usuario, se lanza un alert.
                    alert("No se pudo obtener tu ubicación");
                });
            } else {
                alert("Tu navegador no soporta la geolocalización");
            }
        }
    
        trazarRuta(); // Ejecutar la función automáticamente al cargar la página
    }
    
    window.onload = initMap;