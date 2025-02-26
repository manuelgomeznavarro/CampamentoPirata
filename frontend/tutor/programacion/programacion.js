document.addEventListener('DOMContentLoaded', function() {
    

    const registrarFooter = document.getElementById("registrar-footer");
    if (registrarFooter) {

        registrarFooter.addEventListener('click', function () {
            if (localStorage.getItem('role') == 'tutor') {
                window.location.href = '../inscripcion/inscripcion.html';
            } else {
                overlay_sign_in.style.display = "flex";
                contenedor_sign_in.style.display = "block";
            }
        });
    };
});