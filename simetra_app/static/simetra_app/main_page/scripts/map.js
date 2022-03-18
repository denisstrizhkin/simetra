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

    // TODO: Is there a way to make a prompt open when you hover on a city marker but not to click it? 
    const popup = new mapboxgl.Popup({ offset: 25 }).setText(name);

    const marker = new mapboxgl.Marker(markerParameters)
        .setLngLat([latitudeParsed, longitudeParsed])
        .setPopup(popup)
        .addTo(map);

    console.log(marker._element);

    marker._element.addEventListener('click', event => {
        window.location.href = name;
    });
});
