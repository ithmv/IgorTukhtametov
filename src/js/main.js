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

const order = document.getElementById('order');

order.addEventListener('submit', (event) => {
    event.preventDefault();

    const { name, phone, masterId, serviceId, visitDate } = event.target.elements;

    console.log(name.value, phone.value, masterId.value, serviceId.value, visitDate.value);
});

$(document).ready(init);