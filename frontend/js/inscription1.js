const form = document.querySelector('form');

form.addEventListener('submit', function (event) {
    event.preventDefault();
    validateForm();
});



// const name = document.querySelector('#name').value.trim();
// const lastName = document.querySelector('#lastName').value.trim();
// const email = document.querySelector('#email').value;
// const dni = document.querySelector('#dni').value;
// const phone1 = document.querySelector('#phone1').value.trim();
// const phone2 = document.querySelector('#phone2').value.trim();
// const city = document.querySelector('#city').value;
// const postalCode = document.querySelector('#postalCode').value;
const nextButton = document.querySelector('#nextButton');
const errorName = document.querySelector('#errorName');
const errorLastName = document.querySelector('#errorLastName');
const errorEmail = document.querySelector('#errorEmail');
const errorDni = document.querySelector('#errorDni');
const errorPhone1 = document.querySelector('#errorPhone1');
const errorPhone2 = document.querySelector('#errorPhone2');
const errorCity = document.querySelector('#errorCity');
const errorPostalCode = document.querySelector('#errorPostalCode');

validateEmail();

document.getElementById("name").addEventListener("blur", validateName);

function validateName() {
    // console.log("1nombre");
    const name = document.querySelector('#name').value.trim();
    if (name == "") {
        // console.log("2nombre");
        errorName.style.color = "red";
        errorName.innerHTML = "Por favor, introduzca un nombre.";
        return false;
    } else {
        errorName.innerHTML = "";
        // console.log("3nombre");
        return true;
    }
}

document.getElementById("lastName").addEventListener("blur", validateLastName);

function validateLastName() {
    const lastName = document.querySelector('#lastName').value.trim();
    if (lastName === "") {
        errorLastName.style.color = "red";
        errorLastName.innerHTML = "Por favor, introduzca un apellido.";
        return false;
    } else {
        errorLastName.innerHTML = "";
        return true;
    }
}

document.getElementById("email").addEventListener("blur", validateEmail);

function validateEmail() {
    const email = document.getElementById("email").value.trim();
    const emailRegex = /^[\w._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(email)) {
        console.log("El email no es válido.");
        errorEmail.style.color = "red";
        errorEmail.innerHTML = "Introduzca un email correcto.";
        return false;
    } else {
        console.log("Email válido.");
        errorEmail.innerHTML = "";
        return true;
    }
}

document.getElementById("phone1").addEventListener("blur", validatePhones);

function validatePhones() {
    const phoneRegex = /^[0-9]{9}$/;
    const phone1 = document.querySelector('#phone1').value.trim();
    const phone2 = document.querySelector('#phone2').value.trim();
    if (!phoneRegex.test(phone1)) {
        errorPhone1.style.color = "red";
        errorPhone1.innerHTML = "Introduzca un teléfono válido.";
        return false;
    } else {
        errorPhone1.innerHTML = "";
        return true;
    }
    if (phone2 !== "" && !phoneRegex.test(phone2)) {
        errorPhone2.style.color = "red";
        errorPhone2.innerHTML = "Introduzca un teléfono válido.";
        return false;
    }
    return true;
}

document.getElementById("dni").addEventListener("blur", validateDni);

function validateDni() {
    const dni = document.querySelector('#dni').value;
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

document.getElementById("city").addEventListener("blur", validateCity);

function validateCity() {
    const city = document.querySelector('#city').value;
    if (city == "") {
        errorCity.style.color = "red";
        errorCity.innerHTML = "Por favor, introduzca una ciudad.";
        return false;
    } else {
        errorCity.innerHTML = "";
        return true;
    }
}

document.getElementById("postalCode").addEventListener("blur", validatePostalCode);

function validatePostalCode() {
    const postalCodeRegex = /^[0-9]{5}$/;
    const postalCode = document.querySelector('#postalCode').value;
    if (!postalCodeRegex.test(postalCode)) {
        errorPostalCode.style.color = "red";
        errorPostalCode.innerHTML = "Introduzca un código postal válido.";
        return false;
    } else {
        errorPostalCode.innerHTML = "";
        return true;
    }
}

function validateForm() {

    const isNameCorrect = validateName();
    const isLastNameCorrect = validateLastName();
    const isEmailCorrect = validateEmail();
    const isPhoneCorrect = validatePhones();
    const isDniCorrect = validateDni();
    const isValidateCityCorrect = validateCity();
    const isPostalCodeCorrect = validatePostalCode();

    if (isNameCorrect && isLastNameCorrect && isEmailCorrect && isPhoneCorrect && isDniCorrect && isValidateCityCorrect && isPostalCodeCorrect) {
        return true;
    } else {
        return false;
    }
}


