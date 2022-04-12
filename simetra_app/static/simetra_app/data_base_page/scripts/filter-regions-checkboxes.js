function hideCitiesByRegion() {
    function hideOrShowCityByCheckbox(district, city, suspected, checkbox) {
        if (district == suspected) {
            if (checkbox.checked) {
                city.classList.remove('_hide-city-by-region');
            } else {
                city.classList.add('_hide-city-by-region');
            }
        }
    }

    const dictRegionAndItsElement = {
        'ЦФО': document.getElementById('CFO'),
        'СЗФО': document.getElementById('SZFO'),
        'ЮФО': document.getElementById('YUFO'),
        'СКФО': document.getElementById('SKFO'),
        'ПФО': document.getElementById('PFO'),
        'УФО': document.getElementById('UFO'),
        'СФО': document.getElementById('SFO'),
        'ДФО': document.getElementById('DFO'),
    }

    const cities = document.getElementsByName('table-row-values');

    cities.forEach(function (city) {
        let district = city.querySelector('#region').textContent;

        for (const [checkboxName, checkbox] of Object.entries(dictRegionAndItsElement)) {
            hideOrShowCityByCheckbox(district, city, checkboxName, checkbox);
        }
    });

    numerateVisibleCities();
}

const regionCheckboxes = document.getElementsByName('region');

document.addEventListener('DOMContentLoaded', function () {
    regionCheckboxes.forEach(function (checkbox) {
        checkbox.addEventListener('change', () => { hideCitiesByRegion() });
    });
});