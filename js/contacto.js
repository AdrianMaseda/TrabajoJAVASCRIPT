/*  Creo un listener para que en cuanto se cargue la web, se genere un mapa
    con un marcador en el centro, apuntando a la empresa. Además, al pulsar
    el botón para calcular la ruta, se recoge la ubicación del usuario para
    poder trazarla entre ambos puntos.  */
document.addEventListener("DOMContentLoaded", function () {
    var map = L.map('mapa').setView([43.383, -5.833], 13);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
    
    var empresaMarker = L.marker([43.383, -5.833]).addTo(map)
        .bindPopup("Nuestra Empresa - La Media Legua 20, Oviedo")
        .openPopup();
    
    document.getElementById("calcularRuta").addEventListener("click", function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var userLat = position.coords.latitude;
                var userLng = position.coords.longitude;
                
                var userMarker = L.marker([userLat, userLng]).addTo(map)
                    .bindPopup("Tu ubicación actual")
                    .openPopup();
                
                var route = L.polyline([
                    [userLat, userLng],
                    [43.383, -5.833]
                ], {color: 'blue'}).addTo(map);
                
                map.fitBounds(route.getBounds());
            }, function () {
                alert("No se pudo obtener tu ubicación");
            });
        } else {
            alert("Tu navegador no soporta la geolocalización");
        }
    });
});