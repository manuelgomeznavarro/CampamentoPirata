document.addEventListener('DOMContentLoaded', function () {
    const btnCrearMonitores = document.getElementById("btnCrearMonitores");
    const btnGrupos = document.getElementById("btnGrupos");
    const btnListaMonitores = document.getElementById("btnListaMonitores");
    const btnCrearGrupo = document.getElementById("btnCrearGrupo");
    const formCrearMonitores = document.getElementById("form-crear-monitor");
    const grupos = document.getElementById("grupos");
    const listaMonitores = document.getElementById("lista-monitores");
    const creacionGrupo = document.getElementById("creacion-grupo");

    document.getElementById('logo-monitores-admin').addEventListener('click', function () {
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
    let defaultButton = document.getElementById('seccionMonitores-admin');
    //Agrego la clase 'activo' al botón Dashboard
    defaultButton.classList.add('activo');

    // document.querySelectorAll('.menu-item').forEach(function (boton) {
    //     // Agrego un evento 'click' a cada botón
    //     boton.addEventListener('click', function () {
    //         // Elimino la clase 'activo' de todos los botones
    //         // Esto es para que solo un botón tenga la clase 'activo' a la vez
    //         document.querySelectorAll('.menu-item').forEach(b => b.classList.remove('activo'));
    //         // Agrego la clase 'activo' al botón al que se le hizo click
    //         this.classList.add('activo');
    //         //Selecciono el elemento donde se muestra el título
    //         let titulo = document.getElementById('dashboard-title');
    //         // Cambio el texto del título por el texto del botón al que se le hizo click
    //         titulo.textContent = this.textContent;
    //     });
    // });

    btnCrearMonitores.addEventListener('click', function () {
        if (formCrearMonitores.style.display === "none") {
            formCrearMonitores.style.display = "flex";
            grupos.style.display = "none";
            listaMonitores.style.display = "none";
            creacionGrupo.style.display = "none";
        } else {
            formCrearMonitores.style.display = "none";
        }
    });

    btnGrupos.addEventListener('click', function () {
        if (grupos.style.display === "none") {
            grupos.style.display = "block";
            formCrearMonitores.style.display = "none";
            listaMonitores.style.display = "none";
            creacionGrupo.style.display = "none";
        } else {
            grupos.style.display = "none";
        }
    });

    btnListaMonitores.addEventListener('click', function () {
        if (listaMonitores.style.display === "none") {
            listaMonitores.style.display = "block";
            formCrearMonitores.style.display = "none";
            grupos.style.display = "none";
            creacionGrupo.style.display = "none";
        } else {
            listaMonitores.style.display = "none";
        }
    });

    btnCrearGrupo.addEventListener('click', function () {
        if (creacionGrupo.style.display === "none") {
            creacionGrupo.style.display = "flex";
            formCrearMonitores.style.display = "none";
            grupos.style.display = "none";
            listaMonitores.style.display = "none";
        } else {
            creacionGrupo.style.display = "none";
        }
    });
});