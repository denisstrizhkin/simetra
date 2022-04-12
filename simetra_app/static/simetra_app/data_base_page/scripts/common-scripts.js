function numerateCities() {
    let numberColumn = document.getElementsByName('number');

    for (let i = 0; i < numberColumn.length; i++) {
        numberColumn[i].textContent = i + 1;
    }
}

function numerateVisibleCities() {
    function isCityHidden(city) {
        return city.classList.contains('_hide-city-by-region') ||
            city.classList.contains('_hide-city-by-population') ||
            city.classList.contains('_hide-column-by-indicator')
    }

    let numberColumn = document.getElementsByName('number');
    const cities = document.getElementsByName('table-row-values');

    let visibleCitiesAmount = 0;
    for (let i = 0; i < numberColumn.length; i++) {
        if (!isCityHidden(cities[i])) {
            visibleCitiesAmount += 1;
            numberColumn[i].textContent = visibleCitiesAmount;
        }
    }
}

numerateCities();