function come(elem, dif) {
  var docViewBottom = $(window).scrollTop() + $(window).height(),
    elemTop = $(elem).offset().top + dif;
  return (docViewBottom >= elemTop);
}

$(document).scroll(function (e) {
  if (come('.rating', 100)) {
    $('.rating').addClass('visible');
  }

}); 