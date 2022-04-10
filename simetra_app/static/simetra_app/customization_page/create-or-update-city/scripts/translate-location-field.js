const pageHome = document.getElementsByClassName('page__home')[0];
const locationFieldCandidates = pageHome.getElementsByTagName('label');

let locationField = '';
for (i = 0; i < locationFieldCandidates.length && locationField == ''; i++) {
    if (locationFieldCandidates[0].htmlFor == 'id_location') {
        locationField = locationFieldCandidates[0];
    }
}

locationField.textContent = "«Сырые» координаты:"
locationFieldNewOuterHTML = locationField.outerHTML + '<br>';
locationField.outerHTML = locationFieldNewOuterHTML;
