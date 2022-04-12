// Key was taken from views.py in a secure way
const mapboxAccessToken = JSON.parse(document.getElementById('mapbox-access-token').textContent);
const citiesUnparsed = JSON.parse(document.getElementById('cities-list-json').textContent);

const moscowLongitude = 55.755830000000;
const moscowLatitude = 37.617780000000;

mapboxgl.accessToken = mapboxAccessToken;

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10',
    center: [moscowLatitude, moscowLongitude],
    zoom: 3,
});

citiesUnparsed.forEach(cityUnparsed => {
    const city = JSON.parse(cityUnparsed);

    const name = city['name'];
    const russian_name = city['russian_name'];
    const longitudeParsed = city['longitude'];
    const latitudeParsed = city['latitude'];

    const popupSettings = {
        closeButton: false,
        closeOnClick: false,
        className: '_styled-popup',
        anchor: 'center',
        offset: [-10, -30],
    }

    const popup = new mapboxgl.Popup(popupSettings);

    const markerSettings = document.createElement('div');
    markerSettings.className = '_styled-marker';

    const marker = new mapboxgl.Marker(markerSettings)
        .setLngLat([latitudeParsed, longitudeParsed])
        .addTo(map);

    marker._element.addEventListener('mouseenter', () => {
        marker._element.style.cursor = 'pointer';

        popup.setLngLat([latitudeParsed, longitudeParsed])
            .setText(russian_name)
            .addTo(map);
    });

    marker._element.addEventListener('mouseleave', () => {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });

    marker._element.addEventListener('click', () => {
        window.location.href = 'cities/' + name + '/';
    });
});
