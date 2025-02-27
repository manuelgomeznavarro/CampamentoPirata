document.addEventListener("DOMContentLoaded", () => {
    function checkRole() {
        const role = localStorage.getItem('role');

        if (role) {
            switch (role) {
                case 'tutor':
                    const headerBtnsContainer = document.querySelector('header .header-btns-container');
                    const reservationBtn = document.createElement('a');
                    reservationBtn.classList.add('anchor-button');
                    reservationBtn.href = './tutor/inscripcion/inscripcion.html';
                    reservationBtn.innerText = 'Reserva';

                    const tutorProfilePicContainer = document.createElement('figure');
                    const tutorProfilePic = document.createElement('img');

                    fetch(`http://127.0.0.1:8000/api/get_user_pic`, {
                        method: 'POST', //Método para enviar los datos al servidor
                        headers: {
                            'Content-Type': 'application/json' //Envío de datos en formato JSON
                        },
                        body: JSON.stringify({
                            role: localStorage.getItem('role'),
                            role_id: localStorage.getItem('role_id')
                        }) //Se convierte el objeto JS a una cadena JSON
                    })
                        .then(response => {
                            return response.json();
                        })
                        .then(data => {
                            if (data.url) {
                                tutorProfilePic.src = data.url;
                            } else {
                                tutorProfilePic.src = 'https://campamento-tesoro-perdido-image-hosting.fra1.cdn.digitaloceanspaces.com/icons/default-profile.png';
                            }
                        })
                        .catch(error => {
                            console.log(error);

                        })

                    tutorProfilePicContainer.appendChild(tutorProfilePic);

                    headerBtnsContainer.innerHTML = "";
                    headerBtnsContainer.appendChild(reservationBtn);
                    headerBtnsContainer.appendChild(tutorProfilePicContainer);

                    break;

                case 'monitor':
                    location.assign('./monitor/html/dashboard.html');

                    break;

                case 'admin':
                    location.assign('./admin/dashboard.html');

                    break;

                default:
                    break;
            }
        }
    }

    checkRole();

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
});