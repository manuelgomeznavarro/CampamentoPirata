document.addEventListener('DOMContentLoaded', function () {
    const btnRevisar = document.getElementById("btnRevisar");
    const btnSoporte = document.getElementById("btnSoporte");
    const revisarInscripciones = document.getElementById("revisar-inscripciones");
    const soporteContent = document.getElementById("soporte-content");

    btnRevisar.addEventListener('click', function () {
        if (revisarInscripciones.style.display === "none") {
            revisarInscripciones.style.display = "block";
            soporteContent.style.display = "none";
            // listaMonitores.style.display = "none";
        } else {
            revisarInscripciones.style.display = "none";
        }
    });

    btnSoporte.addEventListener('click', function () {
        if (soporteContent.style.display === "none") {
            soporteContent.style.display = "block";
            revisarInscripciones.style.display = "none";
            // listaMonitores.style.display = "none";
        } else {
            soporteContent.style.display = "none";
        }
    });

});