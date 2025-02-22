document.addEventListener('DOMContentLoaded', function () {
    const btnRevisar = document.getElementById("btnRevisar");
    const btnSoporte = document.getElementById("btnSoporte");
    const btnRevisarInscripcion = document.getElementById("button-revisar-inscripcion");
    const revisarInscripciones = document.getElementById("revisar-inscripciones");
    const respuestaRevisionInscripciones = document.getElementById("respuesta-revision-inscripciones");
    const soporteContent = document.getElementById("soporte-content");
    const divIncidenciasPendientes = document.getElementById("incidencia-pendiente");

    document.getElementById('logo-inscripciones').addEventListener('click', function () {
        window.location.href = '../admin/dashboard.html';
    });

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

    document.getElementById('excursiones-admin').addEventListener('click', function () {
        window.location.href = '../admin/excursionesyactividades.html';
    });

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

    btnRevisar.addEventListener('click', function () {
        if (revisarInscripciones.style.display === "none") {
            revisarInscripciones.style.display = "block";
            soporteContent.style.display = "none";
            respuestaRevisionInscripciones.style.display = "none";
            divIncidenciasPendientes.style.display = "none";
        } else {
            revisarInscripciones.style.display = "none";
        }
    });

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

    btnSoporte.addEventListener('click', function () {
        if (divIncidenciasPendientes.style.display === "none") {
            soporteContent.style.display = "none";
            revisarInscripciones.style.display = "none";
            respuestaRevisionInscripciones.style.display = "none";
            divIncidenciasPendientes.style.display = "block";
            mostrarIncidencias();
            divIncidenciasPendientes.innerText = "";
        } else {
            divIncidenciasPendientes.style.display = "none";
        }
    });


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
    
});