function numerateCities() {
    let numberColumn = document.getElementsByName('number');

    for (let i = 0; i < numberColumn.length; i++) {
        numberColumn[i].textContent = i + 1;
    }
}

function numerateCitiesByPopulation() {
    let numberColumn = document.getElementsByName('number');
    const cities = document.getElementsByName('table-row-values');
    const hiddenCity = "none";

    let visibleCitiesAmount = 0;
    for (let i = 0; i < numberColumn.length; i++) {
        if (cities[i].style.display != hiddenCity) {
            visibleCitiesAmount += 1;
            numberColumn[i].textContent = visibleCitiesAmount;
        }
    }
}

function hideCitiesByPopulation() {
    const millionare = document.getElementById('millionaire');
    const halfMillionare = document.getElementById('half-millionaire');
    const nonHalfMillionare = document.getElementById('non-half-millionaire');

    const halfMillionareCity = 500000;
    const millionareCity = 1000000;

    const valueToParsePopulation = 1000000;
    const cities = document.getElementsByName('table-row-values');

    const hiddenCity = "display: none;";
    
    cities.forEach(function(city) {
        let population = city.querySelector('#num-population').textContent;
        population = population * valueToParsePopulation;

        if (population < halfMillionareCity) { 
            if (nonHalfMillionare.checked) {
                city.style =  "";
            } else {
                city.style = hiddenCity;
            }
        }

        if (population < millionareCity && population > halfMillionareCity) {
            if (halfMillionare.checked) {
                city.style =  "";
            } else {
                city.style = hiddenCity;
            }
        }

        if (population > millionareCity) {
            if (millionare.checked) {
                city.style =  "";
            } else {
                city.style = hiddenCity;
            }
        }
    });

    numerateCitiesByPopulation();
}

numerateCities();

const populationCheckboxes = document.getElementsByName('population');

document.addEventListener('DOMContentLoaded', function() {
    populationCheckboxes.forEach(function(element) {
        element.addEventListener('change', () => {hideCitiesByPopulation()});
    });
});
