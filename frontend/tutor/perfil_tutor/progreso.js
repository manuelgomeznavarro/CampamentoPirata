document.addEventListener('DOMContentLoaded', function () {

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
                        location.assign('./perfil_tutor.html');
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
            location.assign('../../error/404.html');

            const inicio = document.getElementById("sign-in");
            const registrar = document.getElementById("sign-up");
        
            inicio.addEventListener('click', () => window.location.href = '../../index.html?showLogin=true');
            registrar.addEventListener('click', () => window.location.href = '../../index.html?showSignUp=true');
        }
    }

    checkRole();


    //Fetch información niño
    fetch(`http://127.0.0.1:8000/api/children/${localStorage.getItem('child_id')}`)
        // TODO: Si da tiempo modificar los datos del monit:
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error `);
            }
            return response.json();
        })
        .then(data => {
            console.log('Datos obtenidos:', data);
            const childrenCard = crearTarjetaAlumnoConDatos(data);
            const informeSemanalNombre = document.getElementById('informe-semanal-nombre');
            informeSemanalNombre.textContent = "INFORME SEMANAL DE " + data.name + ' ' + data.lastname;
            childrenCard.querySelector(".child-title").textContent = data.name + ' ' + data.lastname;
            childrenCard.querySelector(".info-fecha-nacimiento-child").textContent = data.birthdate;
            childrenCard.querySelector(".info-alergias-child").textContent = data.alergy_intolerance;
            childrenCard.querySelector(".info-otros-child").textContent = data.aditional_info;
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
        });

    //Fetch con los datos del niño seleccionado
    function crearTarjetaAlumnoConDatos(item) {
        // Crear el contenedor principal de la tarjeta
        const childrenCard = document.createElement('div');
        childrenCard.className = 'children-card';

        // Crear el contenedor del encabezado de la tarjeta
        const childrenHeader = document.createElement('div');
        childrenHeader.className = 'children-header';

        // Crear y agregar el título del niño
        const childTitle = document.createElement('p');
        childTitle.className = 'child-title';
        childTitle.id = 'child-title';
        childrenHeader.appendChild(childTitle);

        // Crear y agregar la imagen del niño
        const childImage = document.createElement('img');
        childImage.src = item.url_pic;
        childImage.alt = '';
        childrenHeader.appendChild(childImage);

        // Crear y agregar el texto del grupo
        const childrenText = document.createElement('p');
        childrenText.className = 'children-text';

        // Crear y agregar el label y el párrafo para la fecha de nacimiento
        const labelFechaNacimiento = document.createElement('label');
        labelFechaNacimiento.htmlFor = 'info-fecha-nacimiento-child';
        labelFechaNacimiento.textContent = 'Fecha de Nacimiento:';
        childrenText.appendChild(labelFechaNacimiento);

        const infoFechaNacimiento = document.createElement('p');
        infoFechaNacimiento.id = 'info-fecha-nacimiento-child';
        infoFechaNacimiento.className = 'info-fecha-nacimiento-child';
        childrenText.appendChild(infoFechaNacimiento);

        // Crear y agregar el label y el texto para el grupo
        // const labelGrupo = document.createElement('label');
        // labelGrupo.htmlFor = 'grupo-child';
        // labelGrupo.textContent = 'Grupo:';
        // childrenText.appendChild(labelGrupo);

        // const grupoText = document.createTextNode('Pingüino Emperador');
        // childrenText.appendChild(grupoText);

        // Crear y agregar el label y el párrafo para las alergias
        const labelAlergias = document.createElement('label');
        labelAlergias.htmlFor = 'info-alergias-child';
        labelAlergias.textContent = 'Alergias/intolerancias:';
        childrenText.appendChild(labelAlergias);

        const infoAlergias = document.createElement('p');
        infoAlergias.id = 'info-alergias-child';
        infoAlergias.className = 'info-alergias-child';
        childrenText.appendChild(infoAlergias);

        // Crear y agregar el label y el párrafo para otros datos
        const labelOtros = document.createElement('label');
        labelOtros.htmlFor = 'info-otros-child';
        labelOtros.textContent = 'Otros:';
        childrenText.appendChild(labelOtros);

        const infoOtros = document.createElement('p');
        infoOtros.id = 'info-otros-child';
        infoOtros.className = 'info-otros-child';
        childrenText.appendChild(infoOtros);


        // Agregar el encabezado al contenedor principal de la tarjeta
        childrenCard.appendChild(childrenHeader);
        childrenCard.appendChild(childrenText);

        // Agregar la tarjeta al contenedor global de perfiles
        const profileContainerGlobal = document.getElementById('info-card-nino');
        profileContainerGlobal.appendChild(childrenCard);

        // Devolver la tarjeta creada
        return childrenCard;
    }

    const comentariosMonitor = document.getElementById('comentaries-text');
    
    //Fetch con los comentarios del monitor
    fetch(`http://127.0.0.1:8000/api/attendances/comments/${localStorage.getItem('child_id')}`)
    
        // TODO: Si da tiempo modificar los datos del monit:
        .then(response => {
            // if (!response.ok) {
            //     throw new Error(`Error `);
            // }
            return response.json();
        })
        .then(data => {
            console.log('Datos obtenidos:', data);
            comentariosMonitor.textContent = data.comments;
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
        });

        //Fetch con la barra de progreso del niño
    fetch(`http://127.0.0.1:8000/api/attendances/bar/${localStorage.getItem('child_id')}`)
    
    // TODO: Si da tiempo modificar los datos del monit:
    .then(response => {
        // if (!response.ok) {
        //     throw new Error(`Error `);
        // }
        return response.json();
    })
    .then(data => {
        console.log('Asistencia obtenida:', data);
            const progressBar = document.getElementById('progress-bar');
            if (progressBar) {
                let totalAttendance = 0;
                    data.forEach(attendance => {
                        totalAttendance += attendance.attendance;
                    });
                console.log('Asistencia total:', totalAttendance);
                const progressPercentage = (totalAttendance / 20) * 100;
                progressBar.style.width = `${progressPercentage}%`;
                // Actualizar el color de la barra de progreso
                progressBar.classList.remove('low', 'medium', 'high');
                if (progressPercentage < 33) {
                    progressBar.classList.add('low');
                } else if (progressPercentage < 66) {
                    progressBar.classList.add('medium');
                } else {
                    progressBar.classList.add('high');
                }
            } else {
                console.error('Elemento con ID "progress-bar" no encontrado');
            }
    })
    .catch(error => {
        console.error('Error al obtener los datos:', error);
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