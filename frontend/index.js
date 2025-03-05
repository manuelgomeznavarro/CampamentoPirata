 document.addEventListener("DOMContentLoaded", () => {
    // Get elements
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const nav = document.querySelector('header nav');
    const overlay = document.getElementById('overlay');
    const headerBtnsContainer = document.querySelector('.header-btns-container');

    // Function to check if mobile view is active
    function isMobileView() {
        return window.innerWidth <= 992;
    }

    // Function to update DOM for responsive layout
    function updateResponsiveLayout() {
        if (isMobileView()) {
            // Move buttons container into nav for mobile
            if (headerBtnsContainer.parentElement !== nav) {
                nav.appendChild(headerBtnsContainer);
            }
        } else {
            // Move buttons container back to header for desktop
            const header = document.querySelector('header');
            if (headerBtnsContainer.parentElement !== header) {
                header.appendChild(headerBtnsContainer);
            }
            
            // Reset mobile menu state
            hamburgerMenu.classList.remove('open');
            nav.classList.remove('open');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Initial setup
    updateResponsiveLayout();

    // Toggle mobile menu
    hamburgerMenu.addEventListener('click', function() {
        hamburgerMenu.classList.toggle('open');
        nav.classList.toggle('open');
        overlay.classList.toggle('active');
        
        // Prevent body scrolling when menu is open
        document.body.style.overflow = hamburgerMenu.classList.contains('open') ? 'hidden' : '';
    });

    // Close menu when clicking overlay
    overlay.addEventListener('click', function() {
        hamburgerMenu.classList.remove('open');
        nav.classList.remove('open');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Close menu when clicking a nav link
    const navLinks = document.querySelectorAll('header nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (isMobileView()) {
                hamburgerMenu.classList.remove('open');
                nav.classList.remove('open');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Handle window resize
    window.addEventListener('resize', updateResponsiveLayout);

    // Original checkRole function
    function checkRole() {
        const role = localStorage.getItem('role');

        if (role) {
            switch (role) {
                case 'tutor':
                    const headerBtnsContainer = document.querySelector('.header-btns-container');
                    const reservationBtn = document.createElement('a');
                    reservationBtn.classList.add('anchor-button');
                    reservationBtn.href = './tutor/inscripcion/inscripcion.html';
                    reservationBtn.innerText = 'Inscripción';

                    const btnSalir = document.createElement('button');
                    btnSalir.className = "exit-button";
                    const imgSalir = document.createElement('img');
                    imgSalir.src = 'https://campamento-tesoro-perdido-image-hosting.fra1.cdn.digitaloceanspaces.com/icons/logout-icon2.png';
                    btnSalir.appendChild(imgSalir);

                    btnSalir.addEventListener('click', () => {
                        localStorage.removeItem('role');
                        localStorage.removeItem('role_id');
                        location.reload();
                    });

                    const tutorProfilePicContainer = document.createElement('figure');
                    const tutorProfilePic = document.createElement('img');

                    tutorProfilePicContainer.addEventListener('click', () => {
                        location.assign('./tutor/perfil_tutor/perfil_tutor.html');
                    });

                    fetch(`http://127.0.0.1:8000/api/get_user_pic`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            role: localStorage.getItem('role'),
                            role_id: localStorage.getItem('role_id')
                        })
                    })
                        .then(response => {
                            return response.json();
                        })
                        .then(data => {
                            if (data.url) {
                                tutorProfilePic.src = data.url;
                            } else {
                                tutorProfilePic.src = 'https://campamento-tesoro-perdido-image-hosting.fra1.cdn.digitaloceanspaces.com/icons/default-profile2.png';
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        });

                    tutorProfilePicContainer.appendChild(tutorProfilePic);

                    headerBtnsContainer.innerHTML = "";
                    headerBtnsContainer.appendChild(reservationBtn);
                    headerBtnsContainer.appendChild(tutorProfilePicContainer);
                    headerBtnsContainer.appendChild(btnSalir);
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
                showForm(overlay_sign_in, contenedor_sign_in);
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
                showForm(overlay_sign_in, contenedor_sign_in);
            }
        });
    };
    
    // Function to show a form with animation
    function showForm(overlay, container) {
        // First show elements with flex/block but with opacity 0
        overlay.style.display = "flex";
        container.style.display = "block";
        
        // Force a reflow to ensure display changes are applied
        void overlay.offsetWidth;
        
        // Add classes that will trigger transitions
        overlay.classList.add('active');
        container.classList.add('active');
        
        // Remove closing classes if present
        overlay.classList.remove('closing');
        container.classList.remove('closing');
    }

    // Improved function to close forms with fade out animation
    function closeForm() {
        return new Promise(resolve => {
            const overlays = document.querySelectorAll('.overlay-sign-up, .overlay-sign-in');
            const containers = document.querySelectorAll('.sign-up-container, .sign-in-container');
            
            // Add closing classes and remove active classes
            overlays.forEach(overlay => {
                overlay.classList.remove('active');
                overlay.classList.add('closing');
            });
            
            containers.forEach(container => {
                container.classList.remove('active');
                container.classList.add('closing');
            });
            
            // Wait for transitions to complete before hiding elements
            setTimeout(() => {
                overlays.forEach(overlay => {
                    overlay.style.display = "none";
                    overlay.classList.remove('closing');
                });
                
                containers.forEach(container => {
                    container.style.display = "none";
                    container.classList.remove('closing');
                });
                resolve(); // Resolve the promise when closing is complete
            }, 300); // Duration of transition (should match CSS)
        });
    }

    // Event listeners to open forms
    if (registrar) {
        registrar.addEventListener("click", async () => {
            await closeForm(); // Wait for form to close completely
            showForm(overlay_sign_up, contenedor_sign_up);
        });
    }

    if (registrarFooter) {
        registrarFooter.addEventListener("click", async () => {
            await closeForm();
            showForm(overlay_sign_in, contenedor_sign_in);
        });
    }

    btnRegistrar.addEventListener("click", async () => {
        await closeForm();
        showForm(overlay_sign_up, contenedor_sign_up);
    });

    if (inicio) {
        inicio.addEventListener("click", async () => {
            await closeForm();
            showForm(overlay_sign_in, contenedor_sign_in);
        });
    }

    // Event listeners to close when clicking on overlay
    overlay_sign_up.addEventListener("click", (event) => {
        if (event.target === overlay_sign_up) {
            closeForm();
        }
    });

    overlay_sign_in.addEventListener("click", (event) => {
        if (event.target === overlay_sign_in) {
            closeForm();
        }
    });

    document.querySelector('.volver-registrarse').addEventListener('click', async () => {
        await closeForm();
        showForm(overlay_sign_up, contenedor_sign_up);
    });

    document.querySelector('.volver-iniciar-sesion').addEventListener('click', async () => {
        await closeForm();
        showForm(overlay_sign_in, contenedor_sign_in);
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

// //JS HOME
function closeForm() {
    //Se cierra cualquier formulario que esté abierto
    overlay_sign_up.style.display = "none";
    contenedor_sign_up.style.display = "none";
    overlay_sign_in.style.display = "none";
}

const urlParams = new URLSearchParams(window.location.search);
console.log(urlParams);

function showForm(overlay, container) {
    // Primero mostramos los elementos con display flex/block pero con opacidad 0
    overlay.style.display = "flex";
    container.style.display = "block";
    
    // Forzamos un reflow para asegurarnos que los cambios de display se apliquen
    void overlay.offsetWidth;
    
    // Añadimos las clases que activarán las transiciones
    overlay.classList.add('active');
    container.classList.add('active');
    
    // Eliminamos las clases de cierre si estuvieran presentes
    overlay.classList.remove('closing');
    container.classList.remove('closing');
}

if (urlParams.get('showLogin') === 'true') {
    closeForm();
    setTimeout(() => {
        showForm(overlay_sign_in, contenedor_sign_in);
    }, 310);
}

if (urlParams.get('showSignUp') === 'true') {
    closeForm();
    setTimeout(() => {
        showForm(overlay_sign_up, contenedor_sign_up);
    }, 310);
}

const monitorContainer = document.querySelector('.team');
const monitorPic = monitorContainer.querySelector('img');
const monitorName = monitorContainer.querySelector('h5');
const monitorDescription = monitorContainer.querySelector('.team-info p');

fetch(`http://127.0.0.1:8000/api/monitors`)
    .then(response => {
        return response.json();
    })
    .then(data => {

        console.log(data);
        
        const lastMonitorIndex = data.length - 1;

        console.log(data[lastMonitorIndex].id);
        
        monitorName.innerText = `${data[lastMonitorIndex].name} ${data[lastMonitorIndex].lastname}`;
        monitorDescription.innerText = data[lastMonitorIndex].description;

        const info = {
            role: 'monitor',
            role_id: data[lastMonitorIndex].id
        }

        console.log(info);
        

        fetch(`http://127.0.0.1:8000/api/get_user_pic`, {
            method: 'POST', //Método para enviar los datos al servidor
            headers: {
                'Content-Type': 'application/json' //Envío de datos en formato JSON
            },
            body: JSON.stringify(info) //Se convierte el objeto JS a una cadena JSON
        })
            .then(response => {
                console.log(response);
                

                return response.json();
            })
            .then(dataMonitor => {
                console.log(dataMonitor);
                

                if (dataMonitor.url) {
                    monitorPic.src = dataMonitor.url;
                } else {
                    monitorPic.src = 'https://campamento-tesoro-perdido-image-hosting.fra1.cdn.digitaloceanspaces.com/icons/default-profile2.png';
                }
            })
            .catch(error => {
                console.log(error);

            })


    })
    .catch(error => {
        console.log(error);

    })


// const cardsActivities = [...document.querySelectorAll('.cards-container .card')];
const cardsContainer = document.querySelector('.cards-container');

fetch(`http://127.0.0.1:8000/api/activities`)
    .then(response => {
        return response.json();
    })
    .then(activities => {
        for (let i = 0; i < 3; i++) {
            const element = activities[i];

            const card = document.createElement('div');
            card.className = 'card';
            
            const cardImageContainer = document.createElement('figure');
            const cardImage = document.createElement('img');

            cardImage.src = element.url_pic;

            cardImageContainer.appendChild(cardImage);

            card.appendChild(cardImageContainer);

            const cardTextsContainer = document.createElement('div');
            const cardTextsTitle = document.createElement('h6');
            const cardTextsContent = document.createElement('p');

            cardTextsTitle.innerText = element.name;
            cardTextsContent.innerText = element.description;

            cardTextsContainer.appendChild(cardTextsTitle);
            cardTextsContainer.appendChild(cardTextsContent);

            card.appendChild(cardTextsContainer);

            cardsContainer.appendChild(card);
        }
    })
