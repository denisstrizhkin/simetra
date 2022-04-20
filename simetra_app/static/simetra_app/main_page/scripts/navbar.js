$(document).scroll(function (e) {
    ($(window).scrollTop() > 950 && $(window).scrollTop() < 3500 || $(window).scrollTop() > 3880 && $(window).scrollTop() < 5550) ? $('.header').addClass('header__color') : $('.header').removeClass('header__color');
});