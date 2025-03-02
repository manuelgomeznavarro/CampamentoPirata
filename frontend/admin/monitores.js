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

    const headerBtnsContainer = document.querySelector('.dashboard-profile');
    const btnSalir = document.createElement('button');
    const imgSalir = document.createElement('img');
    imgSalir.src = 'https://campamento-tesoro-perdido-image-hosting.fra1.cdn.digitaloceanspaces.com/icons/logout-icon.png';
    btnSalir.appendChild(imgSalir);

    btnSalir.addEventListener('click', () => {
        localStorage.removeItem('role');
        localStorage.removeItem('role_id');
        location.assign('../index.html');
    });
    headerBtnsContainer.appendChild(btnSalir);

    // const urlParams = new URLSearchParams(window.location.search);
    // console.log(urlParams);

    // if (urlParams.get('showGroup') === 'true') {
    //     const eventoClick = new Event('click');
    //     btnGrupos.dispatchEvent(eventoClick);
    // }

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

    // document.getElementById('logo-monitores-admin').addEventListener('click', function () {
    //     window.location.href = '../admin/dashboard.html';
    // });

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

    // document.getElementById('excursiones-admin').addEventListener('click', function () {
    //     window.location.href = '../admin/excursionesyactividades.html';
    // });

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
            listaGrupo.innerText = "Miembros del grupo";
            listaSinGrupo.innerText = "Alumnos sin grupo";
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
                        localStorage.setItem('group_id', item.id);
                        // mostrarNinosSinGrupo();
                        // const vacio = null;
                        mostrarSinGrupo();
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
                console.log(item);
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
                        document.getElementById("nombre-editar-monitor").value = item.name;
                        document.getElementById("apellidos-editar-monitor").value = item.lastname;
                        // document.getElementById("correo-editar-monitor").value = item.email;
                        document.getElementById("password-editar-monitor").value = item.password;
                        document.getElementById("dni-editar-monitor").value = item.dni;
                        document.getElementById("telf1-editar-monitor").value = item.phone;
                        document.getElementById("telf2-editar-monitor").value = item.phone2;
                        document.getElementById("description-editar-monitor").value = item.description;
                        document.getElementById("editar-nombre-grupo").value = item.group;
                        localStorage.setItem('monitor_id', item.id);
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
    const description = document.getElementById('description-nuevo-monitor');
    const nuevoNombreGrupo = document.getElementById('nuevo-nombre-grupo');

    //Fetch para agregar un monitor a la tabla monitores
    console.log(btnCrearGrupo);
    
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
            description: description.value,
            name_group: nuevoNombreGrupo.value,
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

        const isFormValid = validateForm();
        if (isFormValid) {
            crearMonitor(monitorData);
        }

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
                console.log(response);
                // if (!response.ok) {
                //     throw new Error('Error al crear monitor');
                // }
                
                return response.json();
            })
            .then(data => {
                console.log(data);
                console.log("Monitor creado con éxito", data);
                window.location.href = "monitores.html";
            })
            .catch(error => {
                console.log(error);
                console.error('Error al crear monitor', error);
            });
    }

    const listaGrupo = document.getElementById("lista-grupo");
    const listaSinGrupo = document.getElementById("lista-sin-grupo");
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

    function mostrarSinGrupo() {
        return fetch(`http://127.0.0.1:8000/api/children`)
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
                    if (item.group_id === null) {
                        console.log(`ID: ${item.id}, Nombre: ${item.name}, Apellidos: ${item.lastname}`);
                        let elementoAlumno = document.createElement('div');
                        elementoAlumno.textContent = `${item.name} ${item.lastname}`;
                        elementoAlumno.className = "nombre-alumno";
                        elementoAlumno.setAttribute('id', item.id);

                        listaSinGrupo.appendChild(elementoAlumno);

                        elementoAlumno.addEventListener('click', () => {
                            listaSinGrupo.removeChild(elementoAlumno);
                            listaGrupo.appendChild(elementoAlumno);
                            console.log(`Movido a grupo: ${item.name}, ${item.lastname}`);

                            const childData = {
                                group_id: listaGrupo.value
                            }
                            console.log(childData);
                            // asignarGrupo(item.id, childData);
                        });
                    }


                    // console.log(`ID: ${item.id}, Nombre: ${item.name}, Apellidos: ${item.lastname}`);
                    // console.log(index);

                    // const elementos = [...listaGrupo.childNodes];
                    // console.log(elementos);
                    // for (let index = 2; index < elementos.length; index++) {
                    //     elementos[index].remove();

                    // }
                    // let elementoAlumno = document.createElement('div');
                    // elementoAlumno.textContent = `${item.name}, ${item.lastname}`;
                    // elementoAlumno.className = "nombre-alumno";
                    // listaGrupo.appendChild(elementoAlumno);

                })
            })
            .catch(error => {
                console.error('Error al obtener los datos:', error);
            });
    }

    const botonGuardarCambios = document.getElementById("button-crear-grupo");
    botonGuardarCambios.addEventListener('click', function () {
        const children = [...listaGrupo.querySelectorAll('.nombre-alumno')];
        console.log(children);

        const dataChild = {
            group_id: localStorage.getItem('group_id')
        }
        children.forEach(child => {
            console.log([child, child.getAttribute('id')]);
            if (child.getAttribute('id') === null) return;
            //Fetch para asignar un grupo a un niño
            fetch(`http://127.0.0.1:8000/api/children/${child.getAttribute('id')}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataChild)
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
        });
        location.assign('monitores.html?showGroup=true');
    });


    //Fetch para obtener los datos de los grupos de la BBDD
    // function mostrarSinGrupo(group_id) {
    //     return fetch(`http://127.0.0.1:8000/api/children/by_group/${group_id}`)
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
    //                 if (item.group_id === null) {
    //                     console.log(`ID: ${item.id}, Nombre: ${item.name}, Apellidos: ${item.lastname}`);
    //                     console.log(index);
    //                     let elementoAlumno = document.createElement('div');
    //                     elementoAlumno.textContent = `${item.name}, ${item.lastname}`;
    //                     elementoAlumno.className = "nombre-alumno";
    //                     listaSinGrupo.appendChild(elementoAlumno);
    //                 }
    //                 // console.log(`ID: ${item.id}, Nombre: ${item.name}, Apellidos: ${item.lastname}`);
    //                 // console.log(index);

    //                 // const elementos = [...listaGrupo.childNodes];
    //                 // console.log(elementos);
    //                 // for (let index = 2; index < elementos.length; index++) {
    //                 //     elementos[index].remove();

    //                 // }
    //                 // let elementoAlumno = document.createElement('div');
    //                 // elementoAlumno.textContent = `${item.name}, ${item.lastname}`;
    //                 // elementoAlumno.className = "nombre-alumno";
    //                 // listaGrupo.appendChild(elementoAlumno);

    //             })
    //         })
    //         .catch(error => {
    //             console.error('Error al obtener los datos:', error);
    //         });
    // }

    // function mostrarNinosSinGrupo() {
    //     fetch('http://127.0.0.1:8000/api/children/without_group')
    //         .then(response => response.json())
    //         .then(data => {
    //             const listaSinGrupo = document.getElementById("lista-sin-grupo");
    //             listaSinGrupo.innerHTML = ""; // Limpiar el div antes de agregar nuevos niños

    //             data.forEach(child => {
    //                 let elemento = document.createElement("div");
    //                 elemento.textContent = `${child.name} ${child.lastname}`;
    //                 elemento.className = "elemento-persona-sin-grupo";
    //                 listaSinGrupo.appendChild(elemento);
    //             });
    //         })
    //         .catch(error => console.error('Error al obtener niños sin grupo:', error));
    // }

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
        return fetch(`http://127.0.0.1:8000/api/monitors/${localStorage.getItem('monitor_id')}`, {
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
                password: document.getElementById("password-editar-monitor").value,
                dni: document.getElementById("dni-editar-monitor").value,
                phone: document.getElementById("telf1-editar-monitor").value,
                phone2: document.getElementById("telf2-editar-monitor").value,
                description: document.getElementById("description-editar-monitor").value,
                name_group: document.getElementById("editar-nombre-grupo").value,
                admin_id: localStorage.getItem('role_id')
            };
            console.log(monitorData);
            introducirDatos(monitorData);

        } else {
            formEditarMonitores.style.display = "none";
        }
    });

});

const btnEliminarMonitor = document.getElementById("eliminar-monitor");

btnEliminarMonitor.addEventListener('click', function () {
    //Fetch para eliminar un monitor de la tabla monitores
    console.log(localStorage.getItem('role_id'));
    console.log('se borra el monitor');
    fetch(`http://127.0.0.1:8000/api/monitors/${localStorage.getItem('monitor_id')}`, {
        method: 'DELETE'

    })
        .then(response => {
            console.log(response);
            if (!response.ok) {
                throw new Error('Error al eliminar monitor');
            }
            return response.json();
        })
        .then(data => {
            console.log("Monitor eliminado con éxito", data);
            window.location.href = "monitores.html";
        })
        .catch(error => {
            console.error('Error al eliminar monitor', error);
        });
});

// Validación de los datos del formulario de inicio de sesión

const form = document.querySelector('form');
const botonCrearMonitor = document.querySelector('#crear-monitor');

// form.addEventListener('submit', function (event) {
//     event.preventDefault();
//     validateForm();
//     if(validateForm()==true){
//         window.location.href = "monitores.html";
//     }
// });

// botonCrearMonitor.addEventListener('click', function (event) {
//     event.preventDefault();
//     validateForm();
//     if (validateForm() == true) {
//         window.location.href = "monitores.html";
//     }
// });

const nextButton = document.querySelector('#nextButton');
const errorName = document.querySelector('#errorName');
const errorLastName = document.querySelector('#errorLastName');
const errorEmail = document.querySelector('#errorEmail');
const errorDni = document.querySelector('#errorDni');
const errorPhone1 = document.querySelector('#errorPhone1');
const errorPhone2 = document.querySelector('#errorPhone2');
const errorPassword = document.querySelector('#errorPassword');



document.getElementById("nombre-nuevo-monitor").addEventListener("blur", validateName);

function validateName() {
    const name = document.querySelector('#nombre-nuevo-monitor').value.trim();
    if (name == "") {
        errorName.style.color = "red";
        errorName.innerHTML = "Por favor, introduzca un nombre.";
        return false;
    } else {
        errorName.innerHTML = "";
        return true;
    }
}

document.getElementById("apellidos-nuevo-monitor").addEventListener("blur", validateLastName);

function validateLastName() {
    const lastName = document.querySelector('#apellidos-nuevo-monitor').value.trim();
    if (lastName === "") {
        errorLastName.style.color = "red";
        errorLastName.innerHTML = "Por favor, introduzca un apellido.";
        return false;
    } else {
        errorLastName.innerHTML = "";
        return true;
    }
}

document.getElementById("correo-nuevo-monitor").addEventListener("blur", validateEmail);

function validateEmail() {
    const email = document.getElementById("correo-nuevo-monitor").value.trim();
    const emailRegex = /^[\w._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(email)) {
        errorEmail.style.color = "red";
        errorEmail.innerHTML = "Introduzca un email correcto.";
        return false;
    } else {
        errorEmail.innerHTML = "";
        return true;
    }
}

document.getElementById("telf1-nuevo-monitor").addEventListener("blur", validatePhone1);

function validatePhone1() {
    const phoneRegex = /^[0-9]{9}$/;
    const phone1 = document.querySelector('#telf1-nuevo-monitor').value.trim();
    if (!phoneRegex.test(phone1)) {
        errorPhone1.style.color = "red";
        errorPhone1.innerHTML = "Introduzca un teléfono válido.";
        return false;
    } else {
        errorPhone1.innerHTML = "";
        return true;
    }
}

document.getElementById("telf2-nuevo-monitor").addEventListener("blur", validatePhone2);
function validatePhone2() {
    const phoneRegex = /^[0-9]{9}$/;
    const phone2 = document.querySelector('#telf2-nuevo-monitor').value.trim();
    if (phone2 === "") {
        errorPhone2.innerHTML = "";
        return true;
    }

    if (!phoneRegex.test(phone2)) {
        errorPhone2.style.color = "red";
        errorPhone2.innerHTML = "Introduzca un teléfono válido.";
        return false;
    }

    else {
        errorPhone2.innerHTML = "";
        return true;
    }

}

document.getElementById("dni-nuevo-monitor").addEventListener("blur", validateDni);

function validateDni() {
    const dni = document.querySelector('#dni-nuevo-monitor').value;
    const dniRegex = /^[0-9]{8}[A-Za-z]$/;
    if (!dniRegex.test(dni)) {
        errorDni.style.color = "red";
        errorDni.innerHTML = "Introduzca un DNI válido.";
        return false;
    } else {
        errorDni.innerHTML = "";
        return true;
    }
}

document.getElementById("password-nuevo-monitor").addEventListener("blur", validateDni);

function validatePassword() {
    const password = document.querySelector('#password-nuevo-monitor').value;
    const passwordRegex = /^(?=.[A-Z])(?=.[a-z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        errorPassword.style.color = "red";
        errorPassword.innerHTML = "Introduzca un Password válido.";
        return false;
    } else {
        errorPassword.innerHTML = "";
        return true;
    }
}


function validateForm() {

    const isNameCorrect = validateName();
    const isLastNameCorrect = validateLastName();
    const isEmailCorrect = validateEmail();
    const isPhoneCorrect1 = validatePhone1();
    const isPhoneCorrect2 = validatePhone2();
    const isDniCorrect = validateDni();
    // const isPasswordCorrect = validatePassword();


    if (isNameCorrect && isLastNameCorrect && isEmailCorrect && isPhoneCorrect1 && isPhoneCorrect2 && isDniCorrect) {
        return true;
    } else {
        return false;
    }
}


// Validación Editar Monitor

const form2 = document.querySelector('form');
const botonEditarMonitor = document.querySelector('#editar-monitor');

// form.addEventListener('submit', function (event) {
//     event.preventDefault();
//     validateForm();
//     if(validateForm()==true){
//         window.location.href = "monitores.html";
//     }
// });

botonEditarMonitor.addEventListener('click', function (event) {
    event.preventDefault();
    validateFormEditar();
    if (validateFormEditar() == true) {
        window.location.href = "monitores.html";
    }
});
// const nextButton = document.querySelector('#nextButton');
const errorNameEditar = document.querySelector('#errorNameEditar');
const errorLastNameEditar = document.querySelector('#errorLastNameEditar');
const errorEmailEditar = document.querySelector('#errorEmailEditar');
const errorDniEditar = document.querySelector('#errorDniEditar');
const errorPhone1Editar = document.querySelector('#errorPhone1Editar');
const errorPhone2Editar = document.querySelector('#errorPhone2Editar');
const errorPasswordEditar = document.querySelector('#errorPasswordEditar');



document.getElementById("nombre-editar-monitor").addEventListener("blur", validateNameEditar);

function validateNameEditar() {
    const name = document.querySelector('#nombre-editar-monitor').value.trim();
    if (name == "") {
        errorNameEditar.style.color = "red";
        errorNameEditar.innerHTML = "Por favor, introduzca un nombre.";
        return false;
    } else {
        errorNameEditar.innerHTML = "";
        return true;
    }
}

document.getElementById("apellidos-editar-monitor").addEventListener("blur", validateLastNameEditar);

function validateLastNameEditar() {
    const lastName = document.querySelector('#apellidos-editar-monitor').value.trim();
    if (lastName === "") {
        errorLastNameEditar.style.color = "red";
        errorLastNameEditar.innerHTML = "Por favor, introduzca un apellido.";
        return false;
    } else {
        errorLastNameEditar.innerHTML = "";
        return true;
    }
}

    const urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams);

    if (urlParams.get('showGroup') === 'true') {
        grupos.style.display = "block";
        formCrearMonitores.style.display = "none";
        listaMonitores.style.display = "none";
        creacionGrupo.style.display = "none";
        formEditarMonitores.style.display = "none";
        listaGrupo.innerText = "Miembros del grupo";
        listaSinGrupo.innerText = "Alumnos sin grupo";
    }

// document.getElementById("correo-editar-monitor").addEventListener("blur", validateEmailEditar);

// function validateEmailEditar() {
//     const email = document.getElementById("correo-editar-monitor").value.trim();
//     const emailRegex = /^[\w._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
//     if (!emailRegex.test(email)) {
//         errorEmailEditar.style.color = "red";
//         errorEmailEditar.innerHTML = "Introduzca un email correcto.";
//         return false;
//     } else {
//         errorEmailEditar.innerHTML = "";
//         return true;
//     }
// }

document.getElementById("telf1-editar-monitor").addEventListener("blur", validatePhone1Editar);

function validatePhone1Editar() {
    const phoneRegex = /^[0-9]{9}$/;
    const phone1 = document.querySelector('#telf1-editar-monitor').value.trim();
    if (!phoneRegex.test(phone1)) {
        errorPhone1Editar.style.color = "red";
        errorPhone1Editar.innerHTML = "Introduzca un teléfono válido.";
        return false;
    } else {
        errorPhone1Editar.innerHTML = "";
        return true;
    }
}

document.getElementById("telf2-editar-monitor").addEventListener("blur", validatePhone2Editar);
function validatePhone2Editar() {
    const phoneRegex = /^[0-9]{9}$/;
    const phone2 = document.querySelector('#telf2-editar-monitor').value.trim();
    if (phone2 === "") {
        errorPhone2Editar.innerHTML = "";
        return true;
    }

    if (!phoneRegex.test(phone2)) {
        errorPhone2Editar.style.color = "red";
        errorPhone2Editar.innerHTML = "Introduzca un teléfono válido.";
        return false;
    }

    else {
        errorPhone2Editar.innerHTML = "";
        return true;
    }

}

document.getElementById("dni-editar-monitor").addEventListener("blur", validateDniEditar);

function validateDniEditar() {
    const dni = document.querySelector('#dni-editar-monitor').value;
    const dniRegex = /^[0-9]{8}[A-Za-z]$/;
    if (!dniRegex.test(dni)) {
        errorDniEditar.style.color = "red";
        errorDniEditar.innerHTML = "Introduzca un DNI válido.";
        return false;
    } else {
        errorDniEditar.innerHTML = "";
        return true;
    }
}

document.getElementById("password-editar-monitor").addEventListener("blur", validateDniEditar);

function validatePasswordEditar() {
    const password = document.querySelector('#password-editar-monitor').value;
    const passwordRegex = /^(?=.[A-Z])(?=.[a-z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        errorPasswordEditar.style.color = "red";
        errorPasswordEditar.innerHTML = "Introduzca un Password válido.";
        return false;
    } else {
        errorPasswordEditar.innerHTML = "";
        return true;
    }
}


function validateFormEditar() {

    const isNameCorrect = validateNameEditar();
    const isLastNameCorrect = validateLastNameEditar();
    // const isEmailCorrect = validateEmailEditar();
    const isPhoneCorrect1 = validatePhone1Editar();
    const isPhoneCorrect2 = validatePhone2Editar();
    const isDniCorrect = validateDniEditar();
    const isPasswordCorrect = validatePasswordEditar();


    if (isNameCorrect && isLastNameCorrect && isPhoneCorrect1 && isPhoneCorrect2 && isDniCorrect && isPasswordCorrect) {
        return true;
    } else {
        return false;
    }
}
