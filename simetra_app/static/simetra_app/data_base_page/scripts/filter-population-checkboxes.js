function hideCitiesByPopulation(allCheckbox) {
    function uncheckAllCheckbox() {
        allCheckbox.checked = false;
    }

    function hideOrShowCityByCheckbox(checkbox, city) {
        if (checkbox.checked) {
            city.classList.remove('_hide-city-by-population');
        } else {
            city.classList.add('_hide-city-by-population');
            uncheckAllCheckbox();
        }
    }

    const millionare = document.getElementById('millionaire');
    const halfMillionare = document.getElementById('half-millionaire');
    const nonHalfMillionare = document.getElementById('non-half-millionaire');

    const halfMillionareCity = 500000;
    const millionareCity = 1000000;

    const valueToParsePopulation = 1000000;
    const cities = document.getElementsByName('table-row-values');

    cities.forEach(function (city) {
        let population = city.querySelector('#num-population').textContent;
        population = population * valueToParsePopulation;

        if (population < halfMillionareCity) {
            hideOrShowCityByCheckbox(nonHalfMillionare, city);
        }

        if (population < millionareCity && population > halfMillionareCity) {
            hideOrShowCityByCheckbox(halfMillionare, city);
        }

        if (population > millionareCity) {
            hideOrShowCityByCheckbox(millionare, city);
        }
    });

    numerateVisibleCities();
}

const otherPopulationCheckboxes = document.getElementsByName('population');
const allPopulationCheckbox = document.getElementsByName('population-all')[0];

document.addEventListener('DOMContentLoaded', function () {
    otherPopulationCheckboxes.forEach(function (checkbox) {
        checkbox.addEventListener('change', () => {
            hideCitiesByPopulation(allPopulationCheckbox);
            checkAllCheckboxIfAllCheckboxesAreChecked(
                otherPopulationCheckboxes,
                allPopulationCheckbox,
            );
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    allPopulationCheckbox.addEventListener('change', () => {
        changeOtherCheckboxesByAllCheckbox(
            allPopulationCheckbox,
            otherPopulationCheckboxes,
        );
    });
});
