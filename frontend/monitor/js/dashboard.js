document.addEventListener('DOMContentLoaded', function () {

    function checkRole() {
        const role = localStorage.getItem('role');

        if (role) {
            switch (role) {
                case 'tutor':
                    location.assign('../../index.html');

                    break;

                case 'monitor':

                    break;

                case 'admin':
                    location.assign('../../admin/dashboard.html');
                    break;

                default:
                    break;
            }
        }
    }

    checkRole();

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
    const dashBoardContentContainer = document.getElementById('dashboard-content-container');
    const tablaAsistencia = document.querySelector("#tablaAsistencia table tbody");
    const pasarListaBtn = document.querySelector(".pasar-lista");
    let wasDataStoredInDB = false;
    const nombreMonitor = document.querySelector('.user-name');
    const activityTitle = document.querySelector('.activity-title');
    const activityTime = document.querySelector('.activity-time');
    const activityDescription = document.querySelector('.activity-description');
    const childrenProfilesContainer = document.querySelector('.contenedor-perfiles');
    const tutorPhone = document.querySelector('.tutor-phone');
    const tutorEmail = document.querySelector('.tutor-email');
    const nombreGrupo = document.querySelector('.nombre-grupos');
    const userAvatar = document.querySelector('.user-avatar img');

    const headerBtnsContainer = document.querySelector('.dashboard-profile');
    const btnSalir = document.createElement('button');
    btnSalir.className = "exit-button";

    const imgSalir = document.createElement('img');
    imgSalir.src = 'https://campamento-tesoro-perdido-image-hosting.fra1.cdn.digitaloceanspaces.com/icons/logout-icon2.png';
    btnSalir.appendChild(imgSalir);

    btnSalir.addEventListener('click', () => {
        localStorage.removeItem('role');
        localStorage.removeItem('role_id');
        location.assign('../../index.html');
    });
    headerBtnsContainer.appendChild(btnSalir);

    fetch(`http://127.0.0.1:8000/api/get_user_pic`, {
        method: 'POST', //Método para enviar los datos al servidor
        headers: {
            'Content-Type': 'application/json' //Envío de datos en formato JSON
        },
        body: JSON.stringify({
            role: localStorage.getItem('role'),
            role_id: localStorage.getItem('role_id')
        }) //Se convierte el objeto JS a una cadena JSON
    })
        .then(response => {
            return response.json();
        })
        .then(data => {
            if (data.url) {
                userAvatar.src = data.url;
            }
        })

    fetch(`http://127.0.0.1:8000/api/monitors/${localStorage.getItem('role_id')}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            nombreMonitor.textContent = `${data.name} ${data.lastname}`;
        })
        .catch(error => {
            console.log(error);
        })

    fetch(`http://127.0.0.1:8000/api/groups/${localStorage.getItem('role_id')}`)
        .then(response => {
            return response.json();
        })
        .then(group => {
            nombreGrupo.textContent = group.name;
        })
        .catch(error => {
            console.log(error);
        })

    fetch(`http://127.0.0.1:8000/api/get_current_activity/${localStorage.getItem('role_id')}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            if (data.activity_details && data.activity_timeline) {
                activityTitle.innerText = data.activity_details.name;
                activityTime.innerText = `${data.activity_details.start_time.slice(0, 5)} / ${data.activity_details.end_time.slice(0, 5)}`
                activityDescription.innerText = data.activity_details.description;
            }
        })
        .catch(error => {
            console.log(error);
        })


    //Fetch para obtener la información de los alumnos
    fetch('http://127.0.0.1:8000/api/children/group_by_monitor', {
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

            data.children.forEach(child => {
                console.log(child);
                const div = document.createElement("div");
                div.className = "info-perfil";
                div.id = "info-perfil";
                div.setAttribute('child_id', child.id);
                div.setAttribute('tutor_phone', child.tutor_phone);
                div.setAttribute('tutor_email', child.tutor_email);
                div.setAttribute('tutor_id', child.tutor_id);

                const img = document.createElement("img");
                img.src = child.url_pic;
                img.alt = "fotoAlumno";

                div.appendChild(img);

                const p = document.createElement("p");
                p.textContent = `${child.name} ${child.lastname}`;

                div.appendChild(p);

                childrenProfilesContainer.appendChild(div);

                div.addEventListener('click', () => {
                    document.querySelectorAll('.info-perfil').forEach(profile => profile.classList.remove('selected'));
                    div.classList.add('selected');
                });

                // const btnEnviarComentarios = document.getElementById('enviar-comentarios');
                // btnEnviarComentarios.addEventListener('click', () => {
                //     const comentarioData = {
                //         child_id: child.id,
                //         timeline_id: localStorage.getItem('role_id'),
                //         comments: document.getElementById('comentarios').value
                //     }
                //     console.log(comentarioData);
                //     comentarioProgreso(comentarioData);
                // });
            })

            // Agregar el evento click al botón "Enviar Comentarios" fuera del bucle
            const btnEnviarComentarios = document.getElementById('enviar-comentarios');
            btnEnviarComentarios.addEventListener('click', () => {
                const selectedChild = document.querySelector('.info-perfil.selected');
                if (selectedChild) {
                    const comentarioData = {
                        child_id: selectedChild.getAttribute('child_id'),
                        timeline_id: localStorage.getItem('role_id'),
                        comments: document.getElementById('comentarios').value
                    }
                    console.log(comentarioData);
                    comentarioProgreso(comentarioData);
                    const finEnviarComentario = document.getElementById("finalizar-enviar-comentario");
                    const overlayEnviarComentario = document.getElementById("overlay-enviar-comentario-correcta");
                    const contenedorEnviarComentarioCorrecta = document.getElementById("enviar-comentario-correcta-container");

                    if (finEnviarComentario) {
                        overlayEnviarComentario.style.display = "flex";
                        contenedorEnviarComentarioCorrecta.style.display = "block";
                        finEnviarComentario.addEventListener('click', function () {
                            console.log("fufa?");
                            document.getElementById('comentarios').value = "";
                            // formIncidencia.reset();
                            // href = "../../index.html";
                            overlayEnviarComentario.style.display = "none";
                            contenedorEnviarComentarioCorrecta.style.display = "block";
                        });
                    }
                } else {
                    console.log("No se ha seleccionado ningún niño.");
                }
            });

            // TODO: hacer un fecth a /attendances/by_timeline_and_date y con ese data hacer el for de abajo

            // wasDataStoredInDB

            fetch('http://127.0.0.1:8000/api/attendances/by_timeline_and_date', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ timeline_id: localStorage.getItem('role_id') })
            })
                .then(response => {
                    return response.json();
                })
                .then(attendanceData => {
                    for (let i = 0; i < data.children.length; i++) {
                        const child = attendanceData.attendaces.filter(row => data.children[i].id == row.child_id);

                        console.log(attendanceData.attendaces.filter(row => data.children[i].id == row.child_id));



                        let elementoTabla = document.createElement("tr");
                        elementoTabla.className = "table-column";
                        elementoTabla.setAttribute('id', data.children[i].id);

                        let elementoCheckBox = document.createElement("td");
                        elementoCheckBox.className = "table-row";

                        let elementoNombre = document.createElement("td");
                        elementoNombre.className = "table-name-row";
                        elementoNombre.textContent = data.children[i].name + " " + data.children[i].lastname;

                        let elementoListaCheckbox = document.createElement("input");
                        elementoListaCheckbox.className = "asistencia";
                        elementoListaCheckbox.type = "checkbox";

                        if (child.length > 0) {
                            wasDataStoredInDB = true;

                            if (child[0].attendance) elementoListaCheckbox.checked = true;
                        };

                        elementoCheckBox.appendChild(elementoListaCheckbox);
                        elementoTabla.appendChild(elementoNombre);
                        elementoTabla.appendChild(elementoCheckBox);
                        tablaAsistencia.appendChild(elementoTabla);
                    }
                })
                .catch(error => {
                    console.log(error);
                })


        })
        .then(() => {
            addListenersToGroupInformation();
        })
        .catch(error => {
            console.error('Error al obtener información del alumno', error);
        });

    //FETCH Editar datos comentarios
    function comentarioProgreso(comentarioData) {
        return fetch(`http://127.0.0.1:8000/api/attendances/comments`, {
            method: 'PUT', //Método para enviar los datos al servidor
            headers: {
                'Content-Type': 'application/json' //Envío de datos en formato JSON
            },
            body: JSON.stringify(comentarioData) //Se convierte el objeto JS a una cadena JSON
        })
            .then(response => {
                console.log(response);
                if (!response.ok) {
                    throw new Error('Error al introducir datos');
                }
                return response.json();
            })
            .then(data => {
                console.log("Datos introducidos con éxito", data);
            })
            .catch(error => {
                console.error('Error al introducir datos', error);
            });
    }

    pasarListaBtn.addEventListener('click', () => {
        // console.log();
        console.log("ESTADO", wasDataStoredInDB);

        // TODO: enviar asistencia en base al tbody de la tabla

        const rows = [...tablaAsistencia.querySelectorAll('tr')];

        let method = wasDataStoredInDB ? 'PUT' : 'POST';

        rows.map(row => {
            const asistencia = {
                timeline_id: localStorage.getItem('role_id'),
                date: new Date(Date.now()).toISOString().split('T')[0],
                child_id: row.getAttribute('id')
            }

            // console.log([row.childNodes[1], row.childNodes[1].selected]);


            if (row.childNodes[1].childNodes[0].checked) {
                asistencia.attendance = 1;
            } else {
                asistencia.attendance = 0;
            }

            registrarAsistencia(method, asistencia);
        })

        const finPasarLista = document.getElementById("finalizar-pasar-lista");
        const overlayPasarLista = document.getElementById("overlay-pasar-lista-correcta");
        const contenedorPasarListaCorrecta = document.getElementById("pasar-lista-correcta-container");

        if (finPasarLista) {
            overlayPasarLista.style.display = "flex";
            contenedorPasarListaCorrecta.style.display = "block";
            finPasarLista.addEventListener('click', function () {
                console.log("fufa?");
                // href = "../../index.html";
                overlayPasarLista.style.display = "none";
                contenedorPasarListaCorrecta.style.display = "block";
            });
        }
        // alert('Asistencia registrada con exito');
    })

    //Fetch para crear el cronorama
    function registrarAsistencia(method, attendance) {
        console.log([method, attendance]);


        return fetch(`http://127.0.0.1:8000/api/attendances`, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(attendance)
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

    function addListenersToGroupInformation() {
        document.querySelectorAll('.info-perfil').forEach(function (elemento) {
            elemento.addEventListener('click', (e) => {
                console.log([elemento.getAttribute('tutor_id'), elemento.getAttribute('tutor_phone'), elemento.getAttribute('tutor_email')]);

                tutorPhone.innerText = elemento.getAttribute('tutor_phone');
                tutorEmail.innerText = elemento.getAttribute('tutor_email');

                let contacto = document.getElementById('contacto-alumno');
                if (window.getComputedStyle(contacto).display === "none") {
                    contacto.style.display = "flex";
                } else {
                    contacto.style.display = "none";
                }
            });
        });
    }

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

    const times = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00'];
    const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
    // const activityTemplates = {};

    // DOM Elements
    const thead = document.querySelector('.timeline-table thead tr');
    const tbody = document.querySelector('.timeline-table tbody');
    const form = document.querySelector('.activity-form');
    const overlay = document.querySelector('.overlay');
    const select = document.getElementById('existing-activities');
    const saveActivityBtn = document.querySelector('.save-activity');
    const closeActivityBtn = document.querySelector('.close-activity');
    let selectedCell = null;

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

    // Initialize headers
    dates.forEach((date, index) => {
        const dateObj = new Date(date);
        const th = document.createElement('th');
        th.textContent = `${days[index]} ${dateObj.getDate()}`;
        thead.appendChild(th);
    });

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

    function findCell(date, time) {
        return Array.from(document.querySelectorAll('td[data-date]')).find(cell =>
            cell.dataset.date === date &&
            cell.dataset.time === time
        );
    }

    function lockCell(cell) {
        cell.classList.add('occupied');
        cell.style.pointerEvents = 'none';
        cell.removeEventListener('click', openForm);
    }

    function openForm(event) {
        const cell = event.target;
        if (cell.classList.contains('occupied')) return;

        selectedCell = cell;
        form.classList.add('active');
        overlay.classList.add('active');

        const currentDate = cell.dataset.date;
        const currentTime = cell.dataset.time;

        document.querySelectorAll('input[type="date"]').forEach(input =>
            input.value = currentDate
        );

        document.querySelectorAll('input[type="time"]').forEach(input =>
            input.value = `${currentTime}:00`
        );

        document.getElementById('activity-title').focus();
    }

    function closeForm() {
        form.classList.remove('active');
        overlay.classList.remove('active');
        selectedCell = null;
        resetForms();
    }

    async function fillSelect() {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/activities');
            const data = await response.json();

            select.innerHTML = "";

            data.forEach(activity => {
                const option = document.createElement("option");
                option.value = activity.id;
                option.textContent = activity.name;
                option.setAttribute('description', activity.description);
                select.appendChild(option);
            });
        } catch (error) {
            console.error('Error loading activities:', error);
        }
    }

    function getAffectedCells(date, startTime, duration) {
        const cells = [];
        const startCell = findCell(date, startTime);
        if (!startCell) return cells;

        cells.push(startCell);
        const hoursNeeded = Math.ceil(duration / 60) - 1;

        if (hoursNeeded > 0) {
            let currentCell = startCell;
            for (let i = 0; i < hoursNeeded; i++) {
                const nextRow = currentCell.parentElement.nextElementSibling;
                if (nextRow) {
                    const nextCell = nextRow.cells[currentCell.cellIndex];
                    if (nextCell) {
                        cells.push(nextCell);
                        currentCell = nextCell;
                    }
                }
            }
        }

        return cells;
    }

    function createActivityElement(activity, totalHeight) {
        const activityDiv = document.createElement('div');
        activityDiv.className = 'existing-activity';
        activityDiv.style.height = `${totalHeight}px`;
        activityDiv.style.zIndex = '2';

        // Format start and end times
        const startTime = activity.hour.slice(0, 5);
        const endDate = new Date(`2000-01-01T${activity.hour}`);
        endDate.setMinutes(endDate.getMinutes() + activity.duration);
        const endTime = endDate.toTimeString().slice(0, 5);

        activityDiv.innerHTML = `
            <div>
                <strong>${activity.name}</strong>
                <div>${startTime} - ${endTime}</div>
            </div>
            ${activity.description ? `<small>${activity.description}</small>` : ''}
        `;

        return activityDiv;
    }

    async function fillTimeline() {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/activities_timeline_detailed/${localStorage.getItem('role_id')}`);
            const data = await response.json();

            data.forEach(activity => {
                const cells = getAffectedCells(
                    activity.date,
                    activity.hour.slice(0, 5),
                    activity.duration,
                    activity.name,
                    activity.description,
                );

                if (cells.length > 0) {
                    const totalHeight = cells.length * 80; // 80px is the cell height
                    const activityDiv = createActivityElement(activity, totalHeight);

                    // Add activity div to first cell and lock all cells
                    cells[0].appendChild(activityDiv);
                    cells.forEach(cell => lockCell(cell));
                }
            });
        } catch (error) {
            console.error('Error loading timeline:', error);
        }
    }

    async function saveActivity() {
        try {
            const isNewMode = document.querySelector('.mode-switch[data-mode="new"]').classList.contains('active');
            const roleId = localStorage.getItem('role_id');
            let payload, duration;

            if (isNewMode) {
                const title = document.getElementById('activity-title').value;
                const notes = document.getElementById('activity-notes').value;
                duration = parseInt(document.getElementById('activity-duration').value);

                if (!duration || duration <= 0) {
                    alert('Please enter a valid duration');
                    return;
                }

                // Check affected cells
                const cells = getAffectedCells(
                    document.getElementById('activity-date').value,
                    document.getElementById('activity-time').value.slice(0, 5),
                    duration
                );

                if (cells.some(cell => cell.classList.contains('occupied'))) {
                    alert('Cannot create activity: Some time slots are already occupied');
                    return;
                }

                const activityResponse = await fetch('http://127.0.0.1:8000/api/activities', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: title, description: notes })
                });

                const activityData = await activityResponse.json();

                await fillSelect();

                payload = {
                    activity_id: activityData.id,
                    timeline_id: roleId,
                    date: document.getElementById('activity-date').value,
                    hour: document.getElementById('activity-time').value,
                    duration: duration
                };
            } else {
                const selected = document.getElementById('existing-activities').value;
                duration = parseInt(document.getElementById('reuse-duration').value);

                if (!duration || duration <= 0) {
                    alert('Please enter a valid duration');
                    return;
                }

                // Check affected cells
                const cells = getAffectedCells(
                    document.getElementById('reuse-date').value,
                    document.getElementById('reuse-time').value.slice(0, 5),
                    duration
                );

                if (cells.some(cell => cell.classList.contains('occupied'))) {
                    alert('Cannot create activity: Some time slots are already occupied');
                    return;
                }

                payload = {
                    activity_id: parseInt(selected),
                    timeline_id: roleId,
                    date: document.getElementById('reuse-date').value,
                    hour: document.getElementById('reuse-time').value,
                    duration: duration
                };
            }

            const timelineResponse = await fetch('http://127.0.0.1:8000/api/activity_timeline', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const timelineData = await timelineResponse.json();

            // console.log(timelineData);

            const timelineActivityResponse = await fetch(`http://127.0.0.1:8000/api/activities/${timelineData.activity_id}`);

            const timelineActivityData = await timelineActivityResponse.json();

            // Get all affected cells and calculate total height
            const cells = getAffectedCells(
                payload.date,
                payload.hour.slice(0, 5),
                payload.duration
            );

            const totalHeight = cells.length * 80; // 80px is the cell height

            // Create and append activity element
            const activityDiv = createActivityElement({
                name: timelineActivityData.name,
                hour: timelineData.hour,
                duration: payload.duration,
                description: timelineActivityData.description
            }, totalHeight);

            // Add activity to first cell and lock all affected cells
            cells[0].appendChild(activityDiv);
            cells.forEach(cell => lockCell(cell));

            closeForm();
        } catch (error) {
            console.error('Error saving activity:', error);
        }
    }

    function resetForms() {
        document.getElementById('activity-title').value = '';
        document.getElementById('activity-notes').value = '';
        document.getElementById('activity-duration').value = '';
        document.getElementById('existing-activities').selectedIndex = 0;
        document.getElementById('reuse-notes').value = '';
        document.getElementById('reuse-duration').value = '';
        document.querySelectorAll('.mode-switch').forEach(btn => btn.classList.remove('active'));
        document.querySelector('.mode-switch[data-mode="new"]').classList.add('active');
        document.querySelectorAll('.form-content').forEach(form => {
            form.classList.remove('active');
            if (form.dataset.mode === 'new') form.classList.add('active');
        });
    }

    // Event Listeners
    document.querySelectorAll('.mode-switch').forEach(button => {
        button.addEventListener('click', function (e) {
            document.querySelectorAll('.mode-switch').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            const mode = e.target.dataset.mode;
            document.querySelectorAll('.form-content').forEach(form => {
                form.classList.remove('active');
                if (form.dataset.mode === mode) form.classList.add('active');
            });
        });
    });

    select.addEventListener('change', function () {
        const description = this.options[this.selectedIndex]?.getAttribute('description') || '';
        document.getElementById('reuse-notes').value = description;
    });

    overlay.addEventListener('click', closeForm);
    document.addEventListener('keydown', (e) => e.key === 'Escape' && closeForm());
    saveActivityBtn.addEventListener('click', saveActivity);
    closeActivityBtn.addEventListener('click', closeForm);

    // Initialize the application
    async function initialize() {
        initTimeline();
        await fillSelect();
        await fillTimeline();
    }

    initialize();
});