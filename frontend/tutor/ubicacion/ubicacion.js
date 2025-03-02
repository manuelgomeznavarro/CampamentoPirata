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

                // tutorProfilePic.src = 'https://campamento-tesoro-perdido-image-hosting.fra1.cdn.digitaloceanspaces.com/icons/default-profile.png';
                tutorProfilePicContainer.addEventListener('click', () => {
                    location.assign('../../tutor/perfil_tutor/perfil_tutor.html');
                });
                const btnSalir = document.createElement('button');
                    const imgSalir = document.createElement('img');
                    imgSalir.src = 'https://campamento-tesoro-perdido-image-hosting.fra1.cdn.digitaloceanspaces.com/icons/logout-icon.png';
                    btnSalir.appendChild(imgSalir);

                    btnSalir.addEventListener('click', () => {
                        localStorage.removeItem('role');
                        localStorage.removeItem('role_id');
                        location.reload();
                    });

                    const logoFooter = document.getElementById('logo-header');

                    logoFooter.addEventListener('click', function () {
                        location.assign('../../index.html');
                    }
                    );
                    
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
                headerBtnsContainer.appendChild(btnSalir);
                tutorProfilePicContainer.appendChild(tutorProfilePic);
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
        } else {
            const inicio = document.getElementById("sign-in");
            const registrar = document.getElementById("sign-up");

            inicio.addEventListener('click', () => window.location.href = '../../index.html?showLogin=true');
            registrar.addEventListener('click', () => window.location.href = '../../index.html?showSignUp=true');
        }
    }

    checkRole();


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

// Array with image URLs
const facilityImages = [
    "https://a.espncdn.com/photo/2024/1010/nba_rank-10-1_16x9.jpg",
    "https://basketworld.com/blog/wp-content/uploads/2024/10/comiezo-de-la-nba-temporada-24-25.jpg",
    "https://estaticos-cdn.prensaiberica.es/clip/c9dea18c-7318-4f65-b891-3e59fd104ea0_alta-libre-aspect-ratio_default_0.jpg",
    "https://spain.id.nba.com/storage/photos/shares/Lebron-Maximo-anotador.jpg",
];

// Current image index
let currentImageIndex = 0;

// Get DOM elements
const leftArrow = document.querySelector('.facilities div figure:first-child img');
const rightArrow = document.querySelector('.facilities div figure:last-child img');
const facilityImage = document.querySelector('.facilities-pic img');

// Function to update the image
function updateImage() {
facilityImage.src = facilityImages[currentImageIndex];
}

// Add click event to left arrow
leftArrow.addEventListener('click', () => {
// Decrease index and handle wrapping around to the end
currentImageIndex = (currentImageIndex - 1 + facilityImages.length) % facilityImages.length;
updateImage();
});

// Add click event to right arrow
rightArrow.addEventListener('click', () => {
// Increase index and handle wrapping around to the beginning
currentImageIndex = (currentImageIndex + 1) % facilityImages.length;
updateImage();
});

// Add cursor pointer to arrows for better UX
leftArrow.style.cursor = 'pointer';
rightArrow.style.cursor = 'pointer';