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

                    const btnSalir = document.createElement('button');
                    const imgSalir = document.createElement('img');
                    imgSalir.src = 'https://campamento-tesoro-perdido-image-hosting.fra1.cdn.digitaloceanspaces.com/icons/logout-icon.png';
                    btnSalir.appendChild(imgSalir);

                    btnSalir.addEventListener('click', () => {
                        localStorage.removeItem('role');
                        localStorage.removeItem('role_id');
                        location.assign('../../index.html');
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

    })

    function recibirIncidencias() {
        
        console.log("Está entrando");
        return fetch(`http://127.0.0.1:8000/api/incidents/${localStorage.getItem('role_id')}`)
            .then(response => { 
                if (!response.ok) {
                    throw new Error('Error al obtener datos');
                }
                return response.json();
            })
            .then(data => {
                console.log("Datos obtenidos con éxito", data);
                data.forEach((item, index) => {
                    console.log(`ID: ${item.id}, Asunto: ${item.subject}, Descripcion: ${item.description}, Estado: ${item.status}, Respuesta: ${item.admin_response}`);
                    console.log(index);

                    const incidencia = document.createElement("div");
                    const titulo = document.createElement("h2");
                    titulo.textContent = item.subject;
                    const description = document.createElement("p");
                    description.textContent = item.description;
                    const estado = document.createElement("p");
                    estado.textContent = item.status;
                    const respuesta = document.createElement("p");
                    respuesta.textContent = item.admin_response;
                    incidencia.appendChild(titulo);
                    incidencia.appendChild(description);
                    incidencia.appendChild(estado);
                    incidencia.appendChild(respuesta);
                    contenedorReportes.appendChild(incidencia);

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
            document.title += ` ${data.name}`;
            document.getElementById("editarNombreTutor").value = data.name;
            document.getElementById("editarApellidosTutor").value = data.lastname;
            document.getElementById("telfTutor1").value = data.phone;
            document.getElementById("telfTutor2").value = data.phone2;
            document.getElementById("location").value = data.city;
            document.getElementById("profile-title").textContent = data.name + " " + data.lastname;
            document.getElementById("profile-email").textContent = data.email;
            document.getElementById("profile-phone1").textContent = data.phone;
            document.getElementById("profile-phone2").textContent = data.phone2;
            document.getElementById("profile-location").textContent = data.city;
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
        childImage.src = 'https://placehold.co/80x80';
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

        // Agregar el texto del grupo al encabezado
        childrenHeader.appendChild(childrenText);

        // Crear y agregar el botón de resumen semanal
        const weeklyButton = document.createElement('a');
        weeklyButton.href = 'progreso.html';
        weeklyButton.className = 'weekly-button';
        weeklyButton.textContent = 'Ver resumen semanal';
        childrenHeader.appendChild(weeklyButton);

        // Agregar el encabezado al contenedor principal de la tarjeta
        childrenCard.appendChild(childrenHeader);

        // Agregar la tarjeta al contenedor global de perfiles
        const profileContainerGlobal = document.getElementById('profile-container-global');
        profileContainerGlobal.appendChild(childrenCard);

        // Devolver la tarjeta creada
        return childrenCard;
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
        childImage.src = 'https://placehold.co/80x80';
        childImage.alt = '';
        childrenHeader.appendChild(childImage);

        // Crear y agregar el texto del grupo
        const childrenText = document.createElement('p');
        childrenText.className = 'children-text';

        // Crear y agregar el label y el input para la fecha de nacimiento
        const labelFechaNacimiento = document.createElement('label');
        labelFechaNacimiento.htmlFor = `editarFechaNacimiento-${item.id}`;
        labelFechaNacimiento.textContent = 'Fecha de Nacimiento:';
        childrenText.appendChild(labelFechaNacimiento);

        const inputFechaNacimiento = document.createElement('input');
        inputFechaNacimiento.type = 'date';
        inputFechaNacimiento.name = `editarFechaNacimiento-${item.id}`;
        inputFechaNacimiento.id = `editarFechaNacimiento-${item.id}`;
        inputFechaNacimiento.className = 'editarPerfilAlumno';
        childrenText.appendChild(inputFechaNacimiento);

        // Crear y agregar el label y el texto para el grupo
        const labelGrupo = document.createElement('label');
        labelGrupo.htmlFor = 'grupo-child';
        labelGrupo.textContent = 'Grupo:';
        childrenText.appendChild(labelGrupo);

        const grupoText = document.createTextNode('Pingüino Emperador');
        childrenText.appendChild(grupoText);

        // Crear y agregar el label y el input para las alergias
        const labelAlergias = document.createElement('label');
        labelAlergias.htmlFor = `editarAlergias-${item.id}`;
        labelAlergias.textContent = 'Alergias/intolerancias:';
        childrenText.appendChild(labelAlergias);

        const inputAlergias = document.createElement('input');
        inputAlergias.type = 'text';
        inputAlergias.name = `editarAlergias-${item.id}`;
        inputAlergias.id = `editarAlergias-${item.id}`;
        inputAlergias.className = 'editarPerfilAlumno';
        inputAlergias.placeholder = ' Alergias / Intolerancias';
        childrenText.appendChild(inputAlergias);

        // Crear y agregar el label y el input para otros datos
        const labelOtros = document.createElement('label');
        labelOtros.htmlFor = `editarOtros-${item.id}`;
        labelOtros.textContent = 'Otros:';
        childrenText.appendChild(labelOtros);

        const inputOtros = document.createElement('input');
        inputOtros.type = 'text';
        inputOtros.name = `editarOtros-${item.id}`;
        inputOtros.id = `editarOtros-${item.id}`;
        inputOtros.className = 'editarPerfilAlumno';
        inputOtros.placeholder = ' Otros datos relevantes';
        childrenText.appendChild(inputOtros);

        // Agregar el texto del grupo al encabezado
        childrenHeader.appendChild(childrenText);

        // Crear y agregar el botón de resumen semanal
        const weeklyButton = document.createElement('a');
        weeklyButton.href = 'progreso.html';
        weeklyButton.className = 'weekly-button';
        weeklyButton.textContent = 'Ver resumen semanal';
        childrenHeader.appendChild(weeklyButton);

        // Agregar el encabezado al contenedor principal de la tarjeta
        editChildrenCard.appendChild(childrenHeader);

        // Agregar la tarjeta al contenedor global de perfiles
        const profileContainerGlobalEditar = document.getElementById('profile-container-global-editar');
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