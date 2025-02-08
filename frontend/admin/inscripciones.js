document.addEventListener('DOMContentLoaded', function () {
    const btnRevisar = document.getElementById("btnRevisar");
    const btnSoporte = document.getElementById("btnSoporte");
    const btnRevisarInscripcion = document.getElementById("button-revisar-inscripcion");
    const revisarInscripciones = document.getElementById("revisar-inscripciones");
    const respuestaRevisionInscripciones = document.getElementById("respuesta-revision-inscripciones");
    const soporteContent = document.getElementById("soporte-content");

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