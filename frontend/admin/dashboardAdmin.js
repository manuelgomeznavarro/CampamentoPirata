document.addEventListener('DOMContentLoaded', () => {

    const headerBtnsContainer = document.querySelector('.dashboard-profile');
    const btnSalir = document.createElement('button');
    const imgSalir = document.createElement('img');
    const activityTitle = document.querySelector('.activity-title');
    const activityTime = document.querySelector('.activity-time');
    const activityDescription = document.querySelector('.activity-description');
    const activityCard = document.getElementById('activity-card');

    imgSalir.src = 'https://campamento-tesoro-perdido-image-hosting.fra1.cdn.digitaloceanspaces.com/icons/logout-icon.png';
    btnSalir.appendChild(imgSalir);

    btnSalir.addEventListener('click', () => {
        localStorage.removeItem('role');
        localStorage.removeItem('role_id');
        location.assign('../index.html');
    });
    headerBtnsContainer.appendChild(btnSalir);

    function checkRole() {
        const role = localStorage.getItem('role');

        if (role) {
            switch (role) {
                case 'tutor':
                    location.assign('../index.html');

                    break;

                case 'monitor':
                    location.assign('./monitor/html/dashboard.html');

                    break;

                case 'admin':
                    // location.assign('./admin/dashboard.html');
                    const profilePic = document.querySelector('.user-avatar img');

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
                                profilePic.src = data.url;
                            } else {
                                profilePic.src = "https://campamento-tesoro-perdido-image-hosting.fra1.cdn.digitaloceanspaces.com/icons/default-profile.png";
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        })

                    break;

                default:
                    break;
            }
        }
    }

    checkRole();

    const nombreAdmin = document.querySelector('.user-name');

    fetch(`http://127.0.0.1:8000/api/admins/${localStorage.getItem('role_id')}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            nombreAdmin.textContent = `${data.name} ${data.lastname}`;
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


    document.getElementById('logo-dashboard').addEventListener('click', function () {
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
    let defaultButton = document.getElementById('dashboard-admin');
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