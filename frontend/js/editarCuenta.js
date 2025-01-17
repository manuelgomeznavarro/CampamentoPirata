const form = document.querySelector('form');

form.addEventListener('submit', function (event) {
    event.preventDefault();
    validateForm();
});

const nextButton = document.querySelector('#nextButton');
const errorName = document.querySelector('#errorName');
const errorEmail = document.querySelector('#errorEmail');
const errorPhone1 = document.querySelector('#errorPhone1');
const errorPhone2 = document.querySelector('#errorPhone2');
const errorCity = document.querySelector('#errorCity');


document.getElementById("name").addEventListener("blur", validateName);

function validateName() {
    const name = document.querySelector('#name').value.trim();
    if (name == "") {
        errorName.style.color = "red";
        errorName.innerHTML = "Por favor, introduzca un nombre.";
        return false;
    } else {
        errorName.innerHTML = "";
        return true;
    }
}

document.getElementById("email").addEventListener("blur", validateEmail);

function validateEmail() {
    const email = document.getElementById("email").value.trim();
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

document.getElementById("phone1").addEventListener("blur", validatePhone1);

function validatePhone1() {
    const phoneRegex = /^[0-9]{9}$/;
    const phone1 = document.querySelector('#phone1').value.trim();
    if (!phoneRegex.test(phone1)) {
        errorPhone1.style.color = "red";
        errorPhone1.innerHTML = "Introduzca un teléfono válido.";
        return false;
    } else {
        errorPhone1.innerHTML = "";
        return true;
    }
}

document.getElementById("phone2").addEventListener("blur", validatePhone2);
function validatePhone2(){
    const phoneRegex = /^[0-9]{9}$/;
    const phone2 = document.querySelector('#phone2').value.trim();
    if (phone2 ==="") {
        errorPhone2.innerHTML = "";
        return true;
    }

    if(!phoneRegex.test(phone2)){
        errorPhone2.style.color = "red";
        errorPhone2.innerHTML = "Introduzca un teléfono válido.";
        return false;
    }

    else{
        errorPhone2.innerHTML = "";
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

function validateForm() {

    const isNameCorrect = validateName();
    const isEmailCorrect = validateEmail();
    const isPhoneCorrect1 = validatePhone1();
    const isPhoneCorrect2 = validatePhone2();
    const isValidateCityCorrect = validateCity();

    if (isNameCorrect && isEmailCorrect && isPhoneCorrect1 && isPhoneCorrect2 && isValidateCityCorrect) {
        return true;
    } else {
        return false;
    }
}


