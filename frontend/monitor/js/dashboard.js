document.addEventListener('DOMContentLoaded', function () {

    const btnAsistencia = document.getElementById('btnAsistencia');
    const btnDashboard = document.getElementById('btnDashboard');
    const btnCronograma = document.getElementById('btnCronograma');
    const btnInfoGrupos = document.getElementById('btnInfoGrupos');
    const logoMonitor = document.getElementById('logo-monitor');
    const tablaAsistencia = document.getElementById('tablaAsistencia');
    const tablaCronograma = document.getElementById('tablaCronograma');
    const infoPerfil = document.getElementById('info-perfil');
    const infoGrupos = document.getElementById('info-grupos');
    const activityCard = document.getElementById('activity-card');
    const activityDescription = document.getElementsByClassName('activity-description');
    const dashBoardContentContainer = document.getElementById('dashboard-content-container');

    //Código para que al cargar la página, se seleccione el botón Dashboard
    let defaultButton = document.getElementById('btnDashboard');
    //Agrego la clase 'activo' al botón Dashboard
    defaultButton.classList.add('activo');
    let titulo = document.getElementById('dashboard-title');
    titulo.textContent = defaultButton.textContent;

    logoMonitor.addEventListener('click', function () {
        document.querySelectorAll('.menu-item').forEach(b => b.classList.remove('activo'));
        defaultButton.classList.add('activo');
        let titulo = document.getElementById('dashboard-title');
        titulo.textContent = defaultButton.textContent;

        if (dashBoardContentContainer.style.display === "none") {
            dashBoardContentContainer.style.display = "block";
            activityCard.style.display = "block";
            tablaAsistencia.style.display = "none";
            tablaCronograma.style.display = "none";
            infoGrupos.style.display = "none";
        }
    })

    btnInfoGrupos.addEventListener('click', function () {
        if (infoGrupos.style.display === "none") {
            infoGrupos.style.display = "block";
            activityCard.style.display = "none";
            tablaAsistencia.style.display = "none";
            tablaCronograma.style.display = "none";
            dashBoardContentContainer.style.display = "none";
        }
    })

    btnCronograma.addEventListener('click', function () {
        if (tablaCronograma.style.display === "none") {
            tablaCronograma.style.display = "block";
            activityCard.style.display = "none";
            tablaAsistencia.style.display = "none";
            dashBoardContentContainer.style.display = "none";
            infoGrupos.style.display = "none";
        }
    })

    btnDashboard.addEventListener('click', function () {
        if (dashBoardContentContainer.style.display === "none") {
            dashBoardContentContainer.style.display = "block";
            activityCard.style.display = "block";
            tablaAsistencia.style.display = "none";
            tablaCronograma.style.display = "none";
            infoGrupos.style.display = "none";
        }
    })

    btnAsistencia.addEventListener('click', function () {
        if (tablaAsistencia.style.display === "none") {
            tablaAsistencia.style.display = "block";
            activityCard.style.display = "none";
            dashBoardContentContainer.style.display = "none";
            tablaCronograma.style.display = "none";
            infoGrupos.style.display = "none";
        }
    })

    document.querySelectorAll('.info-perfil').forEach(function (elemento) {
        elemento.addEventListener('click', function () {
            let contacto = document.getElementById('contacto-alumno');
            if (window.getComputedStyle(contacto).display === "none") {
                contacto.style.display = "flex";
            } else {
                contacto.style.display = "none";
            }
        });
    });

    document.querySelectorAll('.editable').forEach(cell => {
        cell.addEventListener('click', () => {
            if (cell.innerHTML.trim() === "") {
                const input = document.createElement('input');
                input.type = 'text';
                input.placeholder = "Añadir actividad";

                cell.innerHTML = '';
                cell.appendChild(input);
                input.focus();

                input.addEventListener('blur', () => {
                    cell.innerHTML = input.value;
                });
                input.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        cell.innerHTML = input.value;
                    }
                });
            }
        });
    })

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

    document.querySelectorAll('.asistencia').forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            let nombre = this.closest('tr').querySelector('td').innerText;
            let estado = this.checked ? "Presente" : "Ausente";
            console.log(`${nombre}: ${estado}`);
        });
    });

});