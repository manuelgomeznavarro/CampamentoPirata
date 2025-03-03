document.addEventListener('DOMContentLoaded', () => {
    const incidentsForm = document.querySelector('.incident-form-container');

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
                    incidentsForm.style.display = "flex";

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


    const formIncidencia = document.querySelector('form');

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

    //Fetch para enviar la incidencia
    function enviarIncidencia(incidencia) {
        return fetch('http://127.0.0.1:8000/api/incidents', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(incidencia)
        })
            .then(response => {
                console.log(response);
                // if (!response.ok) {
                //     throw new Error('Error al crear la incidencia');
                // }
                return response.json();
            })
            .then(data => {
                console.log("Incidencia creada con éxito", data);
            })
            .catch(error => {
                console.error('Error al crear la incidencia', error);
            });

    }

    formIncidencia.addEventListener('submit', function (event) {
        event.preventDefault();


        const incidencia = {
            subject: document.getElementById('incident-subject').value,
            description: document.getElementById('incident-description').value,
            tutor_id: localStorage.getItem('role_id'),
            date: new Date(Date.now()).toISOString().split('T')[0],
            status: "Pending",
            admin_id: 2
        };
        console.log("", incidencia);
        enviarIncidencia(incidencia);
        // formIncidencia.reset();


        const finIncidencia = document.getElementById("finalizar-incidencia");
        const overlayIncidencia = document.getElementById("overlay-incidencia-correcta");
        const contenedorIncidenciaCorrecto = document.getElementById("incidencia-correcta-container");

        console.log("fufa fin incidencia");
        if (finIncidencia) {
            overlayIncidencia.style.display = "flex";
            contenedorIncidenciaCorrecto.style.display = "block";
            finIncidencia.addEventListener('click', function () {
                console.log("fufa?");
                formIncidencia.reset();
                // href = "../../index.html";
                overlayIncidencia.style.display = "none";
                contenedorIncidenciaCorrecto.style.display = "block";
            });
        }

        // };


    });


    // Aparición de las preguntas frecuentes

    const preguntas = document.querySelectorAll('.faq-card');

    preguntas.forEach(pregunta => {

        // const flecha = pregunta.querySelector('img');
        const respuesta = pregunta.querySelector('.faq-card-content-answer');
        pregunta.addEventListener('click', () => {
            pregunta.classList.toggle('open');

            // if (respuesta.style.display === 'none' || respuesta.style.display === '') {
            //     respuesta.style.display = 'block';
            // } else {
            //     respuesta.style.display = 'none';
            // }
        });
    });

    const monitorsCardsContainer = document.querySelector('.our-monitors-cards-container');

    fetch('http://127.0.0.1:8000/api/monitors')
        .then(response => {
            return response.json();
        })
        .then(monitors => {
            monitors.forEach(monitor => {
                const card = document.createElement('div');
                card.className = 'our-monitors-card';
                
                const mainFigure = document.createElement('figure');
                const mainImg = document.createElement('img');
                mainImg.src = monitor.url_pic;
                mainImg.alt = '';
                mainFigure.appendChild(mainImg);
                
                const content = document.createElement('div');
                content.className = 'monitor-content';
                
                const info = document.createElement('div');
                info.className = 'monitor-info';
                
                const title = document.createElement('h5');
                title.textContent = `${monitor.name} ${monitor.lastname}`;
                
                const description = document.createElement('p');
                description.textContent = monitor.description;
                
                info.append(title, description);
                
                // Separador
                const separator = document.createElement('hr');
                
                // Iconos sociales
                const socialContainer = document.createElement('div');
                socialContainer.className = "social-media-container";

                const socialIconLinkedin = document.createElement('a');
                socialIconLinkedin.href = "#";
                const iconImgLinkedin = document.createElement('img');
                iconImgLinkedin.src = 'https://campamento-tesoro-perdido-image-hosting.fra1.cdn.digitaloceanspaces.com/icons/linkedin_icon.png';
                iconImgLinkedin.alt = '';
                socialIconLinkedin.appendChild(iconImgLinkedin);
                socialContainer.appendChild(socialIconLinkedin);

                const socialIconInstagram = document.createElement('a');
                socialIconInstagram.href = "#";
                const iconImgInstagram = document.createElement('img');
                iconImgInstagram.src = 'https://campamento-tesoro-perdido-image-hosting.fra1.cdn.digitaloceanspaces.com/icons/instagram_icon.png';
                iconImgInstagram.alt = '';
                socialIconInstagram.appendChild(iconImgInstagram);
                socialContainer.appendChild(socialIconInstagram);

                const socialIconFacebook = document.createElement('a');
                socialIconFacebook.href = "#";
                const iconImgFacebook = document.createElement('img');
                iconImgFacebook.src = 'https://campamento-tesoro-perdido-image-hosting.fra1.cdn.digitaloceanspaces.com/icons/facebook_icon.png';
                iconImgFacebook.alt = '';
                socialIconFacebook.appendChild(iconImgFacebook);
                socialContainer.appendChild(socialIconFacebook);

                // Ensamblar estructura
                content.append(info, separator, socialContainer);
                card.append(mainFigure, content);

                monitorsCardsContainer.appendChild(card);
            })
        })
        .catch(error => {
            console.log(error);
        })
});