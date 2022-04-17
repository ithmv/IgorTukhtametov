const order = document.getElementById('order');

order.addEventListener('submit', (event) => {
    event.preventDefault();

    const { name, phone, masterId, serviceId, visitDate } = event.target.elements;

    console.log(name.value, phone.value, masterId.value, serviceId.value, visitDate.value);
});