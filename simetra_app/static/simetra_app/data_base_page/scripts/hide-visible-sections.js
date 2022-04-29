function come(elem, dif) {
  var docViewBottom = $(window).scrollTop() + $(window).height(),
    elemTop = $(elem).offset().top + dif;
  return (docViewBottom >= elemTop);
}

$(document).scroll(function (e) {
  if (come('.page__description', 100)) {
    $('.page__description').addClass('visible');
  }
  if (come('._container', 100)) {
    $('._container').addClass('visible');
  }

}); 