import $ from 'jquery';
import { OrderForm } from './forms/order-form';

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

    new OrderForm();
}

$(document).ready(init);