document.addEventListener('DOMContentLoaded', function () {


    // Asignar evento click a cada plan-card
    const reservaFooter = document.getElementById('registrar-footer')
    reservaFooter.addEventListener('click', function (event) {
            // Redirigir a la página principal con un parámetro para abrir el pop-up de iniciar sesión
            if (localStorage.getItem('role') == 'tutor') {
                window.location.href = '../inscripcion/inscripcion.html';
            } else {
                window.location.href = '../../index.html?showLogin=true';
            }
        });


    //Fetch para obtener los datos de las tarifas de la BBDD
    fetch('http://127.0.0.1:8000/api/activities')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error `);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            const cardsContainer = document.querySelector('.cards-container');
            data.forEach((item, index) => {
                console.log(`ID: ${item.id}, Nombre Actividad: ${item.name}, Descripción: ${item.description}`);
                console.log(index);
                // Crear una nueva tarjeta
                const card = document.createElement('div');
                card.classList.add('card');
                card.style.animation = `slideIn 0.5s ease-out ${index * 0.2}s forwards`;
                // Crear el elemento figure y la imagen
                const figure = document.createElement('figure');
                const img = document.createElement('img');
                img.src = "https://placehold.co/408x126";
                img.alt = "";

                // Agregar la imagen al figure
                figure.appendChild(img);

                // Crear el contenedor de texto
                const textContainer = document.createElement('div');

                // Crear el título de la actividad
                const title = document.createElement('h6');
                title.textContent = item.name;

                // Crear la descripción de la actividad
                const description = document.createElement('p');
                description.textContent = item.description;

                // Agregar el título y la descripción al contenedor de texto
                textContainer.appendChild(title);
                textContainer.appendChild(description);

                // Agregar el figure y el contenedor de texto a la tarjeta
                card.appendChild(figure);
                card.appendChild(textContainer);

                // Agregar la tarjeta al contenedor de tarjetas
                cardsContainer.appendChild(card);
            });

        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
        });


});