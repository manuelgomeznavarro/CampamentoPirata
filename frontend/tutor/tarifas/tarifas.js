document.addEventListener("DOMContentLoaded", function () {
//Fetch para obtener los datos de las tarifas de la BBDD
fetch('http://127.0.0.1:8000/api/prices')
.then(response => {
    if (!response.ok) {
        throw new Error(`Error `);
    }
    return response.json();
})
.then(data => {
    console.log(data);
    data.forEach((item, index) => {
        console.log(`ID: ${item.id}, Nombre Tarifa: ${item.name}, Precio: ${item.price}`);
        console.log(index);
        const tarifaCards = document.querySelectorAll('.plan-card');
        if (index < tarifaCards.length) {
            const tarifaCard = tarifaCards[index];
            const titleElement = tarifaCard.querySelector('.plan-title span');
            const priceElement = tarifaCard.querySelector('.plan-price span');
            // const buttonsave = tarifaCard.querySelector('button');
            titleElement.textContent = item.name;
            priceElement.textContent = item.price;
            // buttonsave.value = item.id;
        }
    })
})
.catch(error => {
    console.error('Error al obtener los datos:', error);
});

// Asignar evento click a cada plan-card
document.querySelectorAll('.plan-card').forEach(card => {
    card.addEventListener('click', function (event) {
        // Redirigir a la página principal con un parámetro para abrir el pop-up de iniciar sesión
        if (localStorage.getItem('role') == 'tutor') {
            window.location.href = '../inscripcion/inscripcion.html';
            } else {
                window.location.href = '../../index.html?showLogin=true';
            }
});

});
}
);