document.addEventListener('DOMContentLoaded', () => {
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
            const inicio = document.getElementById("sign-in");
            const registrar = document.getElementById("sign-up");
        
            inicio.addEventListener('click', () => window.location.href = '../../index.html?showLogin=true');
            registrar.addEventListener('click', () => window.location.href = '../../index.html?showSignUp=true');
        }
    }

    checkRole();

    const editButton = document.getElementById('edit-button');
    const reportButton = document.getElementById('report-button');
    const volverButton = document.getElementById('volver-button');
    const contenedorEditar = document.getElementById('profile-container-global-editar');
    const contenedorPerfil = document.getElementById('profile-container-global');
    const contenedorReportes = document.getElementById('profile-container-global-reportes');
    const saveButton = document.getElementById('save-button');
    let childrenIds = [];

    reportButton.addEventListener('click', function () {
        if (contenedorReportes.style.display === "none") {
            contenedorReportes.style.display = "flex";
            contenedorEditar.style.display = "none";
            contenedorPerfil.style.display = "none";
            recibirIncidencias();
        } else {
            contenedorReportes.style.display = "none";
        }
    })

    editButton.addEventListener('click', function () {
        if (contenedorEditar.style.display === "none") {
            contenedorEditar.style.display = "flex";
            contenedorPerfil.style.display = "none";
            contenedorReportes.style.display = "none";
        } else {
            contenedorEditar.style.display = "none";
        }
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

    volverButton.addEventListener('click', function (event) {
        if (contenedorPerfil.style.display === "none") {
            contenedorPerfil.style.display = "flex";
            contenedorEditar.style.display = "none";
            contenedorReportes.style.display = "none";
        } else {
            contenedorPerfil.style.display = "none";
        }
    })

    const mostrarIncidencias = document.getElementById('mostrar-incidencias');

    function recibirIncidencias() {
        
        console.log("Está entrando");
        return fetch(`http://127.0.0.1:8000/api/incidents/show_incidents_by_tutor/${localStorage.getItem('role_id')}`)
            .then(response => { 
                if (!response.ok) {
                    throw new Error('Error al obtener datos');
                }
                return response.json();
            })
            .then(data => {
                mostrarIncidencias.innerHTML = "";

                console.log("Datos obtenidos con éxito", data);
                data.forEach((item, index) => {
                    console.log(`ID: ${item.id}, Asunto: ${item.subject}, Descripcion: ${item.description}, Estado: ${item.status}, Respuesta: ${item.admin_response}`);
                    console.log(index);

                    const incidencia = document.createElement("div");
                    const titulo = document.createElement("h3");
                    titulo.textContent = item.subject;
                    const description = document.createElement("p");
                    description.innerHTML = "<b>Descripción</b>: " + item.description;
                    const estado = document.createElement("p");
                    estado.innerHTML = "<b>Estado del reporte</b>: " + item.status;
                    const respuesta = document.createElement("p");
                    respuesta.innerHTML = "<b>Respuesta del Administrador</b>: " + (item.admin_response ?? 'Sin respuesta');
                    incidencia.appendChild(titulo);
                    incidencia.appendChild(description);
                    incidencia.appendChild(estado);
                    incidencia.appendChild(respuesta);
                    mostrarIncidencias.appendChild(incidencia);
                })
                // return data;
            })
            .catch(error => {
                console.error('Error al introducir datos', error);
            });
    };

    

    // function guardarDatos() {
    saveButton.addEventListener('click', async function (event) {
        event.preventDefault();

        const userData = {
            name: document.getElementById('editarNombreTutor').value,
            // emailTutor: document.getElementById('editarEmailTutor').value,
            phone: document.getElementById('telfTutor1').value,
            phone2: document.getElementById('telfTutor2').value,
            city: document.getElementById('location').value,
        };

        // const childData = {
        //     birthdate: document.getElementById(`editarFechaNacimiento`).value,
        //     alergy_intolerance: document.getElementById(`editarAlergias`).value,
        //     aditional_info: document.getElementById(`editarOtros`).value
        // };

        console.log(userData);

        try {
            await introducirDatos(userData);
            // const childId = await obtenerDatosNino();
            // await introducirDatosNino(childData, childId);

            for (const childId of childrenIds) {
                const childData = {
                    birthdate: document.getElementById(`editarFechaNacimiento-${childId}`).value,
                    alergy_intolerance: document.getElementById(`editarAlergias-${childId}`).value,
                    aditional_info: document.getElementById(`editarOtros-${childId}`).value
                };
                await introducirDatosNino(childData, childId);
            }
            // Recargar la página para actualizar los datos visibles
            window.location.reload();
        } catch (error) {
            console.error('Error al guardar los datos:', error);
        }
    });
    // }


    console.log("Role ID:", localStorage.getItem('role_id'));

    //Fetch información tutor
    fetch(`http://127.0.0.1:8000/api/tutors/${localStorage.getItem('role_id')}`)
        // TODO: Si da tiempo modificar los datos del monit:
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error `);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            
            document.title += ` ${data.name}`;
            document.getElementById("editarNombreTutor").value = data.name;
            document.getElementById("editarApellidosTutor").value = data.lastname;
            document.getElementById("telfTutor1").value = data.phone;
            document.getElementById("telfTutor2").value = data.phone2;
            document.getElementById("location").value = data.city;
            document.getElementById("profile-title").textContent = data.name + " " + data.lastname;
            document.querySelector(".profile-header img").src = data.url_pic;
            document.querySelector("#edit-header img").src = data.url_pic;
            document.getElementById("profile-email").textContent = data.email;
            document.getElementById("profile-phone1").textContent = data.phone;
            if (!data.phone2) {
                document.getElementById("profile-phone2").style.display = "none";
            } else {
                document.getElementById("profile-phone2").textContent = data.phone2;
            }
            if (!data.city) {
                document.getElementById("profile-location").style.display = "none";
            } else {
                document.getElementById("profile-location").textContent = data.city;
            }
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
        });


    // Fetch para obtener los datos de los tutores de la BBDD
    fetch(`http://127.0.0.1:8000/api/tutor/child_by_tutor/${localStorage.getItem('role_id')}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error `);
            }
            return response.json();
        })
        .then(data => {
            if (!data.success) {
                throw new Error(data.message);
            }
            if (!Array.isArray(data.children)) {
                throw new Error('La respuesta no contiene un array de niños');
            }
            data.children.forEach((item, index) => {
                const childrenCard = crearTarjetaAlumnoConDatos(item);
                const editChildrenCard = crearTarjetaAlumnoEditarConDatos(item);

                console.log(`ID: ${item.id}, Nombre: ${item.name}, Apellido: ${item.lastname}, DNI: ${item.dni}, Teléfono: ${item.phone}, Teléfono 2: ${item.phone2}, Admin2: ${item.admin_id}`);
                childrenCard.querySelector(".child-title").textContent = item.name + ' ' + item.lastname;
                childrenCard.querySelector(".info-fecha-nacimiento-child").textContent = item.birthdate;
                childrenCard.querySelector(".info-alergias-child").textContent = item.alergy_intolerance;
                childrenCard.querySelector(".info-otros-child").textContent = item.aditional_info;

                editChildrenCard.querySelector(".child-title").textContent = item.name + ' ' + item.lastname;
                editChildrenCard.querySelector(`#editarFechaNacimiento-${item.id}`).value = item.birthdate;
                editChildrenCard.querySelector(`#editarAlergias-${item.id}`).value = item.alergy_intolerance;
                editChildrenCard.querySelector(`#editarOtros-${item.id}`).value = item.aditional_info;

                // guardarDatos();

                // Almacenar el ID del niño
                childrenIds.push(item.id);
            });
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
        });

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
        const labelGrupo = document.createElement('label');
        labelGrupo.htmlFor = 'grupo-child';
        labelGrupo.textContent = 'Grupo:';
        childrenText.appendChild(labelGrupo);

        const grupoText = document.createTextNode('Pingüino Emperador');
        childrenText.appendChild(grupoText);

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

        // Agregar el texto del grupo al encabezado
        childrenCard.appendChild(childrenText);

        // Crear y agregar el botón de resumen semanal
        const weeklyButton = document.createElement('a');
        weeklyButton.href = 'progreso.html';
        weeklyButton.className = 'weekly-button';
        weeklyButton.textContent = 'Ver resumen semanal';
        childrenHeader.appendChild(weeklyButton);

        weeklyButton.addEventListener('click', function () {
            guardarDatosProgreso(item);
        });
        
        // Agregar la tarjeta al contenedor global de perfiles
        const childrenContainerCards = document.querySelector('.children-container-cards');
        childrenContainerCards.appendChild(childrenCard);

        // Devolver la tarjeta creada
        return childrenCard;
    }

    //Función para guardar los datos en sessionStorage y redirigir a la página de progreso
    function guardarDatosProgreso(item) {
        localStorage.setItem('child_id', item.id);
    }

    function crearTarjetaAlumnoEditarConDatos(item) {
        // Crear el contenedor principal de la tarjeta
        const editChildrenCard = document.createElement('div');
        editChildrenCard.className = 'children-card';
    
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
        childImage.src = item.url_pic || 'https://placehold.co/80x80';
        childImage.alt = '';
        childrenHeader.appendChild(childImage);
    
        // Agregar el encabezado al contenedor principal de la tarjeta
        editChildrenCard.appendChild(childrenHeader);
    
        // Crear el contenedor del contenido de la tarjeta
        const childrenText = document.createElement('div');
        childrenText.className = 'children-text';
    
        // Función auxiliar para crear un label y un input
        function crearCampo(labelText, inputType, inputId, placeholder = '') {
            const label = document.createElement('label');
            label.htmlFor = inputId;
            label.textContent = labelText;
            
            const input = document.createElement('input');
            input.type = inputType;
            input.name = inputId;
            input.id = inputId;
            input.className = 'editarPerfilAlumno';
            input.placeholder = placeholder;
            
            childrenText.appendChild(label);
            childrenText.appendChild(input);
        }
    
        // Agregar los campos editables
        crearCampo('Fecha de Nacimiento:', 'date', `editarFechaNacimiento-${item.id}`);
        crearCampo('Alergias/intolerancias:', 'text', `editarAlergias-${item.id}`, 'Alergias / Intolerancias');
        crearCampo('Otros:', 'text', `editarOtros-${item.id}`, 'Otros datos relevantes');
    
        // Agregar el grupo como texto plano
        const labelGrupo = document.createElement('label');
        labelGrupo.textContent = 'Grupo:';
        childrenText.appendChild(labelGrupo);
        
        const grupoText = document.createElement('p');
        grupoText.textContent = 'Pingüino Emperador';
        childrenText.appendChild(grupoText);
    
        // Agregar el contenido al contenedor principal de la tarjeta
        editChildrenCard.appendChild(childrenText);
    
        // Crear y agregar el botón de resumen semanal
        const weeklyButton = document.createElement('a');
        weeklyButton.href = 'progreso.html';
        weeklyButton.className = 'weekly-button';
        weeklyButton.textContent = 'Ver resumen semanal';
        editChildrenCard.appendChild(weeklyButton);
    
        // Agregar la tarjeta al contenedor global de perfiles
        const profileContainerGlobalEditar = document.querySelector('.edit-children-container-cards');
        profileContainerGlobalEditar.appendChild(editChildrenCard);
    
        // Devolver la tarjeta creada
        return editChildrenCard;
    }
    

    //FETCH Obtener datos niño
    // function obtenerDatosNino() {
    //     return fetch(`http://127.0.0.1:8000/api/inscriptions/`)
    //         .then(response => {
    //             if (!response.ok) {
    //                 throw new Error('Error al obtener datos');
    //             }
    //             return response.json();
    //         })
    //         .then(data => {
    //             for (let i = 0; i < data.length; i++) {
    //                 if (data[i].tutor_id == localStorage.getItem('role_id')) {
    //                     console.log("Datos obtenidos con éxito", data[i].child_id);
    //                     return data[i].child_id;
    //                 }
    //             }
    //             console.log("Datos obtenidos con éxito", data);
    //             // return data;
    //         })
    //         .catch(error => {
    //             console.error('Error al introducir datos', error);
    //         });
    // }

    //FETCH Editar datos niño
    function introducirDatosNino(childData, childId) {
        return fetch(`http://127.0.0.1:8000/api/children/${childId}`, {
            method: 'PUT', //Método para enviar los datos al servidor
            headers: {
                'Content-Type': 'application/json' //Envío de datos en formato JSON
            },
            body: JSON.stringify(childData) //Se convierte el objeto JS a una cadena JSON
        })
            .then(response => {
                console.log(response);
                if (!response.ok) {
                    throw new Error('Error al introducir datos');
                }
                return response.json();
            })
            .then(data => {
                console.log("Datos introducidos con éxito", data);
            })
            .catch(error => {
                console.error('Error al introducir datos', error);
            });
    }

    //FETCH Editar datos tutor
    function introducirDatos(userData) {
        return fetch(`http://127.0.0.1:8000/api/tutors/${localStorage.getItem('role_id')}`, {
            method: 'PUT', //Método para enviar los datos al servidor
            headers: {
                'Content-Type': 'application/json' //Envío de datos en formato JSON
            },
            body: JSON.stringify(userData) //Se convierte el objeto JS a una cadena JSON
        })
            .then(response => {
                console.log(response);
                if (!response.ok) {
                    throw new Error('Error al introducir datos');
                }
                return response.json();
            })
            .then(data => {
                console.log("Datos introducidos con éxito", data);
            })
            .catch(error => {
                console.error('Error al introducir datos', error);
            });
    }
});