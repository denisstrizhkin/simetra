const submitNewCityButton = document.getElementsByName('sumbit-new-city')[0];
const backendCityName = document.getElementsByName('name')[0];

const pointLongitude = document.getElementsByName('longitude')[0];
const pointLatitude = document.getElementsByName('latitude')[0];

const basicCityCoordinates = document.querySelector('.js-mapbox-input-location-field').value;

submitNewCityButton.addEventListener('click', function() {
    const fullCityName = document.getElementsByClassName('mapboxgl-ctrl-geocoder--input')[0].value;
    const croppedCityName = fullCityName.split(',')[0];
    
    let cityFullLocation = document.getElementsByClassName('js-mapbox-input-location-field')[0].value;
    citycityFullLocation = cityFullLocation.split(',');

    const cityLongtitude = citycityFullLocation[0];
    const cityLatitude = citycityFullLocation[1];

    backendCityName.value = croppedCityName;
    pointLongitude.value = cityLongtitude;
    pointLatitude.value = cityLatitude;
});