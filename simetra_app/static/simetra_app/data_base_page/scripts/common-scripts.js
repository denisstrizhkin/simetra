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

function changeOtherCheckboxesByAllCheckbox(allCheckbox, otherCheckboxes) {
    if (allCheckbox.checked) {
        otherCheckboxes.forEach(function (checkbox) {
            checkbox.checked = true;
        });
    } else {
        otherCheckboxes.forEach(function (checkbox) {
            checkbox.checked = false;
        });
    }

    const allCheckboxName = allCheckbox.getAttribute('name');

    if (allCheckboxName == 'population-all') {
        hideCitiesByPopulation(allPopulationCheckbox);
    }

    if (allCheckboxName == 'region-all') {
        hideCitiesByRegion();
    }

    if (allCheckboxName == 'indicator-all') {
        hideCitiesByIndicator();
    }
}

function checkAllCheckboxIfAllCheckboxesAreChecked(otherCheckboxes, allCheckbox) {
    const allCheckboxesAmount = otherCheckboxes.length;
    let checkedCheckboxesAmount = 0;

    otherCheckboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
            checkedCheckboxesAmount += 1;
        }
    });

    if (allCheckboxesAmount == checkedCheckboxesAmount) {
        allCheckbox.checked = true;
    } else {
        allCheckbox.checked = false;
    }
}

numerateCities();
