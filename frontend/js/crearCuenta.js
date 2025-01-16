const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const rememberInput = document.querySelector('#remember');
const formSignUp = document.querySelector('form');

function validator(e, regex, errorString) {
    const element = e.target;
    const inputValue = element.value;
    const parentElement = element.parentElement;

    if(!(regex.test(inputValue) || inputValue == null)) {
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


    if(!(regex.test(inputValue) || inputValue == null)) {
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

    if (emailValidator && passwordValidator) {
        console.log("Registro exitoso");
    } else {
        console.log("Registro fallido");
    }
})