let standardImgForm = document.getElementsByName('image-field')[0];
let standardImgFormHTML = standardImgForm.innerHTML;

const indexOfChangeWord = standardImgFormHTML.indexOf('Change:');

standardImgFormHTML = standardImgFormHTML.slice(indexOfChangeWord);
standardImgFormHTML = standardImgFormHTML.replace('Change', 'Изменить');

standardImgForm.innerHTML = standardImgFormHTML;