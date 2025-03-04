// Get elements
const hamburgerMenu = document.getElementById('hamburger-menu');
const nav = document.querySelector('header nav');
const overlay = document.getElementById('overlay');
const headerBtnsContainer = document.querySelector('.header-btns-container');

// Function to check if mobile view is active
function isMobileView() {
    return window.innerWidth <= 992;
}

// Function to update DOM for responsive layout
function updateResponsiveLayout() {
    if (isMobileView()) {
        // Move buttons container into nav for mobile
        if (headerBtnsContainer.parentElement !== nav) {
            nav.appendChild(headerBtnsContainer);
        }
    } else {
        // Move buttons container back to header for desktop
        const header = document.querySelector('header');
        if (headerBtnsContainer.parentElement !== header) {
            header.appendChild(headerBtnsContainer);
        }
        
        // Reset mobile menu state
        hamburgerMenu.classList.remove('open');
        nav.classList.remove('open');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Initial setup
updateResponsiveLayout();

// Toggle mobile menu
hamburgerMenu.addEventListener('click', function() {
    hamburgerMenu.classList.toggle('open');
    nav.classList.toggle('open');
    overlay.classList.toggle('active');
    
    // Prevent body scrolling when menu is open
    document.body.style.overflow = hamburgerMenu.classList.contains('open') ? 'hidden' : '';
});

// Close menu when clicking overlay
overlay.addEventListener('click', function() {
    hamburgerMenu.classList.remove('open');
    nav.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
});

// Close menu when clicking a nav link
const navLinks = document.querySelectorAll('header nav ul li a');
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        if (isMobileView()) {
            hamburgerMenu.classList.remove('open');
            nav.classList.remove('open');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// Handle window resize
window.addEventListener('resize', updateResponsiveLayout);

// Original checkRole function
function checkRole() {
    const role = localStorage.getItem('role');

    if (role) {
        switch (role) {
            case 'tutor':
                const headerBtnsContainer = document.querySelector('.header-btns-container');
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

                tutorProfilePicContainer.addEventListener('click', () => {
                    location.assign('../perfil_tutor/perfil_tutor.html');
                });

                fetch(`http://127.0.0.1:8000/api/get_user_pic`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        role: localStorage.getItem('role'),
                        role_id: localStorage.getItem('role_id')
                    })
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
                    });

                tutorProfilePicContainer.appendChild(tutorProfilePic);

                headerBtnsContainer.innerHTML = "";
                headerBtnsContainer.appendChild(reservationBtn);
                headerBtnsContainer.appendChild(tutorProfilePicContainer);
                headerBtnsContainer.appendChild(btnSalir);
                break;

            case 'monitor':
                location.assign('./../monitor/html/dashboard.html');
                break;

            case 'admin':
                location.assign('./../admin/dashboard.html');
                break;

            default:
                break;
        }
    } else {
        const inicio = document.getElementById("sign-in");
        const registrar = document.getElementById("sign-up");
    
        inicio.addEventListener('click', () => window.location.href = '../index.html?showLogin=true');
        registrar.addEventListener('click', () => window.location.href = '../index.html?showSignUp=true');
    }
}

checkRole();

document.querySelector('.btn-home').addEventListener('click', () => {
    window.location.href = '../index.html';
});