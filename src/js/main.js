import $ from 'jquery';

function init(){

    if ($(window).width() < 480) {
    $('.portfolio__works').slick({
        slidesToShow: 2,
        prevArrow: '.slider-prev',
        nextArrow: '.slider-next'
    });
}

if ($(window).width() > 480) {
    $('.portfolio__works').slick({
        slidesToShow: 4,
        prevArrow: '.slider-prev',
        nextArrow: '.slider-next'
    });
}
}

$(document).ready(init);