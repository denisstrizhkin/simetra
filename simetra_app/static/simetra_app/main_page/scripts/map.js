// Key was taken from views.py in a secure way
const mapbox_access_token = JSON.parse(document.getElementById('mapbox-access-token').textContent);

mapboxgl.accessToken = mapbox_access_token;

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
});

new mapboxgl.Marker()
    .setLngLat([-0.1404545, 51.5220163])
    .addTo(map);
