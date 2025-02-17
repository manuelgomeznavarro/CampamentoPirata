document.addEventListener('DOMContentLoaded', function () {
    const btnCrearMonitores = document.getElementById("btnCrearMonitores");
    const btnGrupos = document.getElementById("btnGrupos");
    const btnListaMonitores = document.getElementById("btnListaMonitores");
    const btnCrearGrupo = document.getElementById("btnCrearGrupo");
    const formCrearMonitores = document.getElementById("form-crear-monitor");
    const grupos = document.getElementById("grupos");
    const listaMonitores = document.getElementById("lista-monitores");
    const creacionGrupo = document.getElementById("creacion-grupo");
    const btnCrearMonitor = document.getElementById("crear-monitor");

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

    document.querySelectorAll('.button-options').forEach(function (boton) {
        // Agrego un evento 'click' a cada botón
        boton.addEventListener('click', function () {
            
            if (this.classList.contains('activo')) {
                boton.classList.remove('activo');
            } else {
                // Elimino la clase 'activo' de todos los botones
            // Esto es para que solo un botón tenga la clase 'activo' a la vez
            document.querySelectorAll('.button-options').forEach(b => b.classList.remove('activo'));
            // Agrego la clase 'activo' al botón al que se le hizo click
            this.classList.add('activo');
            }
        });
    });

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

    
    //Fetch para agregar un monitor a la tabla monitores
    btnCrearMonitor.addEventListener('click', (e) => {
        e.preventDefault();
        // TODO: HAY QUE AÑADOR LAS VALIDACIONES SIGUIENTES:
        // TODO: NOMBRE Y APELLIDOS CON UN MINIMO DE CARACTERES, EMAIL, DNI Y TELF 1
        // const formElements = [...e.target];

        // const emailValidator = validatorSubmit(formElements[0], new RegExp(/^[\w._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$/), "¡Introduzca un email correcto!");
        // const passwordValidator = validatorSubmit(formElements[1], new RegExp(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/), "¡Introduzca una contraseña con mayusculas, simbolos, números de al menos 8 caracteres!");
        const nombreMonitor = document.getElementById("nombre-nuevo-monitor");
        const apellidos = document.getElementById("apellidos-nuevo-monitor");
        const email = document.getElementById("correo-nuevo-monitor")
        const password = document.getElementById("password-nuevo-monitor");
        const dni = document.getElementById("dni-nuevo-monitor");
        const telf1 = document.getElementById("telf1-nuevo-monitor");
        const telf2 = document.getElementById("telf2-nuevo-monitor");
        
        const monitorData = {
            name: nombreMonitor.value,
            lastname: apellidos.value,
            dni: dni.value,            
            phone: telf1.value,
            phone2: telf2.value,
            email: email.value,
            password: password.value,
            admin_id: localStorage.getItem('role_id')
        }

        // if (emailValidator && passwordValidator) {
        //     console.log("Registro exitoso");
        //     crearCuenta(userData)
        //         .then(singIn(userData));

        // } else {
        //     console.log("Registro fallido");
        // }
        console.log(monitorData);
        crearMonitor(monitorData);
        // crearCuentaMonitor(userData)
    })
    function crearMonitor(monitorData) {
        return fetch('http://127.0.0.1:8000/api/monitors', {
            method: 'POST', //Método para enviar los datos al servidor
            headers: {
                'Content-Type': 'application/json' //Envío de datos en formato JSON
            },
            body: JSON.stringify(monitorData) //Se convierte el objeto JS a una cadena JSON
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al crear monitor');
                }
                return response.json();
            })
            .then(data => {
                console.log("Monitor creado con éxito", data);
            })
            .catch(error => {
                console.error('Error al crear monitor', error);
            });
    }

    // function crearCuentaMonitor(userData) {
    //     return fetch('http://127.0.0.1:8000/api/users', {
    //         method: 'POST', //Método para enviar los datos al servidor
    //         headers: {
    //             'Content-Type': 'application/json' //Envío de datos en formato JSON
    //         },
    //         body: JSON.stringify(userData) //Se convierte el objeto JS a una cadena JSON
    //     })
    //         .then(response => {
    //             if (!response.ok) {
    //                 throw new Error('Error al crear monitor');
    //             }
    //             return response.json();
    //         })
    //         .then(data => {
    //             console.log("Monitor creado con éxito", data);
    //         })
    //         .catch(error => {
    //             console.error('Error al crear monitor', error);
    //         });
    // }
});