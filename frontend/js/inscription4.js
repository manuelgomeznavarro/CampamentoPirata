const form = document.querySelector('form');

form.addEventListener('submit', function (event) {

    event.preventDefault();
    validateForm();
});

const backButton = document.getElementById('backButton');
const payButton = document.getElementById('payButton');
const errorCreditCard = document.getElementById('errorCreditCard');
const errorName = document.getElementById('errorName');
const errorDate1 = document.getElementById('errorDate1');
const errorDate2 = document.getElementById('errorDate2');
const errorCvv = document.getElementById('errorCvv');
const chechbox = document.getElementById('remember');


document.getElementById('creditCard').addEventListener('blur', validateCreditCard);

function validateCreditCard() {
    const creditCard = document.getElementById('creditCard').value.trim();
    const creditRegex = /^[0-9]{16}$/;
    if (!creditRegex.test(creditCard)) {
        console.log("entra");
        errorCreditCard.style.color = "red";
        errorCreditCard.innerHTML = "Por favor, introduzca un número de tarjeta de crédito.";
        return false;
    } else {
        errorCreditCard.innerHTML = "";
        return true;
    }
}

document.getElementById('name').addEventListener('blur', validateName);

function validateName() {
    const name = document.getElementById('name').value.trim();
    if (name == "") {
        errorName.style.color = "red";
        errorName.innerHTML = "Por favor, introduzca un nombre.";
        return false;
    } else {
        errorName.innerHTML = "";
        return true;
    }
}

document.getElementById('date1').addEventListener('input', limitInputLength);
document.getElementById('date2').addEventListener('input', limitInputLength);

function limitInputLength(event) {
    const input = event.target;
    if (input.value.length > 2) {
        input.value = input.value.slice(0, 2);
    }
}

document.getElementById('date2').addEventListener('blur', validateDate1);

function validateDate1() {
    let isValidMonth = true;
    let isValidYear = true;
    const date1 = parseInt(document.getElementById('date1').value.trim(), 10);
    const date2 = parseInt(document.getElementById('date2').value.trim(), 10);

    const currentYear = new Date().getFullYear() % 100; //Con esto cojo los 2 últimos dígitos del año
    const currentMonth = new Date().getMonth() + 1;

    if (isNaN(date1) || date1 < 1 || date1 > 12) {
        errorDate1.style.color = "red";
        errorDate1.innerHTML = "Por favor, introduzca un mes válido.";
        isValidMonth = false;
    }

    if (isNaN(date2) || date2 < currentYear) {
        errorDate2.style.color = "red";
        errorDate2.innerHTML = "Por favor, introduzca un año válido.";
        isValidYear = false;
    }
    

    if (date2 === currentYear && date1 < currentMonth) {
        errorDate1.style.color = "red";
        errorDate1.innerHTML = "La fecha no puede ser anterior al actual.";
        isValidMonth = false;
        isValidYear = false;
    }

    if (isValidMonth) {
        errorDate1.innerHTML = "";
    }
    if (isValidYear) {
        errorDate2.innerHTML = "";
    }

    return isValidMonth && isValidYear;
    
}

document.getElementById('cvv').addEventListener('blur', validateCvv);

function validateCvv() {
    const cvvRegex = /^[0-9]{3}$/;
    const cvv = document.getElementById('cvv').value.trim();
    if (!cvvRegex.test(cvv)) {
        errorCvv.style.color = "red";
        errorCvv.innerHTML = "Por favor, introduzca un cvv válido.";
        return false;
    } else {
        errorCvv.innerHTML = "";
        return true;
    }
}

//!Aquí faltaría meter la lógica de la fecha de vencimiento, donde guardaremos los datos sensibles de la tarjeta de crédito en la BBDD
//document.getElementById('remember').addEventListener('click', validateCheckbox);


function validateForm() {
    const isNameCorrect = validateName();
    const isCreditCardCorrect = validateCreditCard();
    const isDate1Correct = validateDate1();
    const isCvvCorrect = validateCvv();

    if (isNameCorrect && isCreditCardCorrect && isDate1Correct && isCvvCorrect) {
        return true;
    } else {
        return false;
    }
}