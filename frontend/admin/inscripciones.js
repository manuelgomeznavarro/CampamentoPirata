document.addEventListener('DOMContentLoaded', function () {
    const btnRevisar = document.getElementById("btnRevisar");
    const btnSoporte = document.getElementById("btnSoporte");
    const btnRevisarInscripcion = document.getElementById("button-revisar-inscripcion");
    const revisarInscripciones = document.getElementById("revisar-inscripciones");
    const respuestaRevisionInscripciones = document.getElementById("respuesta-revision-inscripciones");
    const soporteContent = document.getElementById("soporte-content");
    const divIncidenciasPendientes = document.getElementById("incidencia-pendiente");
    const divIncidenciasResuelta = document.getElementById("incidencia-resuelta");
    const btnInscripcionesResueltas = document.getElementById("btn-inscripciones-resueltas");


    const headerBtnsContainer = document.querySelector('.dashboard-profile');
    const btnSalir = document.createElement('button');
    const imgSalir = document.createElement('img');
    imgSalir.src = 'https://campamento-tesoro-perdido-image-hosting.fra1.cdn.digitaloceanspaces.com/icons/logout-icon.png';
    btnSalir.appendChild(imgSalir);

    btnSalir.addEventListener('click', () => {
        localStorage.removeItem('role');
        localStorage.removeItem('role_id');
        location.assign('../index.html');
    });
    headerBtnsContainer.appendChild(btnSalir);

    function checkRole() {
        const role = localStorage.getItem('role');

        if (role) {
            switch (role) {
                case 'tutor':
                    location.assign('../index.html');

                    break;

                case 'monitor':
                    location.assign('./monitor/html/dashboard.html');

                    break;

                case 'admin':
                    // location.assign('./admin/dashboard.html');
                    const profilePic = document.querySelector('.user-avatar img');

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
                                profilePic.src = data.url;
                            } else {
                                profilePic.src = "https://campamento-tesoro-perdido-image-hosting.fra1.cdn.digitaloceanspaces.com/icons/default-profile.png";
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        })

                    break;

                default:
                    break;
            }
        }
    }

    checkRole();

    const nombreAdmin = document.querySelector('.user-name');

    fetch(`http://127.0.0.1:8000/api/admins/${localStorage.getItem('role_id')}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            nombreAdmin.textContent = `${data.name} ${data.lastname}`;
        })
        .catch(error => {
            console.log(error);
        })

    // document.getElementById('logo-inscripciones').addEventListener('click', function () {
    //     window.location.href = '../admin/dashboard.html';
    // });

    document.getElementById('dashboard-admin').addEventListener('click', function () {
        window.location.href = '../admin/dashboard.html';
    });

    document.getElementById('gestionPago-admin').addEventListener('click', function () {
        window.location.href = '../admin/gestionpagos.html';
    });

    document.getElementById('seccionMonitores-admin').addEventListener('click', function () {
        window.location.href = '../admin/monitores.html';
    });

    document.getElementById('inscripcionesRegistros-admin').addEventListener('click', function () {
        window.location.href = '../admin/inscripcionesyregistros.html';
    });

    // document.getElementById('excursiones-admin').addEventListener('click', function () {
    //     window.location.href = '../admin/excursionesyactividades.html';
    // });

    //Código para que al cargar la página, se seleccione el botón Dashboard
    let defaultButton = document.getElementById('inscripcionesRegistros-admin');
    //Agrego la clase 'activo' al botón Dashboard
    defaultButton.classList.add('activo');


    document.querySelectorAll('.button-options').forEach(function (boton) {
        // Agrego un evento 'click' a cada botón
        boton.addEventListener('click', function () {

            if (this.classList.contains('activo')) {
                boton.classList.remove('activo');
            } else {
                // Elimino la clase 'activo' de todos los botones
                // Esto es para que solo un botón tenga la clase 'activo' a la vez
                document.querySelectorAll('.button-options').forEach(b => b.classList.remove('activo'));
                // Agrego la clase 'activo' al botón al que se le hizo click
                this.classList.add('activo');
            }
        });
    });

    document.querySelectorAll('.menu-item').forEach(function (boton) {
        // Agrego un evento 'click' a cada botón
        boton.addEventListener('click', function () {
            // Elimino la clase 'activo' de todos los botones
            // Esto es para que solo un botón tenga la clase 'activo' a la vez
            document.querySelectorAll('.menu-item').forEach(b => b.classList.remove('activo'));
            // Agrego la clase 'activo' al botón al que se le hizo click
            this.classList.add('activo');
            //Selecciono el elemento donde se muestra el título
            let titulo = document.getElementById('dashboard-title');
            // Cambio el texto del título por el texto del botón al que se le hizo click
            titulo.textContent = this.textContent;

        });
    });

    // btnRevisar.addEventListener('click', function () {
    //     if (revisarInscripciones.style.display === "none") {
    //         revisarInscripciones.style.display = "block";
    //         soporteContent.style.display = "none";
    //         respuestaRevisionInscripciones.style.display = "none";
    //         divIncidenciasPendientes.style.display = "none";
    //     } else {
    //         revisarInscripciones.style.display = "none";
    //     }
    // });

    btnRevisarInscripcion.addEventListener('click', function () {
        if (respuestaRevisionInscripciones.style.display === "none") {
            respuestaRevisionInscripciones.style.display = "flex";
            soporteContent.style.display = "none";
            revisarInscripciones.style.display = "none";
            divIncidenciasPendientes.style.display = "none";
        } else {
            respuestaRevisionInscripciones.style.display = "none";
        }
    });

    // mostrarIncidencias();

    // document.getElementById('inscripcionesRegistros-admin').addEventListener('click', function () {
    //     if (divIncidenciasPendientes.style.display === "none") {
    //         // soporteContent.style.display = "none";
    //         // revisarInscripciones.style.display = "none";
    //         // respuestaRevisionInscripciones.style.display = "none";
    //         // divIncidenciasPendientes.style.display = "block";
    //         // // mostrarIncidencias();
    //         // divIncidenciasPendientes.innerText = "Incidencias Pendientes";
    //         // // Crear el botón "Inscripciones Resueltas"
    //         // const btnInscripcionesResueltas = document.createElement('button');
    //         // btnInscripcionesResueltas.className = 'button-crear-grupo';
    //         // btnInscripcionesResueltas.id = 'btn-inscripciones-resueltas';
    //         // btnInscripcionesResueltas.textContent = 'Inscripciones Resueltas';

    //         // Agregar el botón al contenedor correspondiente
    //         // divIncidenciasPendientes.appendChild(btnInscripcionesResueltas);

    //         // Agregar el evento click al botón después de crearlo
    //         const btnInscripcionesResueltas = document.getElementById('btn-inscripciones-resueltas');
    //         btnInscripcionesResueltas.addEventListener('click', function () {
    //             if (divIncidenciasResuelta.style.display === "none") {
    //                 divIncidenciasResuelta.style.display = "block";
    //                 divIncidenciasPendientes.style.display = "none";
    //                 mostrarIncidenciasResueltas();
    //                 const btnVolverIncidencias = document.createElement('button');
    //                 btnVolverIncidencias.id = 'btn-volver-incidencias';
    //                 btnVolverIncidencias.className = 'button-crear-grupo';
    //                 btnVolverIncidencias.textContent = 'Volver a Incidencias';
    //                 divIncidenciasPendientes.appendChild(btnVolverIncidencias);

    //                 btnVolverIncidencias.addEventListener('click', function () {
    //                     if (divIncidenciasPendientes.style.display === "none") {
    //                         divIncidenciasPendientes.style.display = "block";
    //                         divIncidenciasResuelta.style.display = "none";
    //                         divIncidenciasResuelta.innerText = "Inscripciones Resueltas";
    //                     } else {
    //                         divIncidenciasPendientes.style.display = "none";
    //                     }
    //                 });
    //             } else {
    //                 divIncidenciasResuelta.style.display = "none";
    //             }
    //             // divIncidenciasResuelta.innerText = "";

    //         });
    //     } else {
    //         divIncidenciasPendientes.style.display = "none";
    //     }
    // });

    mostrarIncidencias();

    btnInscripcionesResueltas.addEventListener('click', function () {
        if (divIncidenciasResuelta.style.display === "none") {
            divIncidenciasResuelta.style.display = "block";
            divIncidenciasPendientes.style.display = "none";
            limpiarIncidenciasResueltas();
            mostrarIncidenciasResueltas();
        } else {
            divIncidenciasResuelta.style.display = "none";
        }
    });

    const btnVolverIncidencias = document.createElement('button');
    btnVolverIncidencias.id = 'btn-volver-incidencias';
    btnVolverIncidencias.className = 'button-crear-grupo';
    btnVolverIncidencias.textContent = 'Volver a Incidencias';
    divIncidenciasResuelta.appendChild(btnVolverIncidencias);

    btnVolverIncidencias.addEventListener('click', function () {
        if (divIncidenciasPendientes.style.display === "none") {
            divIncidenciasPendientes.style.display = "block";
            divIncidenciasResuelta.style.display = "none";
            // divIncidenciasResuelta.innerText = "Inscripciones Resueltas";
        } else {
            divIncidenciasPendientes.style.display = "none";
        }
    });

    function limpiarIncidenciasResueltas() {
        const elementos = divIncidenciasResuelta.querySelectorAll('.incidenciaResuelta');
        elementos.forEach(elemento => elemento.remove());
    }

    //Fetch de incidencias
    // const admin_id = localStorage.getItem('admin_id');
    function mostrarIncidencias() {
        fetch(`http://127.0.0.1:8000/api/incidents`)
            .then(response => response.json())
            .then(incidenciaData => {
                //Creación de elementos HTML
                console.log(incidenciaData);
                incidenciaData.forEach(incidencia => {
                    if (incidencia.status === 'Pending') {
                        console.log('holaa');
                        console.log(incidencia);
                        const divIncidencia = document.createElement('div');
                        divIncidencia.classList.add('incidencia');

                        //Agrego título de la incidencia
                        divIncidencia.innerHTML = `<h3>${incidencia.subject}</h3><p>Motivo: ${incidencia.description}</p>`;

                        //Agrego el div de cada incidencia al div principal
                        divIncidenciasPendientes.appendChild(divIncidencia);

                        divIncidencia.addEventListener('click', function () {

                            if (soporteContent.style.display === "none") {
                                soporteContent.style.display = "block";
                                revisarInscripciones.style.display = "none";
                                respuestaRevisionInscripciones.style.display = "none";
                                divIncidenciasPendientes.style.display = "none";
                                document.getElementById("resumen-incidencia").innerHTML = `<h3>${incidencia.subject}</h3><p>Motivo: ${incidencia.description}</p>`;

                                document.getElementById("btn-responder-incidencia").addEventListener('click', function (event) {
                                    event.preventDefault();
                                    const respuesta = document.getElementById("respuesta-soporte").value;
                                    console.log(respuesta);
                                    const respuestaData = {
                                        subject: incidencia.subject,
                                        description: incidencia.description,
                                        date: incidencia.date,
                                        status: 'Resolved',
                                        admin_response: respuesta,
                                        tutor_id: incidencia.tutor_id,
                                        admin_id: incidencia.admin_id,
                                        // admin_id: localStorage.getItem('role_id')
                                    };
                                    console.log(respuestaData);
                                    // actualizarIncidencia(incidencia.id);
                                    actualizarIncidencia(incidencia.id, respuestaData);
                                });
                            } else {
                                soporteContent.style.display = "none";
                            }
                        });
                    }

                });
            })
            .catch(error => {
                // Si ocurre un error con el fetch, mostrar un mensaje en la consola
                console.error('Error al obtener las incidencias:', error);
            });
    }

    function actualizarIncidencia(incidencia_id, respuestaData) {
        fetch(`http://127.0.0.1:8000/api/incidents/${incidencia_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(respuestaData)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }

    function mostrarIncidenciasResueltas() {
        fetch(`http://127.0.0.1:8000/api/incidents`)
            .then(response => response.json())
            .then(incidenciaData => {
                //Creación de elementos HTML
                console.log(incidenciaData);
                incidenciaData.forEach(incidencia => {
                    if (incidencia.status === 'Resolved') {
                        console.log('holaa');
                        console.log(incidencia);
                        const divIncidenciaResuelta = document.createElement('div');
                        divIncidenciaResuelta.classList.add('incidenciaResuelta');

                        //Agrego título de la incidencia
                        divIncidenciaResuelta.innerHTML = `<h3>${incidencia.subject}</h3><p>Motivo: ${incidencia.description}</p><p>Respuesta: ${incidencia.admin_response}</p>`;

                        //Agrego el div de cada incidencia al div principal
                        divIncidenciasResuelta.appendChild(divIncidenciaResuelta);

                        // divIncidenciaResuelta.addEventListener('click', function () {

                        //     if (soporteContent.style.display === "none") {
                        //         soporteContent.style.display = "block";
                        //         revisarInscripciones.style.display = "none";
                        //         respuestaRevisionInscripciones.style.display = "none";
                        //         divIncidenciasPendientes.style.display = "none";
                        //         document.getElementById("resumen-incidencia").innerHTML = `<h3>${incidencia.subject}</h3><p>Motivo: ${incidencia.description}</p>`;

                        //     } else {
                        //         soporteContent.style.display = "none";
                        //     }
                        // });
                    }

                });
            })
            .catch(error => {
                // Si ocurre un error con el fetch, mostrar un mensaje en la consola
                console.error('Error al obtener las incidencias:', error);
            });
    }
});