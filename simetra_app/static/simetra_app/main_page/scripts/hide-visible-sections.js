function come(elem, dif) {
  var docViewBottom = $(window).scrollTop() + $(window).height(),
    elemTop = $(elem).offset().top + dif;
  return (docViewBottom >= elemTop);
}

$(document).scroll(function (e) {
  if (come('.comments', 100)) {
    $('.comments').addClass('visible');
  }
  if (come('.about', 100)) {
    $('.about').addClass('visible');
  }
  if (come('.about__text-image', 30)) {
    $('.about__text-image').addClass('visible');
  }
  if (come('.about__image', 150)) {
    $('.about__image').addClass('visible');
  }
  if (come('.about__youtube-video', 100)) {
    $('.about__youtube-video').addClass('visible');
  }
  if (come('.about__text-video', 30)) {
    $('.about__text-video').addClass('visible');
  }
  if (come('.methodology', 50)) {
    $('.methodology').addClass('visible');
  }
  if (come('.map', 100)) {
    $('.map').addClass('visible');
  }
  if (come('.city--first', 110)) {
    $('.city--first').addClass('visible');
  }
  if (come('.city--second', 200)) {
    $('.city--second').addClass('visible');
  }
  if (come('.city--third', 90)) {
    $('.city--third').addClass('visible');
  }
  if (come('.city--forth', 210)) {
    $('.city--forth').addClass('visible');
  }
  if (come('.employee__image', 30)) {
    $('.employee__image').addClass('visible');
  }

});