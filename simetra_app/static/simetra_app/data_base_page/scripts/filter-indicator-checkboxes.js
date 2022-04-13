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

    let newSumString = newSum.toString();
    let newStringInteger = newSumString.split('.')[0];
    let newStringFraction = newSumString.split('.')[1];

    if (newStringFraction == undefined) {
        newStringFraction = '00';
    }

    let dot = '.';
    
    let newStringFractionLength = newStringFraction.length;

    while (newStringFractionLength !== 2) {
        newStringFraction += '0';
        newStringFractionLength += 1;
    }

    newSum = newStringInteger + dot + newStringFraction;

    console.log()

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

const indicatorCheckboxes = document.getElementsByName('indicator');

document.addEventListener('DOMContentLoaded', function () {
    indicatorCheckboxes.forEach(function (checkbox) {
        checkbox.addEventListener('change', () => { hideCitiesByIndicator() });
    });
});
