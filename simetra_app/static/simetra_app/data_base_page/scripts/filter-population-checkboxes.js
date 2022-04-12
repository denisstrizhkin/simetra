function hideCitiesByPopulation() {
    function hideOrShowCityByCheckbox(checkbox, city) {
        if (checkbox.checked) {
            city.classList.remove('_hide-city-by-population');
        } else {
            city.classList.add('_hide-city-by-population');
        }
    }

    const millionare = document.getElementById('millionaire');
    const halfMillionare = document.getElementById('half-millionaire');
    const nonHalfMillionare = document.getElementById('non-half-millionaire');

    const halfMillionareCity = 500000;
    const millionareCity = 1000000;

    const valueToParsePopulation = 1000000;
    const cities = document.getElementsByName('table-row-values');
    
    cities.forEach(function(city) {
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

const populationCheckboxes = document.getElementsByName('population');

document.addEventListener('DOMContentLoaded', function() {
    populationCheckboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', () => {hideCitiesByPopulation()});
    });
});
