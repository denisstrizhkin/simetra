$(document).scroll(function (e) {
    ($(window).scrollTop() > 690 && $(window).scrollTop() < 2412 || $(window).scrollTop() > 3027 && $(window).scrollTop() < 4774) ? $('.header').addClass('header__color') : $('.header').removeClass('header__color');
});