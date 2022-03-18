// Key was taken from views.py in a secure way
const mapboxAccessToken = JSON.parse(document.getElementById('mapbox-access-token').textContent);
const citiesUnparsed = JSON.parse(document.getElementById('cities-list-json').textContent);

const moscowLongitude = 55.755830000000;
const moscowLatitude = 37.617780000000;

mapboxgl.accessToken = mapboxAccessToken;

const map = new mapboxgl.Map({
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

    const popupSettings = {
        closeButton: false,
        closeOnClick: false,
        offset: [0, -35],
    }

    const popup = new mapboxgl.Popup(popupSettings);

    const markerSettings = {
        color: 'red',
    }

    const marker = new mapboxgl.Marker(markerSettings)
        .setLngLat([latitudeParsed, longitudeParsed])
        .addTo(map);

    console.log(marker._element);

    marker._element.addEventListener('mouseenter', () => {
        marker._element.style.cursor = 'pointer';

        popup.setLngLat([latitudeParsed, longitudeParsed])
            .setText(name)
            .addTo(map);
    });

    marker._element.addEventListener('mouseleave', () => {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });

    marker._element.addEventListener('click', () => {
        window.location.href = name;
    });
});
