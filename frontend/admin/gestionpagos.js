document.addEventListener('DOMContentLoaded', function () {

    const btnPagos = document.getElementById('btnPagos');
    const btnTarifas = document.getElementById('btnTarifas');
    const btnDescuentos = document.getElementById('btnDescuentos');
    const infoPagos = document.getElementById('info-pagos');
    const infoTarifas = document.getElementById('info-tarifas');
    const infoDescuentos = document.getElementById('info-descuentos');
    const menuContent = document.getElementById('menu-content');
    btnPagos.addEventListener('click', function () {
        if (infoPagos.style.display === "none") {
            infoPagos.style.display = "block";
            infoTarifas.style.display = "none";
            menuContent.style.display = "block";
            infoDescuentos.style.display = "none";
        } else {
            infoPagos.style.display = "none";
        }
    });
    btnTarifas.addEventListener('click', function () {
        if (infoTarifas.style.display === "none") {
            infoTarifas.style.display = "block";
            infoPagos.style.display = "none";
            menuContent.style.display = "none";
            infoDescuentos.style.display = "none";
        } else {
            infoTarifas.style.display = "none";
        }
    });
    btnDescuentos.addEventListener('click', function () {
        if (infoDescuentos.style.display === "none") {
            infoDescuentos.style.display = "block";
            infoTarifas.style.display = "none";
            menuContent.style.display = "block";
            infoPagos.style.display = "none";
        } else {
            infoDescuentos.style.display = "none";
        }
    });

    document.getElementById('logo-gestionPagos').addEventListener('click', function () {
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
    let defaultButton = document.getElementById('gestionPago-admin');
    //Agrego la clase 'activo' al botón Dashboard
    defaultButton.classList.add('activo');

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

});