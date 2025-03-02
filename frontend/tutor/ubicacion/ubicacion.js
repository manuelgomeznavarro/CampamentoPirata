function checkRole() {
    const role = localStorage.getItem('role');

    if (role) {
        switch (role) {
            case 'tutor':
                const headerBtnsContainer = document.querySelector('header .header-btns-container');
                const reservationBtn = document.createElement('a');
                reservationBtn.classList.add('anchor-button');
                reservationBtn.href = '../inscripcion/inscripcion.html';
                reservationBtn.innerText = 'Inscripción';

                const btnSalir = document.createElement('button');
                btnSalir.className = "exit-button";
                const imgSalir = document.createElement('img');
                imgSalir.src = 'https://campamento-tesoro-perdido-image-hosting.fra1.cdn.digitaloceanspaces.com/icons/logout-icon2.png';
                btnSalir.appendChild(imgSalir);

                btnSalir.addEventListener('click', () => {
                    localStorage.removeItem('role');
                    localStorage.removeItem('role_id');
                    location.reload();
                });

                const tutorProfilePicContainer = document.createElement('figure');
                const tutorProfilePic = document.createElement('img');

                // tutorProfilePic.src = 'https://campamento-tesoro-perdido-image-hosting.fra1.cdn.digitaloceanspaces.com/icons/default-profile.png';
                tutorProfilePicContainer.addEventListener('click', () => {
                    location.assign('../perfil_tutor/perfil_tutor.html');
                });

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
                            tutorProfilePic.src = 'https://campamento-tesoro-perdido-image-hosting.fra1.cdn.digitaloceanspaces.com/icons/default-profile2.png';
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
                location.assign('../../monitor/html/dashboard.html');

                break;

            case 'admin':
                location.assign('../../admin/dashboard.html');

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
    "https://campamento-tesoro-perdido-image-hosting.fra1.cdn.digitaloceanspaces.com/pics/instalaciones_1.jpg",
    "https://campamento-tesoro-perdido-image-hosting.fra1.cdn.digitaloceanspaces.com/pics/instalaciones_2.jpg",
    "https://campamento-tesoro-perdido-image-hosting.fra1.cdn.digitaloceanspaces.com/pics/instalaciones_3.jpg",
    "https://campamento-tesoro-perdido-image-hosting.fra1.cdn.digitaloceanspaces.com/pics/instalaciones_4.jpg",
    "https://campamento-tesoro-perdido-image-hosting.fra1.cdn.digitaloceanspaces.com/pics/instalaciones_5.jpg",
];

// Current image index
let currentImageIndex = 0;

// Get DOM elements
const leftArrow = document.querySelector('.facilities div figure:first-child img');
const rightArrow = document.querySelector('.facilities div figure:last-child img');
const facilityImage = document.querySelector('.facilities-pic img');
const facilityPic = document.querySelector('.facilities-pic');

// Flag to prevent rapid clicking
let animationInProgress = false;
// For automatic rotation
let autoRotateTimer = null;

// Function to update the image with elegant animation
function updateImage(direction) {
if (animationInProgress) return;
animationInProgress = true;

// Reset auto-rotation timer when manual navigation occurs
resetAutoRotate();

// Create a clone of the current image for the transition effect
const currentImgClone = facilityImage.cloneNode(true);
facilityPic.appendChild(currentImgClone);
currentImgClone.classList.add('image-clone');

// Position the clone exactly over the original
currentImgClone.style.position = 'absolute';
currentImgClone.style.top = '0';
currentImgClone.style.left = '0';
currentImgClone.style.width = '100%';
currentImgClone.style.height = '100%';

// Add transition class based on direction
currentImgClone.classList.add(direction === 'right' ? 'slide-fade-left' : 'slide-fade-right');

// Change the source of the original image
facilityImage.src = facilityImages[currentImageIndex];
facilityImage.classList.add('fade-in');

// Remove clone and reset classes after animation completes
setTimeout(() => {
    if (facilityPic.contains(currentImgClone)) {
    facilityPic.removeChild(currentImgClone);
    }
    facilityImage.classList.remove('fade-in');
    animationInProgress = false;
}, 800);
}

// Function to go to next image (for both arrow click and auto-rotation)
function nextImage() {
currentImageIndex = (currentImageIndex + 1) % facilityImages.length;
updateImage('right');
}

// Function to go to previous image
function prevImage() {
currentImageIndex = (currentImageIndex - 1 + facilityImages.length) % facilityImages.length;
updateImage('left');
}

// Function to set up auto-rotation
function startAutoRotate() {
autoRotateTimer = setInterval(nextImage, 6000); // 6 seconds
}

// Function to reset auto-rotation timer
function resetAutoRotate() {
if (autoRotateTimer) {
    clearInterval(autoRotateTimer);
}
startAutoRotate();
}

// Add click event to left arrow with debounce protection
leftArrow.addEventListener('click', () => {
if (!animationInProgress) {
    prevImage();
}
});

// Add click event to right arrow with debounce protection
rightArrow.addEventListener('click', () => {
if (!animationInProgress) {
    nextImage();
}
});

// Add subtle hover effects to arrows
leftArrow.classList.add('arrow-hover');
rightArrow.classList.add('arrow-hover');

// Initialize with the first image when the page loads
window.addEventListener('DOMContentLoaded', () => {
// Set the first image
facilityImage.src = facilityImages[0];

// Add a subtle entrance animation
facilityImage.classList.add('initial-fade');
setTimeout(() => {
    facilityImage.classList.remove('initial-fade');
}, 1200);

// Start the auto-rotation after initial load
startAutoRotate();
});

// Pause auto-rotation when user hovers over the carousel
facilityPic.addEventListener('mouseenter', () => {
clearInterval(autoRotateTimer);
autoRotateTimer = null;
});

// Resume auto-rotation when user leaves the carousel
facilityPic.addEventListener('mouseleave', () => {
if (!autoRotateTimer) {
    startAutoRotate();
}
});