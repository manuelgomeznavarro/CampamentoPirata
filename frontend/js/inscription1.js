const form = document.querySelector('form');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    validateForm();
});

const name = document.querySelector('#name').value.trim();
const lastName = document.querySelector('#lastName').value.trim();
const email = document.querySelector('#email').value;
const dni = document.querySelector('#dni').value;
const phone1 = document.querySelector('#phone1').value.trim();
const phone2 = document.querySelector('#phone2').value.trim();
const city = document.querySelector('#city').value;
const postalCode = document.querySelector('#postalCode').value;
const nextButton = document.querySelector('#nextButton');
const errorName = document.querySelector('#errorName');
const errorLastName = document.querySelector('#errorLastName');
const errorEmail = document.querySelector('#errorEmail');
const errorDni = document.querySelector('#errorDni');
const errorPhone1 = document.querySelector('#errorPhone1');
const errorPhone2 = document.querySelector('#errorPhone2');
const errorCity = document.querySelector('#errorCity');
const errorPostalCode = document.querySelector('#errorPostalCode');



function validateName(){
    if(name === ""){
        errorName.style.color = "red";
        errorName.innerHTML = "Por favor, introduzca un nombre.";
        return false;
    } else {
        errorName.innerHTML = "";
        return true;
    }
}

function validateLastName() {
    
    if (lastName === ""){    
        errorLastName.style.color = "red";
        errorLastName.innerHTML = "Por favor, introduzca un apellido.";
        return false;
    } else {
        errorLastName.innerHTML = "";
        return true;
    }
}

function validateEmail(){
    document.getElementById("email").addEventListener("blur", function () {
        let email = document.getElementById("email").value;
        if(!(/^[\w._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$/.test(email) || email == null)) {
            console.log("El email no es válido.");
            errorEmail.style.color = "red";
            errorEmail.innerHTML = "Introduzca un email correcto.";
            return false;
        } else {
            console.log("Email válido.");
            errorEmail.innerHTML = "";
            return true;
        }
        
    });
}

function validatePhones(){
        const phoneRegex = /^[0-9]{9}$/;
        if(!phoneRegex.test(phone1)){
            errorPhone1.style.color = "red";
            errorPhone1.innerHTML = "Introduzca un teléfono válido.";
            return false;
        }
        if(phone2 !== "" && !phoneRegex.test(phone2)){
            errorPhone2.style.color = "red";
            errorPhone2.innerHTML = "Introduzca un teléfono válido.";
            return false;
        }
        return true;
}

function validateDni(){
    const dniRegex = /^[0-9]{8}[A-Za-z]$/;
    if(!dniRegex.test(dni)){
        errorDni.style.color = "red";
        errorDni.innerHTML = "Introduzca un DNI válido.";
        return false;
    }
    return true;
}

function validateCity(){
    if(city === ""){
        errorCity.style.color = "red";
        errorCity.innerHTML = "Por favor, introduzca una ciudad.";
        return false;
    }
    return true;
}

function validatePostalCode(){
    const postalCodeRegex = /^[0-9]{5}$/;
    if(!postalCodeRegex.test(postalCode)){
        errorPostalCode.style.color = "red";
        errorPostalCode.innerHTML = "Introduzca un código postal válido.";
        return false;
    }
    return true;
}

function validateForm(){

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


