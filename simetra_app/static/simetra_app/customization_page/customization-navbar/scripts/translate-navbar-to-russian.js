const navbarElements = document.getElementsByName('navbar-element-name');

const translationEnglishNavarToRussian = {
    "customization": "Настройки",

    "change-boss": "Руководители",
    "create-boss": "Добавить руководителя",
    "update-boss": "Изменить руководителя",

    "change-city": "Города",
    "create-city": "Добавить город",
    "upload-cities-excel": "Изменить город (таблицы)",
    "update-city": "Изменить город",

    "change-employee": "Сотрудники",
    "create-employee": "Добавить сотрудника",
    "update-employee": "Изменить сотрудника",
};

navbarElements.forEach(function (element) {
    const englishObjectName = String(element.textContent);
    element.textContent = translationEnglishNavarToRussian[englishObjectName];
});