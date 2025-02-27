document.addEventListener('DOMContentLoaded', () => {

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