// contacto.js - ahora usa Leaflet Routing Machine para generar una ruta real
document.addEventListener('DOMContentLoaded', () => {
  const businessLatLng = [37.9922, -1.1307]; // Murcia
  const map = L.map('map').setView(businessLatLng, 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  const marker = L.marker(businessLatLng).addTo(map).bindPopup('Empresa - Murcia').openPopup();

  const routeBtn = document.getElementById('routeBtn');
  let routingControl = null;

  routeBtn.addEventListener('click', () => {
    if (!navigator.geolocation) {
      alert('Geolocalización no soportada por tu navegador.');
      return;
    }
    routeBtn.disabled = true;
    navigator.geolocation.getCurrentPosition(position => {
      const userLatLng = L.latLng(position.coords.latitude, position.coords.longitude);

      if (routingControl) {
        map.removeControl(routingControl);
      }

      routingControl = L.Routing.control({
        waypoints: [
          L.latLng(businessLatLng[0], businessLatLng[1]),
          userLatLng
        ],
        router: L.Routing.osrmv1({
          serviceUrl: 'https://router.project-osrm.org/route/v1'
        }),
        showAlternatives: false,
        fitSelectedRoutes: true,
        routeWhileDragging: false,
        createMarker: function(i, wp, nWps) {
          if (i === 0) {
            return L.marker(wp.latLng).bindPopup('Empresa');
          } else {
            return L.marker(wp.latLng).bindPopup('Tu ubicación');
          }
        }
      }).addTo(map);

      routeBtn.disabled = false;
    }, err => {
      alert('No se pudo obtener la ubicación: ' + err.message);
      routeBtn.disabled = false;
    }, { enableHighAccuracy: true, timeout: 10000 });
  });
});
