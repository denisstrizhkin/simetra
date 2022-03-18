// Key was taken from views.py in a secure way
const mapboxAccessToken = JSON.parse(document.getElementById('mapbox-access-token').textContent);
const citiesUnparsed = JSON.parse(document.getElementById('cities-list-json').textContent);

const moscowLongitude = 55.755830000000;
const moscowLatitude = 37.617780000000;

mapboxgl.accessToken = mapboxAccessToken;

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [moscowLatitude, moscowLongitude],
    zoom: 3,
});

citiesUnparsed.forEach(cityUnparsed => {
    const city = JSON.parse(cityUnparsed);

    const name = city['name'];
    const longitudeParsed = city['longitude'];
    const latitudeParsed = city['latitude'];

    const markerParameters = {
        color: 'red',
    }

    const popup = new mapboxgl.Popup({ offset: 25 }).setText(name);

    new mapboxgl.Marker(markerParameters)
        .setLngLat([latitudeParsed, longitudeParsed])
        .setPopup(popup)
        .addTo(map);
});
