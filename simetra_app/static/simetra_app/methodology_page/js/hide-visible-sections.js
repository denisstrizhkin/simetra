function come(elem, dif) {
  var docViewBottom = $(window).scrollTop() + $(window).height(),
    elemTop = $(elem).offset().top + dif;
  return (docViewBottom >= elemTop);
}

$(document).scroll(function (e) {
  if (come('.choice', 100)) {
    $('.choice').addClass('visible');
  }
  if (come('.first', 100)) {
    $('.first').addClass('visible');
  }
  if (come('.second', 100)) {
    $('.second').addClass('visible');
  }
  if (come('.payment', 100)) {
    $('.payment').addClass('visible');
  }
  if (come('.sources', 100)) {
    $('.sources').addClass('visible');
  }
  if (come('.system', 100)) {
    $('.system').addClass('visible');
  }
});