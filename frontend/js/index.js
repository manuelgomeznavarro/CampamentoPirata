document.addEventListener("DOMContentLoaded", function () {
    const inicio = document.getElementById("sign-in");
    const registrar = document.getElementById("sign-up");
    const overlay_sign_up = document.getElementById("overlay-sign-up");
    const contenedor_sign_up = document.getElementById("sign-up-container");
    const contenedor_sign_in = document.getElementById("sign-in-container");
    const overlay_sign_in = document.getElementById("overlay-sign-in");

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
            crearCuenta(userData);

        } else {
            console.log("Registro fallido");
        }
    })
    
    //FETCH SIGN UP
    function crearCuenta(userData) {
        fetch('http://127.0.0.1:8000/api/tutors', {
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
                console.log("Ciemta creada con éxito", data);
            })
            .catch(error => {
                console.error('Error al registrar el usuario', error);
            });
    }


    //JS SIGN IN

    document.addEventListener("DOMContentLoaded", function () {
        document.getElementById("email-sign-in").addEventListener("blur", function () {
            let email = document.getElementById("email-sign-in").value;
            if (!(/^[\w._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email) || email == null)) {
                console.log("El email no es válido.");
                // document.getElementById("email").focus();
                let errorEmail = document.getElementById("errorEmail");
                errorEmail.style.color = "red";
                errorEmail.innerHTML = "Introduzca un email correcto.";
            } else {
                console.log("Email válido.");
                let errorEmail = document.getElementById("errorEmail");
                errorEmail.innerHTML = "";
            }
        });

        document.getElementById("password-sign-in").addEventListener("blur", function () {
            let contra = document.getElementById("password-sign-in").value;
            if (!(/^(?=.[A-Z])(?=.[a-z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/.test(contra)) || contra == null) {
                console.log("No ha introducido la contraseña de forma correcta.")
                // document.getElementById("password").focus();
                let errorPassword = document.getElementById("errorPassword");
                errorPassword.style.color = "red";
                errorPassword.innerHTML = "Introduzca una contraseña correcta.";
            } else {
                console.log("Contraseña válida.");
                let errorPassword = document.getElementById("errorPassword");
                errorPassword.innerHTML = "";
            }
        });

        const form = document.getElementById("login");

        form.addEventListener("submit", function (event) {
            const error = document.getElementById("error");

            let email = document.getElementById("email-sign-in").value;
            if (!(/^[\w._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email) || email == null)) {
                console.log("El email no es válido.");
                // document.getElementById("email").focus();
                let errorEmail = document.getElementById("errorEmail");
                errorEmail.style.color = "red";
                errorEmail.innerHTML = "Introduzca un email correcto.";
            } else {
                console.log("Email válido.");
                let errorEmail = document.getElementById("errorEmail");
                errorEmail.innerHTML = "";
            }

            let contra = document.getElementById("password-sign-in").value;
            if (!(/^(?=.[A-Z])(?=.[a-z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/.test(contra)) || contra == null) {
                console.log("No ha introducido la contraseña de forma correcta.")
                // document.getElementById("password").focus();
                let errorPassword = document.getElementById("errorPassword");
                errorPassword.style.color = "red";
                errorPassword.innerHTML = "Introduzca una contraseña correcta.";
            } else {
                console.log("Contraseña válida.");
                let errorPassword = document.getElementById("errorPassword");
                errorPassword.innerHTML = "";
            }

            if (document.getElementById("errorEmail").innerHTML != "" || document.getElementById("errorPassword").innerHTML != "") {
                event.preventDefault();
            }
        });
    });
});
