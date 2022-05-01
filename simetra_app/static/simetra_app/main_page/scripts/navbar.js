$(document).scroll(function (e) {
    var commentsTop = $('.comments').offset().top,
        statisticsTop = $('.statistics').offset().top,
        statisticsBottom = statisticsTop + $('.statistics').outerHeight(),
        downloadTop = $('.download').offset().top;

    if ($(window).scrollTop() > commentsTop && $(window).scrollTop() < statisticsTop || $(window).scrollTop() > statisticsBottom && $(window).scrollTop() < downloadTop) {
        $('.header').addClass('header__color');
    } else {
        $('.header').removeClass('header__color');
    }
});