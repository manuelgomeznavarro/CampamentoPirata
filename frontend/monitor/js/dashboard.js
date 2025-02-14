document.addEventListener('DOMContentLoaded', function () {

    const btnAsistencia = document.getElementById('btnAsistencia');
    const btnDashboard = document.getElementById('btnDashboard');
    const btnCronograma = document.getElementById('btnCronograma');
    const btnInfoGrupos = document.getElementById('btnInfoGrupos');
    const logoMonitor = document.getElementById('logo-monitor');
    const tablaAsistenciaContenedor = document.getElementById('tablaAsistencia');
    const tablaCronograma = document.getElementById('tablaCronograma');
    const infoPerfil = document.getElementById('info-perfil');
    const infoGrupos = document.getElementById('info-grupos');
    const activityCard = document.getElementById('activity-card');
    const activityDescription = document.getElementsByClassName('activity-description');
    const dashBoardContentContainer = document.getElementById('dashboard-content-container');
    const tablaAsistencia = document.querySelector("#tablaAsistencia table tbody");


    fetch('http://127.0.0.1:8000/api/children/groupByMonitor', {
        method: 'POST', //Método para enviar los datos al servidor
        headers: {
            'Content-Type': 'application/json' //Envío de datos en formato JSON
        },
        body: JSON.stringify({ monitor_id: localStorage.getItem('role_id') }) //Se convierte el objeto JS a una cadena JSON
    })
        .then(response => {
            // if (!response.ok) {
            //     throw new Error('Error al registrar el usuario');
            // }
            return response.json();
        })
        .then(data => {
            console.log("Información del alumno recibida con éxito", data);

            for (let i = 0; i < data.children.length; i++) {
                let elementoTabla = document.createElement("tr");
                elementoTabla.className = "table-column";

                let elementoCheckBox = document.createElement("td");
                elementoCheckBox.className = "table-row";
                
                let elementoNombre = document.createElement("td");
                elementoNombre.className = "table-name-row";
                elementoNombre.textContent = data.children[i].name + " " + data.children[i].lastname;

                let elementoListaCheckbox = document.createElement("input");
                elementoListaCheckbox.className = "asistencia";
                elementoListaCheckbox.type = "checkbox";
                
                elementoCheckBox.appendChild(elementoListaCheckbox);
                elementoTabla.appendChild(elementoNombre);
                elementoTabla.appendChild(elementoCheckBox);
                tablaAsistencia.appendChild(elementoTabla);
            }
        })
        .catch(error => {
            console.error('Error al obtener información del alumno', error);
        });

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
            tablaAsistenciaContenedor.style.display = "none";
            tablaCronograma.style.display = "none";
            infoGrupos.style.display = "none";
        }
    })

    btnInfoGrupos.addEventListener('click', function () {
        if (infoGrupos.style.display === "none") {
            infoGrupos.style.display = "block";
            activityCard.style.display = "none";
            tablaAsistenciaContenedor.style.display = "none";
            tablaCronograma.style.display = "none";
            dashBoardContentContainer.style.display = "none";
        }
    })

    btnCronograma.addEventListener('click', function () {
        if (tablaCronograma.style.display === "none") {
            tablaCronograma.style.display = "block";
            activityCard.style.display = "none";
            tablaAsistenciaContenedor.style.display = "none";
            dashBoardContentContainer.style.display = "none";
            infoGrupos.style.display = "none";
        }
    })

    btnDashboard.addEventListener('click', function () {
        if (dashBoardContentContainer.style.display === "none") {
            dashBoardContentContainer.style.display = "block";
            activityCard.style.display = "block";
            tablaAsistenciaContenedor.style.display = "none";
            tablaCronograma.style.display = "none";
            infoGrupos.style.display = "none";
        }
    })

    btnAsistencia.addEventListener('click', function () {
        if (tablaAsistenciaContenedor.style.display === "none") {
            tablaAsistenciaContenedor.style.display = "block";
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