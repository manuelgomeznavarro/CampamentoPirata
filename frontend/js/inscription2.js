const form = document.querySelector('form');

form.addEventListener('submit', function (event) {
    event.preventDefault();
    validateForm();
});


const nextButton = document.querySelector('#nextButton');
const errorName = document.querySelector('#errorName');
const errorLastName = document.querySelector('#errorLastName');
const errorBorn = document.querySelector('#errorBorn');
const errorSize = document.querySelector('#errorSize');


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


document.getElementById("born").addEventListener("blur", validateBorn);

function validateBorn() {
    const born = document.querySelector('#born').value.trim();
    const bornDate = new Date(born);
    const currentDate = new Date();
    const sevenYearsAgo = new Date();
    const eigthYearsAgo = new Date();
    sevenYearsAgo.setFullYear(currentDate.getFullYear() - 7);
    eigthYearsAgo.setFullYear(currentDate.getFullYear() - 8);

    if (isNaN(bornDate.getTime()) || bornDate > sevenYearsAgo || bornDate < eigthYearsAgo) {
        errorBorn.style.color = "red";
        errorBorn.innerHTML = "Introduzca una fecha válida de hace al menos siete años.";
        return false;
    } else {
        errorBorn.innerHTML = "";
        return true;
    }
}

document.getElementById("size").addEventListener("blur", validateSize);

function validateSize() {
    const size = document.querySelector('#size').selectedIndex;
    console.log(size);
    if (size == null || size == 0) {
        errorSize.style.color = "red";
        errorSize.innerHTML = "Introduzca una talla válida.";
        return false;
    } else {
        errorSize.innerHTML = "";
        return true;
    }
}



function validateForm() {

    const isNameCorrect = validateName();
    const isLastNameCorrect = validateLastName();
    const isBornCorrect = validateBorn();
    const isSizeCorrect = validateSize();

    if (isNameCorrect && isLastNameCorrect && isBornCorrect && isSizeCorrect) {
        return true;
    } else {
        return false;
    }
}


