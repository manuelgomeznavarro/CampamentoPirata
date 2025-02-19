document.addEventListener('DOMContentLoaded', function () {
    const btnCrearMonitores = document.getElementById("btnCrearMonitores");
    const btnGrupos = document.getElementById("btnGrupos");
    const btnListaMonitores = document.getElementById("btnListaMonitores");
    const btnCrearGrupo = document.getElementById("btnCrearGrupo");
    const formCrearMonitores = document.getElementById("form-crear-monitor");
    const formEditarMonitores = document.getElementById("form-editar-monitor");
    const grupos = document.getElementById("grupos");
    const listaMonitores = document.getElementById("lista-monitores");
    const creacionGrupo = document.getElementById("creacion-grupo");
    const btnCrearMonitor = document.getElementById("crear-monitor");
    const editarMonitorButton = document.getElementById("editar-monitor");
    console.log(editarMonitorButton);

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
            formEditarMonitores.style.display = "none";
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
            formEditarMonitores.style.display = "none";
            listaGrupo.innerText = "";
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
            formEditarMonitores.style.display = "none";
        } else {
            listaMonitores.style.display = "none";
        }
    });

    //Fetch para obtener los datos de los grupos de la BBDD
    fetch('http://127.0.0.1:8000/api/groups')
        // TODO: Si da tiempo modificar los datos del monit:
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error `);
            }
            return response.json();
        })
        .then(data => {
            data.forEach((item, index) => {
                console.log(`ID: ${item.id}, Nombre: ${item.name}`);
                console.log(index);
                let elementoGrupo = document.createElement('div');
                elementoGrupo.textContent = `${item.name}`;
                elementoGrupo.className = "nombre-grupo";
                grupos.appendChild(elementoGrupo);
                elementoGrupo.value = item.id;

                // Agregar event listener al nuevo elemento
                elementoGrupo.addEventListener('click', (e) => {
                    if (creacionGrupo.style.display === "none") {
                        creacionGrupo.style.display = "flex";
                        formCrearMonitores.style.display = "none";
                        grupos.style.display = "none";
                        listaMonitores.style.display = "none";
                        console.log(item.id);
                        mostrarMonitor(item.id);
                        mostrarGrupo(item.id);
                        mostrarNinosSinGrupo();
                        // const vacio = null;
                        // mostrarSinGrupo(vacio);
                    } else {
                        creacionGrupo.style.display = "none";
                    }
                });
            })
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
        });

    //Fetch para obtener los datos de los monitores de la BBDD
    fetch('http://127.0.0.1:8000/api/monitors')
        // TODO: Si da tiempo modificar los datos del monit:
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error `);
            }
            return response.json();
        })
        .then(data => {
            data.forEach((item, index) => {
                console.log(`ID: ${item.id}, Nombre: ${item.name}, Apellido: ${item.lastname}, DNI: ${item.dni}, Teléfono: ${item.phone}, Teléfono 2: ${item.phone2}, Admin2: ${item.admin_id}`);
                console.log(index);
                let elementoMonitor = document.createElement('div');
                elementoMonitor.textContent = `${item.name} ${item.lastname}`;
                elementoMonitor.className = "nombre-monitor";
                listaMonitores.appendChild(elementoMonitor);
                elementoMonitor.addEventListener('click', (e) => {
                    if (formEditarMonitores.style.display === "none") {
                        formEditarMonitores.style.display = "flex";
                        formCrearMonitores.style.display = "none";
                        grupos.style.display = "none";
                        listaMonitores.style.display = "none";
                        // const vacio = null;
                        // mostrarSinGrupo(vacio);
                    } else {
                        formEditarMonitores.style.display = "none";
                    }
                });
            })
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
        });

    const nombreMonitor = document.getElementById("nombre-nuevo-monitor");
    const apellidos = document.getElementById("apellidos-nuevo-monitor");
    const email = document.getElementById("correo-nuevo-monitor")
    const password = document.getElementById("password-nuevo-monitor");
    const dni = document.getElementById("dni-nuevo-monitor");
    const telf1 = document.getElementById("telf1-nuevo-monitor");
    const telf2 = document.getElementById("telf2-nuevo-monitor");

    //Fetch para agregar un monitor a la tabla monitores
    btnCrearMonitor.addEventListener('click', (e) => {
        e.preventDefault();
        // TODO: HAY QUE AÑADOR LAS VALIDACIONES SIGUIENTES:
        // TODO: NOMBRE Y APELLIDOS CON UN MINIMO DE CARACTERES, EMAIL, DNI Y TELF 1
        // const formElements = [...e.target];

        // const emailValidator = validatorSubmit(formElements[0], new RegExp(/^[\w._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$/), "¡Introduzca un email correcto!");
        // const passwordValidator = validatorSubmit(formElements[1], new RegExp(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/), "¡Introduzca una contraseña con mayusculas, simbolos, números de al menos 8 caracteres!");


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

    const listaGrupo = document.getElementById("lista-grupo");
    //Fetch para obtener los datos de los grupos de la BBDD
    function mostrarGrupo(group_id) {
        return fetch(`http://127.0.0.1:8000/api/children/by_group/${group_id}`)
            // TODO: Si da tiempo modificar los datos del monit:
            .then(response => {
                // if (!response.ok) {
                //     throw new Error(`Error `);
                // }
                return response.json();
            })
            .then(data => {
                console.log(data);

                data.forEach((item, index) => {
                    console.log(`ID: ${item.id}, Nombre: ${item.name}, Apellidos: ${item.lastname}`);
                    console.log(index);

                    // const elementos = [...listaGrupo.childNodes];
                    // console.log(elementos);
                    // for (let index = 2; index < elementos.length; index++) {
                    //     elementos[index].remove();

                    // }
                    let elementoAlumno = document.createElement('div');
                    elementoAlumno.textContent = `${item.name}, ${item.lastname}`;
                    elementoAlumno.className = "nombre-alumno";
                    listaGrupo.appendChild(elementoAlumno);

                })
            })
            .catch(error => {
                console.error('Error al obtener los datos:', error);
            });
    }

    // function mostrarSinGrupo(group_id) {
    //     return fetch(`http://127.0.0.1:8000/api/children/without_group/${group_id}`)
    //         // TODO: Si da tiempo modificar los datos del monit:
    //         .then(response => {
    //             // if (!response.ok) {
    //             //     throw new Error(`Error `);
    //             // }
    //             return response.json();
    //         })
    //         .then(data => {
    //             console.log(data);

    //             data.forEach((item, index) => {
    //                 console.log(`ID: ${item.id}, Nombre: ${item.name}, Apellidos: ${item.lastname}`);
    //                 console.log(index);

    //                 // const elementos = [...listaGrupo.childNodes];
    //                 // console.log(elementos);
    //                 // for (let index = 2; index < elementos.length; index++) {
    //                 //     elementos[index].remove();

    //                 // }
    //                 let elementoAlumno = document.createElement('div');
    //                 elementoAlumno.textContent = `${item.name}, ${item.lastname}`;
    //                 elementoAlumno.className = "nombre-alumno";
    //                 listaGrupo.appendChild(elementoAlumno);

    //             })
    //         })
    //         .catch(error => {
    //             console.error('Error al obtener los datos:', error);
    //         });
    // }

    function mostrarNinosSinGrupo() {
        fetch('http://127.0.0.1:8000/api/children/without_group')
            .then(response => response.json())
            .then(data => {
                const listaSinGrupo = document.getElementById("lista-sin-grupo");
                listaSinGrupo.innerHTML = ""; // Limpiar el div antes de agregar nuevos niños

                data.forEach(child => {
                    let elemento = document.createElement("div");
                    elemento.textContent = `${child.name} ${child.lastname}`;
                    elemento.className = "elemento-persona-sin-grupo";
                    listaSinGrupo.appendChild(elemento);
                });
            })
            .catch(error => console.error('Error al obtener niños sin grupo:', error));
    }


    //Fetch para obtener los datos del monitor del grupo de la BBDD
    function mostrarMonitor(group_id) {
        return fetch(`http://127.0.0.1:8000/api/monitors/${group_id}`)
            // TODO: Si da tiempo modificar los datos del monit:
            .then(response => {
                // if (!response.ok) {
                //     throw new Error(`Error `);
                // }
                return response.json();
            })
            .then(data => {
                console.log(data);
                console.log(`ID: ${data.id}, Nombre: ${data.name}, Apellidos: ${data.lastname}`);
                let elementoMonitor = document.createElement('div');
                elementoMonitor.textContent = `${data.name}, ${data.lastname}`;
                elementoMonitor.className = "nombre-monitor";
                listaGrupo.appendChild(elementoMonitor);
            })
            .catch(error => {
                console.error('Error al obtener los datos:', error);
            });
    }

    //Editar datos monitor
    function introducirDatos(monitorData) {
        return fetch(`http://127.0.0.1:8000/api/monitors/${localStorage.getItem('role_id')}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(monitorData)
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


    editarMonitorButton.addEventListener('click', function () {
        console.log("Hola");
        if (formEditarMonitores.style.display === "flex") {
            console.log("Hola");
            formCrearMonitores.style.display = "none";
            formEditarMonitores.style.display = "none";
            grupos.style.display = "none";
            listaMonitores.style.display = "block";
            creacionGrupo.style.display = "none";

            const monitorData = {
                name: document.getElementById("nombre-editar-monitor").value,
                lastname: document.getElementById("apellidos-editar-monitor").value,
                email: document.getElementById("correo-editar-monitor").value,
                password: document.getElementById("password-editar-monitor").value,
                dni: document.getElementById("dni-editar-monitor").value,
                phone: document.getElementById("telf1-editar-monitor").value,
                phone2: document.getElementById("telf2-editar-monitor").value,
                admin_id: localStorage.getItem('role_id')
            };
            console.log(monitorData);
            introducirDatos(monitorData);

        } else {
            formEditarMonitores.style.display = "none";
        }
    });

});