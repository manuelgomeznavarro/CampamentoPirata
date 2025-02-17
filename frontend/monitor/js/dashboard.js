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

    //Fetch para obtener la información de los alumnos
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



    //Fetch para crear el cronorama
    function registrarAsistencia(incidencia) {
        return fetch('http://127.0.0.1:8000/api/incidents', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(incidencia)
        })
            .then(response => {
                console.log(response);
                // if (!response.ok) {
                //     throw new Error('Error al crear la incidencia');
                // }
                return response.json();
            })
            .then(data => {
                console.log("Asistencia registrada con éxito", data);
            })
            .catch(error => {
                console.error('Error al crear la incidencia', error);
            });

    }

    //Fetch para enviar la asistencia al cronograma

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

    const times = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
    const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
    const activityTemplates = {
        'team-building': { notes: 'Actividad para fortalecer el trabajo en equipo' },
        'code-review': { notes: 'Revisión colaborativa de código' },
        'workshop': { notes: 'Sesión práctica de aprendizaje' }
    };

    function getWeekDates() {
        const today = new Date();
        const dayOfWeek = today.getDay();
        const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
        
        const weekDates = [];
        for (let i = 0; i < 5; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + mondayOffset + i);
            weekDates.push(date.toISOString().split('T')[0]);
        }
        return weekDates;
    }

    const dates = getWeekDates();
    const thead = document.querySelector('.timeline-table thead tr');
    const tbody = document.querySelector('.timeline-table tbody');
    const form = document.querySelector('.activity-form');
    const overlay = document.querySelector('.overlay');
    let selectedCell = null;
    const select = document.getElementById('existing-activities');
    const notes = document.getElementById('reuse-notes');
    const saveActivityBtn = document.querySelector('.save-activity');
    const closeActivityBtn = document.querySelector('.close-activity');



    // Inicializar encabezados
    dates.forEach((date, index) => {
        const dateObj = new Date(date);
        const th = document.createElement('th');
        th.textContent = `${days[index]} ${dateObj.getDate()}`;
        thead.appendChild(th);
    });

    // Inicializar tabla
    function initTimeline() {
        times.forEach(time => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${time}</td>`;
            
            dates.forEach(date => {
                const cell = document.createElement('td');
                cell.dataset.date = date;
                cell.dataset.time = time;
                cell.addEventListener('click', openForm);
                row.appendChild(cell);
            });
            
            tbody.appendChild(row);
        });
    }

    function openForm(event) {
        selectedCell = event.target;
        form.classList.add('active');
        overlay.classList.add('active');
        
        // Pre-llenar fechas/horas
        const dateValue = selectedCell.dataset.date;
        const timeValue = selectedCell.dataset.time;
        
        document.getElementById('activity-date').value = dateValue;
        document.getElementById('activity-time').value = timeValue;
        document.getElementById('reuse-date').value = dateValue;
        document.getElementById('reuse-time').value = timeValue;
        
        document.getElementById('activity-title').focus();
    }

    function closeForm() {
        form.classList.remove('active');
        overlay.classList.remove('active');
        selectedCell = null;
        resetForms();
    }

    function fillSelect() {

        fetch('http://127.0.0.1:8000/api/activities')
            .then(response => {
                // if (!response.ok) {
                //     throw new Error('Error al registrar el usuario');
                // }
                return response.json();
            })
            .then(data => {
                console.log("Información de las actividades recibida con éxito", data);

                for (let i = 0; i < data.length; i++) {
                    const option = document.createElement("option");
                    option.value = data[i].id;
                    option.textContent = data[i].name;
                    option.setAttribute('description', data[i].description);

                    select.appendChild(option);
                }
            })
            .catch(error => {
                console.error('Error al obtener información de las actividades', error);
            });
    }

    fillSelect();

    select.addEventListener('blur', (e) => {
        console.log(notes);
        
        notes.value = (e.target.options[e.target.options.selectedIndex].getAttribute('description'));
    });

    function saveActivity() {
        const isNewMode = document.querySelector('.mode-switch[data-mode="new"]').classList.contains('active');
        let title, notes, time;

        if(isNewMode) {
            title = document.getElementById('activity-title').value;
            notes = document.getElementById('activity-notes').value;
            time = document.getElementById('activity-time').value;

            fetch('http://127.0.0.1:8000/api/activities', {
                method: 'POST', //Método para enviar los datos al servidor
                headers: {
                    'Content-Type': 'application/json' //Envío de datos en formato JSON
                },
                body: JSON.stringify({
                    name: title,
                    description: notes
                }) //Se convierte el objeto JS a una cadena JSON
            })
                .then(response => {
                    // if (!response.ok) {
                    //     throw new Error('Error al registrar el usuario');
                    // }
                    return response.json();
                })
                .then(data => {
                    console.log("Actividad creada con éxito", data);
                })
                .catch(error => {
                    console.error('Error al crear la actividad', error);
                });
        } else {
            const selected = document.getElementById('existing-activities').value;
            title = document.getElementById('existing-activities').options[document.getElementById('existing-activities').selectedIndex].text;
            notes = document.getElementById('reuse-notes').value;
            time = document.getElementById('reuse-time').value;


        }

        if(title) {
            const activity = document.createElement('div');
            activity.className = 'existing-activity';
            activity.innerHTML = `
                <strong>${title}</strong>
                <div>${time}</div>
                ${notes ? `<small>${notes}</small>` : ''}
            `;
            selectedCell.appendChild(activity);
            closeForm();
        }
    }

    saveActivityBtn.addEventListener('click', saveActivity);
    closeActivityBtn.addEventListener('click', closeForm);

    


    function resetForms() {
        document.getElementById('activity-title').value = '';
        document.getElementById('activity-notes').value = '';
        document.getElementById('existing-activities').selectedIndex = 0;
        document.getElementById('reuse-notes').value = '';
        document.querySelectorAll('.mode-switch').forEach(btn => btn.classList.remove('active'));
        document.querySelector('.mode-switch[data-mode="new"]').classList.add('active');
        document.querySelectorAll('.form-content').forEach(form => {
            form.classList.remove('active');
            if(form.dataset.mode === 'new') form.classList.add('active');
        });
    }

    // Event listeners
    document.querySelectorAll('.mode-switch').forEach(button => {
        button.addEventListener('click', function(e) {
            document.querySelectorAll('.mode-switch').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            const mode = e.target.dataset.mode;
            document.querySelectorAll('.form-content').forEach(form => {
                form.classList.remove('active');
                if(form.dataset.mode === mode) form.classList.add('active');
            });
        });
    });

    document.getElementById('existing-activities').addEventListener('change', function() {
        const selected = this.value;
        document.getElementById('reuse-notes').value = activityTemplates[selected]?.notes || '';
    });

    overlay.addEventListener('click', closeForm);
    document.addEventListener('keydown', (e) => e.key === 'Escape' && closeForm());

    // Inicializar
    initTimeline();
});