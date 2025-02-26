/*  Creo un listener para que en cuanto se cargue la web, se genere un mapa
    con un marcador en el centro, apuntando a la empresa. Además, al pulsar
    el botón para calcular la ruta, se recoge la ubicación del usuario para
    poder trazarla entre ambos puntos.  */
    function initMap() {
        var ubicacion = { lat: 43.383, lng: -5.833 }; //Ubicación de la empresa
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
    
        /*  Al hacer click en el botón, se utiliza la geolocalización para recoger la ubicación del usuario
            y proceder a crear una ruta en coche hasta la empresa.  */
        document.getElementById("calcularRuta").addEventListener("click", function() {
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
                });
            } else {
                alert("Tu navegador no soporta la geolocalización");
            }
        });
    }
    
    document.addEventListener("DOMContentLoaded", initMap);