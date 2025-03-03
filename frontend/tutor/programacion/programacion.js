document.addEventListener('DOMContentLoaded', () => {
    // Get elements
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const nav = document.querySelector('header nav');
    const overlay = document.getElementById('overlay');
    const headerBtnsContainer = document.querySelector('.header-btns-container');

    // Function to check if mobile view is active
    function isMobileView() {
        return window.innerWidth <= 767;
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
                        location.assign('./tutor/perfil_tutor/perfil_tutor.html');
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


    //Fetch para obtener los datos de las tarifas de la BBDD
    // Fetch para obtener los datos de las tarifas de la BBDD
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

                // Crear el elemento figure y la imagen
                const figure = document.createElement('figure');
                const img = document.createElement('img');
                img.src = item.url_pic;
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