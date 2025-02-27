document.addEventListener("DOMContentLoaded", function () {
    function checkRole() {
        const role = localStorage.getItem('role');

        if (role) {
            switch (role) {
                case 'tutor':
                    const headerBtnsContainer = document.querySelector('header .header-btns-container');
                    const reservationBtn = document.createElement('a');
                    reservationBtn.classList.add('anchor-button');
                    reservationBtn.href = './tutor/inscripcion/inscripcion.html';
                    reservationBtn.innerText = 'Reserva';

                    const tutorProfilePicContainer = document.createElement('figure');
                    const tutorProfilePic = document.createElement('img');

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
                                tutorProfilePic.src = data.url;
                            } else {
                                tutorProfilePic.src = 'https://campamento-tesoro-perdido-image-hosting.fra1.cdn.digitaloceanspaces.com/icons/default-profile.png';
                            }
                        })
                        .catch(error => {
                            console.log(error);

                        })

                    tutorProfilePicContainer.appendChild(tutorProfilePic);

                    headerBtnsContainer.innerHTML = "";
                    headerBtnsContainer.appendChild(reservationBtn);
                    headerBtnsContainer.appendChild(tutorProfilePicContainer);

                    break;

                case 'monitor':
                    location.assign('./monitor/html/dashboard.html');

                    break;

                case 'admin':
                    location.assign('./admin/dashboard.html');

                    break;

                default:
                    break;
            }
        }
    }

    checkRole();

    

    const btnReservation = document.querySelector('.btn-reservation');
    if (btnReservation) {

        btnReservation.addEventListener('click', function () {
            if (localStorage.getItem('role') == 'tutor') {
                window.location.href = './tutor/inscripcion/inscripcion.html';
            } else {
                overlay_sign_in.style.display = "flex";
                contenedor_sign_in.style.display = "block";
            }
        });
    };

    const btnVerTarifas = document.querySelector('#btn-ver-tarifas');
    if (btnVerTarifas) {
        btnVerTarifas.addEventListener('click', function () {
            window.location.href = './tutor/tarifas/tarifas.html';
        });
    }

    const btnConoceAlEquipo = document.querySelector('#btn-conocenos');
    if (btnConoceAlEquipo) {
        btnConoceAlEquipo.addEventListener('click', function () {
            window.location.href = './tutor/quienes_somos/quienes_somos.html';
        });
    }

    const inicio = document.getElementById("sign-in");
    const registrar = document.getElementById("sign-up");
    const registrarFooter = document.getElementById("registrar-footer");
    const overlay_sign_up = document.getElementById("overlay-sign-up");
    const contenedor_sign_up = document.getElementById("sign-up-container");
    const contenedor_sign_in = document.getElementById("sign-in-container");
    const overlay_sign_in = document.getElementById("overlay-sign-in");
    const btnRegistrar = document.querySelector(".register");

    if (registrarFooter) {

        registrarFooter.addEventListener('click', function () {
            if (localStorage.getItem('role') == 'tutor') {
                window.location.href = './tutor/inscripcion/inscripcion.html';
            } else {
                overlay_sign_in.style.display = "flex";
                contenedor_sign_in.style.display = "block";
            }
        });
    };


    //JS HOME
    function closeForm() {
        //Se cierra cualquier formulario que esté abierto
        overlay_sign_up.style.display = "none";
        contenedor_sign_up.style.display = "none";
        overlay_sign_in.style.display = "none";
    }

    registrar.addEventListener("click", () => {
        closeForm();
        overlay_sign_up.style.display = "flex";
        contenedor_sign_up.style.display = "block";  // Muestra el contenedor de registro
    });

    registrarFooter.addEventListener("click", () => {
        closeForm();
        overlay_sign_up.style.display = "flex";
        contenedor_sign_up.style.display = "block";  // Muestra el contenedor de registro
    });

    btnRegistrar.addEventListener("click", () => {
        closeForm();
        overlay_sign_up.style.display = "flex";
        contenedor_sign_up.style.display = "block";  // Muestra el contenedor de registro
    });

    overlay_sign_up.addEventListener("click", (event) => {
        if (event.target === overlay_sign_up) {
            overlay_sign_up.style.display = "none";  // Oculta la superposición
            contenedor_sign_up.style.display = "none";  // Oculta el contenedor de registro
        }
    });

    inicio.addEventListener("click", () => {
        closeForm();
        overlay_sign_in.style.display = "flex";
        contenedor_sign_in.style.display = "block";
    })

    overlay_sign_in.addEventListener("click", (event) => {
        if (event.target === overlay_sign_in) {
            closeForm();
        }
    });




    //JS SIGN UP
    const emailInput = document.querySelector('#email-sign-up');
    const passwordInput = document.querySelector('#password-sign-up');
    const rememberInput = document.querySelector('#remember');
    const formSignUp = document.getElementById("sign-up-form");

    function validator(e, regex, errorString) {
        const element = e.target;
        const inputValue = element.value;
        const parentElement = element.parentElement;

        if (!(regex.test(inputValue) || inputValue == null)) {
            if (!(parentElement.nextElementSibling.tagName == "SPAN")) {
                const errorEmail = document.createElement('span');
                errorEmail.style.color = "red";
                errorEmail.textContent = errorString;

                parentElement.after(errorEmail);
            }
        } else {
            if (parentElement.nextElementSibling.tagName == "SPAN") {
                parentElement.nextElementSibling.remove();
            }
        }
    }


    emailInput.addEventListener('blur', (e) => {
        validator(e, new RegExp(/^[\w._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$/), "¡Introduzca un email correcto!")
    });

    passwordInput.addEventListener('blur', (e) => {
        validator(e, new RegExp(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/), "¡Introduzca una contraseña con mayusculas, simbolos, números de al menos 8 caracteres!")
    })

    function validatorSubmit(e, regex, errorString) {
        const inputValue = e.value;
        const parentElement = e.parentElement;


        if (!(regex.test(inputValue) || inputValue == null)) {
            if (!(parentElement.nextElementSibling.tagName == "SPAN")) {
                const errorEmail = document.createElement('span');
                errorEmail.style.color = "red";
                errorEmail.textContent = errorString;

                parentElement.after(errorEmail);
            }

            return false;
        } else {
            if (parentElement.nextElementSibling.tagName == "SPAN") {
                parentElement.nextElementSibling.remove();
            }

            return true;
        }
    }

    formSignUp.addEventListener('submit', (e) => {
        e.preventDefault();

        const formElements = [...e.target];

        const emailValidator = validatorSubmit(formElements[0], new RegExp(/^[\w._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$/), "¡Introduzca un email correcto!");
        const passwordValidator = validatorSubmit(formElements[1], new RegExp(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/), "¡Introduzca una contraseña con mayusculas, simbolos, números de al menos 8 caracteres!");

        const userData = {
            email: formElements[0].value,
            password: formElements[1].value
        }

        if (emailValidator && passwordValidator) {
            console.log("Registro exitoso");
            crearCuenta(userData)
                .then(singIn(userData));

        } else {
            console.log("Registro fallido");
        }
    })

    //FETCH SIGN UP
    function crearCuenta(userData) {
        return fetch('http://127.0.0.1:8000/api/tutors', {
            method: 'POST', //Método para enviar los datos al servidor
            headers: {
                'Content-Type': 'application/json' //Envío de datos en formato JSON
            },
            body: JSON.stringify(userData) //Se convierte el objeto JS a una cadena JSON
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al registrar el usuario');
                }
                return response.json();
            })

            .then(data => {
                console.log("Cuenta creada con éxito", data);
            })
            .catch(error => {
                console.error('Error al registrar el usuario', error);
            });
    }


    //JS SIGN IN

    const emailInputSignIn = document.querySelector('#email-sign-in');
    const passwordInputSignIn = document.querySelector('#password-sign-in');
    const formSignIn = document.querySelector(".sign-in-container form");
    const errorEmailSignIn = document.getElementById("errorEmail");
    const errorPasswordSignIn = document.getElementById("errorPassword");

    // fetch('http://127.0.0.1:8000/api/login', {
    //         method: 'POST', //Método para enviar los datos al servidor
    //         headers: {
    //             'Content-Type': 'application/json' //Envío de datos en formato JSON
    //         },
    //         body: JSON.stringify({
    //             email: "abc@d.e",
    //             password: "1234"
    //         }) //Se convierte el objeto JS a una cadena JSON
    //     })
    //     .then(response => {
    //         debugger;

    //         console.log(response);
    //         if (!response.ok) {
    //             throw new Error('Error al registrar el usuario');
    //         }
    //         response.json();
    //         console.log(response);


    //         return response;
    //     })
    //     .then(data => {
    //         debugger;
    //         console.log("Sesion iniciada con éxito", data);
    //         localStorage.setItem('role', data.role);
    //         localStorage.setItem('role_id', data.role_id);
    //     })
    //     .catch(error => {
    //         console.error('Error al iniciar sesión', error);
    //     });

    emailInputSignIn.addEventListener("blur", () => {
        const email = emailInputSignIn.value;
        if (!(/^[\w._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email) || email == null)) {
            errorEmailSignIn.style.color = "red";
            errorEmailSignIn.innerHTML = "Introduzca un email correcto.";
        } else {
            errorEmailSignIn.innerHTML = "";
        }
    });

    passwordInputSignIn.addEventListener("blur", () => {
        const password = passwordInputSignIn.value;
        const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/;
    
        if (!regex.test(password)) {
            errorPasswordSignIn.style.color = "red";
            errorPasswordSignIn.innerHTML = "Introduzca una contraseña correcta.";
        } else {
            errorPasswordSignIn.innerHTML = "";
        }
    });
    

    // SIGN IN
    function singIn(userData) {
        return fetch('http://127.0.0.1:8000/api/login', {
            method: 'POST', //Método para enviar los datos al servidor
            headers: {
                'Content-Type': 'application/json' //Envío de datos en formato JSON
            },
            body: JSON.stringify(userData) //Se convierte el objeto JS a una cadena JSON
        })
            .then(response => {
                // if (!response.success) {
                //     throw new Error('Error al registrar el usuario');
                // }
                return response.json();
            })
            .then(data => {
                console.log("Sesion iniciada con éxito", data);
                localStorage.setItem('role', data.user.role);
                localStorage.setItem('role_id', data.user.role_id);

                formSignIn.reset();

                checkRole();

                closeForm();
            })
            .catch(error => {
                console.error('Error al iniciar sesión', error);
            });
    }
    

    formSignIn.addEventListener("submit", (e) => {
        e.preventDefault();  // Previene el comportamiento por defecto del formulario (recarga de página)
        e.stopPropagation();  // Detiene la propagación del evento
        e.stopImmediatePropagation();  // Detiene todos los demás manejadores de eventos



        const email = emailInputSignIn.value;
        if (!(/^[\w._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email) || email == null)) {
            errorEmailSignIn.style.color = "red";
            errorEmailSignIn.innerHTML = "Introduzca un email correcto.";
        } else {
            errorEmailSignIn.innerHTML = "";
        }

        const password = passwordInputSignIn.value;
        // if (!(/^(?=.[A-Z])(?=.[a-z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/.test(password)) || contra == null) {
        //     errorPasswordSignIn.style.color = "red";
        //     errorPasswordSignIn.innerHTML = "Introduzca una contraseña correcta.";
        // } else {
        //     errorPasswordSignIn.innerHTML = "";
        // }

        // if (errorEmailSignIn.innerHTML != "" || errorPasswordSignIn.innerHTML != "") {
        const userInfo = {
            email: email,
            password: password
        }
        // console.log(userInfo);

        console.log(userInfo);

        singIn(userInfo);


        //  fetch('http://127.0.0.1:8000/api/login', {
        //     method: 'POST', //Método para enviar los datos al servidor
        //     headers: {
        //         'Content-Type': 'application/json' //Envío de datos en formato JSON
        //     },
        //     body: JSON.stringify(userInfo) //Se convierte el objeto JS a una cadena JSON
        // })
        //     .then(response => {
        //         console.log(response.json());
        //         debugger;

        //         // if (!response.ok) {
        //         //     throw new Error('Error al registrar el usuario');
        //         // }
        //         console.log(response.json);

        //         return response.json();
        //     })
        //     .then(data => {
        //         console.log("Sesion iniciada con éxito", data);
        //         localStorage.setItem('role', data.role);
        //         localStorage.setItem('role_id', data.role_id);
        //     })
        //     .catch(error => {
        //         console.error('Error al iniciar sesión', error);
        //     });

    });

})

const inicio = document.getElementById("sign-in");
const registrar = document.getElementById("sign-up");
const registrarFooter = document.getElementById("registrar-footer");
const overlay_sign_up = document.getElementById("overlay-sign-up");
const contenedor_sign_up = document.getElementById("sign-up-container");
const contenedor_sign_in = document.getElementById("sign-in-container");
const overlay_sign_in = document.getElementById("overlay-sign-in");
const btnRegistrar = document.querySelector(".register");

//JS HOME
function closeForm() {
    //Se cierra cualquier formulario que esté abierto
    overlay_sign_up.style.display = "none";
    contenedor_sign_up.style.display = "none";
    overlay_sign_in.style.display = "none";
}

const urlParams = new URLSearchParams(window.location.search);
console.log(urlParams);

if (urlParams.get('showLogin') === 'true') {
    // Mostrar el pop-up de iniciar sesión
    // document.getElementById('login-popup').style.display = 'block';
    closeForm();
    overlay_sign_in.style.display = "flex";
    contenedor_sign_in.style.display = "block";
}