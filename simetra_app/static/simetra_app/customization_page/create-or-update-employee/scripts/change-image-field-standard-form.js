var standardForm = document.getElementsByName('home__image-field')[0];
var standardFormInnerHTML = standardForm.innerHTML;

standardFormInnerHTML = standardFormInnerHTML.replace('Currently:', 'Текущее изображение');
standardFormInnerHTML = standardFormInnerHTML.replace('Change:', 'Изменить изображение');

console.log(standardFormInnerHTML);

standardForm.innerHTML = standardFormInnerHTML;