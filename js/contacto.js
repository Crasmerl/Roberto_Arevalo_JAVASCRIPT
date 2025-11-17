
document.addEventListener('DOMContentLoaded', () => {
  const map = L.map('map').setView([37.9922, -1.1307], 14);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  const businessLatLng = [37.9922, -1.1307];
  const marker = L.marker(businessLatLng).addTo(map).bindPopup('Empresa inventada - Murcia').openPopup();

  const routeBtn = document.getElementById('routeBtn');
  routeBtn.addEventListener('click', () => {
    if(!navigator.geolocation){
      alert('Geolocalización no soportada por tu navegador.');
      return;
    }
    routeBtn.disabled = true;
    navigator.geolocation.getCurrentPosition(pos => {
      const from = [pos.coords.latitude, pos.coords.longitude];
      const fromMarker = L.marker(from).addTo(map).bindPopup('Tu ubicación').openPopup();
      const line = L.polyline([from, businessLatLng]).addTo(map);
      map.fitBounds(line.getBounds(), {padding:[50,50]});
      routeBtn.disabled = false;
    }, err => {
      alert('No se pudo obtener la ubicación: ' + err.message);
      routeBtn.disabled = false;
    });
  });
});
