let standardImgForm = document.getElementsByName('image-field')[0];
let standardImgFormHTML = standardImgForm.innerHTML;

const isCreatePage = document.getElementsByName('is-create-page')[0];
const isCreatePageValue = isCreatePage.textContent;

if (isCreatePageValue == 'True') {
    const inputImage = document.getElementById('id_image');
    inputImage.style.paddingTop = 0;
} else {
    const indexOfChangeWord = standardImgFormHTML.indexOf('Change:');

    standardImgFormHTML = standardImgFormHTML.slice(indexOfChangeWord);
    standardImgFormHTML = standardImgFormHTML.replace('Change', 'Изменить');

    standardImgForm.innerHTML = standardImgFormHTML;
}