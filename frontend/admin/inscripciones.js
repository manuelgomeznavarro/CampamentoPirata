document.addEventListener('DOMContentLoaded', function () {
    const btnRevisar = document.getElementById("btnRevisar");
    const btnSoporte = document.getElementById("btnSoporte");
    const btnRevisarInscripcion = document.getElementById("button-revisar-inscripcion");
    const revisarInscripciones = document.getElementById("revisar-inscripciones");
    const respuestaRevisionInscripciones = document.getElementById("respuesta-revision-inscripciones");
    const soporteContent = document.getElementById("soporte-content");

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
        } else {
            revisarInscripciones.style.display = "none";
        }
    });

    btnRevisarInscripcion.addEventListener('click', function () {
        if (respuestaRevisionInscripciones.style.display === "none") {
            respuestaRevisionInscripciones.style.display = "flex";
            soporteContent.style.display = "none";
            revisarInscripciones.style.display = "none";
        } else {
            respuestaRevisionInscripciones.style.display = "none";
        }
    });

    btnSoporte.addEventListener('click', function () {
        if (soporteContent.style.display === "none") {
            soporteContent.style.display = "block";
            revisarInscripciones.style.display = "none";
            respuestaRevisionInscripciones.style.display = "none";
        } else {
            soporteContent.style.display = "none";
        }
    });

});