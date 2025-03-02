document.addEventListener('DOMContentLoaded', () => {
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

        const flecha = pregunta.querySelector('img');
        const respuesta = pregunta.querySelector('.faq-card-content-answer');
        flecha.addEventListener('click', () => {
            console.log("flechita");
            if (respuesta.style.display === 'none' || respuesta.style.display === '') {
                respuesta.style.display = 'block';
            } else {
                respuesta.style.display = 'none';
            }
        });
    });
});