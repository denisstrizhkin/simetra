function initializeCheckboxes() {
    let dictCheckboxAndRowIndex = {};

    const tableHead = document.getElementsByName('table-row-head')[0];
    const columnsNamesList = tableHead.children;

    for (index = 0; index < columnsNamesList.length; index++) {
        const columnName = columnsNamesList[index].innerHTML;

        switch (columnName) {
            case "Физическая доступность":
                dictCheckboxAndRowIndex['physicalAvailability'] = index;
                break;
            case "Ценовая доступность":
                dictCheckboxAndRowIndex['affordability'] = index;
                break;
            case "Эффективность транспортной сети":
                dictCheckboxAndRowIndex['routeNetworkEfficiency'] = index;
                break;
            case "Комфорт и удобство":
                dictCheckboxAndRowIndex['comfortNConvenience'] = index;
                break;
            case "Безопасность и устойчивое развитие":
                dictCheckboxAndRowIndex['securityNDevelopment'] = index;
                break;
        }
    }

    return dictCheckboxAndRowIndex;
}

function sortTableRows(cities) {
    function getSumOfRating(element) {
        return parseFloat(element.querySelector('#sum-of-rating').textContent);
    }

    Array.from(cities.children).sort(function (a, b) {
        return getSumOfRating(b) - getSumOfRating(a);
    }).forEach(function(city) {
        cities.appendChild(city);
    });
    
}

function recountSumOfRating(city) {
    function getCorrectlySumOfRating(newSum) {
        let newSumString = newSum.toString();
        
        const dot = '.';
        const amountOfFractionNumber = 2;

        let newStringInteger = newSumString.split(dot)[0];
        let newStringFraction = newSumString.split(dot)[1];

        if (newStringFraction == undefined) {
            newStringFraction = '00';
        }

        while (newStringFraction.length !== amountOfFractionNumber) {
            newStringFraction += '0';
        }

        newSumString = newStringInteger + dot + newStringFraction;

        return newSumString;
    }

    const sumOfRaing = city.querySelector('#sum-of-rating');

    const hiddenIndicator = '_hide-column-by-indicator';

    let newSum = 0;
    Array.from(city.children).forEach(function (child) {
        const childName = child.getAttribute('name');
        const isChildNameCorrect = childName == 'numeric-data';
        const isRowVisible = !child.classList.contains(hiddenIndicator);

        if (isChildNameCorrect && isRowVisible) {
            const unparsedNumericData = child.textContent;
            const parsedNumericData = parseFloat(unparsedNumericData);
            newSum += parsedNumericData;
        }
    });

    newSum = Math.round(newSum * 100) / 100;
    const newSumString = getCorrectlySumOfRating(newSum);
    sumOfRaing.textContent = newSumString;
}

function hideCitiesByIndicator() {
    function hideOrShowColumnByCheckbox(checkbox, checkboxRowTableIndex) {
        const tableHead = document.getElementsByName('table-row-head')[0];
        const cities = document.getElementsByName('table-row-values');

        let tableCell = tableHead.children[checkboxRowTableIndex];

        if (checkbox.checked) {
            tableCell.classList.remove('_hide-column-by-indicator');

            cities.forEach(function (city) {
                tableCell = city.children[checkboxRowTableIndex];
                tableCell.classList.remove('_hide-column-by-indicator');
                recountSumOfRating(city);
            });
        } else {
            tableCell.classList.add('_hide-column-by-indicator');

            cities.forEach(function (city) {
                tableCell = city.children[checkboxRowTableIndex];
                tableCell.classList.add('_hide-column-by-indicator');
                recountSumOfRating(city);
            });
        }
    }

    const dictCheckboxAndRowNumber = initializeCheckboxes();

    const dictCheckbox = {
        'physicalAvailability':
            document.getElementById('physical-availability'),
        'affordability':
            document.getElementById('affordability'),
        'routeNetworkEfficiency':
            document.getElementById('route-network-efficiency'),
        'comfortNConvenience':
            document.getElementById('comfort-n-convenience'),
        'securityNDevelopment':
            document.getElementById('security-n-development'),
    };

    for (const [checkboxName, checkbox] of Object.entries(dictCheckbox)) {
        checkboxTableRowIndex = dictCheckboxAndRowNumber[checkboxName];
        hideOrShowColumnByCheckbox(checkbox, checkboxTableRowIndex);
    }

    let cities = document.querySelector('#parent-of-table-values');
    sortTableRows(cities);
    numerateVisibleCities();
}

const otherIndicatorCheckboxes = document.getElementsByName('indicator');

document.addEventListener('DOMContentLoaded', function () {
    otherIndicatorCheckboxes.forEach(function (checkbox) {
        checkbox.addEventListener('change', () => { hideCitiesByIndicator() });
    });
});

const allIndicatorCheckbox = document.getElementsByName('indicator-all')[0];

document.addEventListener('DOMContentLoaded', function() {
    allIndicatorCheckbox.addEventListener('change', () => {
        changeOtherCheckboxesByAllCheckbox(
            allIndicatorCheckbox,
            otherIndicatorCheckboxes,
        )
    });
});
