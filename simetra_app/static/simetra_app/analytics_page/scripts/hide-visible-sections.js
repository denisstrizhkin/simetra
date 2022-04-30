function come(elem, dif) {
  var docViewBottom = $(window).scrollTop() + $(window).height(),
    elemTop = $(elem).offset().top + dif;
  return (docViewBottom >= elemTop);
}

$(document).scroll(function (e) {
  if (come('.top-10', 100)) {
    $('.top-10').addClass('visible');
  }
  if (come('.block--1', 100)) {
    $('.block--1').addClass('visible');
  }
  if (come('.block--2', 100)) {
    $('.block--2').addClass('visible');
  }
  if (come('.block--3', 100)) {
    $('.block--3 ').addClass('visible');
  }
  if (come('.block--4', 100)) {
    $('.block--4').addClass('visible');
  }
  if (come('.block--5', 100)) {
    $('.block--5').addClass('visible');
  }
  if (come('.block--6', 100)) {
    $('.block--6').addClass('visible');
  }
  if (come('.block--7', 100)) {
    $('.block--7').addClass('visible');
  }
  if (come('.block--8', 100)) {
    $('.block--8').addClass('visible');
  }

});