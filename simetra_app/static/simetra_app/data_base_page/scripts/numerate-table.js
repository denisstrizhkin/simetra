let numberColumn = document.getElementsByName('number');

for (let i = 0; i < numberColumn.length; i++) {
    numberColumn[i].textContent = i + 1;
}