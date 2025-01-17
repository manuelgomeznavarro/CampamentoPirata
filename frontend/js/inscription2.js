// Función para añadir validaciones a un formulario
function addValidationToForm(form) {
    const errorName = form.querySelector('#errorName');
    const errorLastName = form.querySelector('#errorLastName');
    const errorBorn = form.querySelector('#errorBorn');
    const errorSize = form.querySelector('#errorSize');

    form.querySelector('#name').addEventListener('blur', () => {
        const name = form.querySelector('#name').value.trim();
        if (name === "") {
            errorName.style.color = "red";
            errorName.textContent = "Por favor, introduzca un nombre.";
        } else {
            errorName.textContent = "";
        }
    });

    form.querySelector('#lastName').addEventListener('blur', () => {
        const lastName = form.querySelector('#lastName').value.trim();
        if (lastName === "") {
            errorLastName.style.color = "red";
            errorLastName.textContent = "Por favor, introduzca un apellido.";
        } else {
            errorLastName.textContent = "";
        }
    });

    form.querySelector('#born').addEventListener('blur', () => {
        const born = form.querySelector('#born').value.trim();
        const bornDate = new Date(born);
        const currentDate = new Date();
        const sevenYearsAgo = new Date();
        const eigthYearsAgo = new Date();
        sevenYearsAgo.setFullYear(currentDate.getFullYear() - 7);
        eigthYearsAgo.setFullYear(currentDate.getFullYear() - 8);

        if (isNaN(bornDate.getTime()) || bornDate > sevenYearsAgo || bornDate < eigthYearsAgo) {
            errorBorn.style.color = "red";
            errorBorn.textContent = "Introduzca una fecha válida de hace al menos siete años.";
        } else {
            errorBorn.textContent = "";
        }
    });

    form.querySelector('#size').addEventListener('blur', () => {
        const size = form.querySelector('#size').selectedIndex;
        if (size == null || size === 0) {
            errorSize.style.color = "red";
            errorSize.textContent = "Introduzca una talla válida.";
        } else {
            errorSize.textContent = "";
        }
    });
}

// Selecciona el formulario inicial y botón de añadir participante
const form = document.querySelector('form');
const newParticipantBtn = document.querySelector('.new-participant-btn');
const formContainer = document.querySelector('.forms-container');

// Inicializa la validación para el formulario inicial
addValidationToForm(form);

// Clonar y añadir validación a nuevos formularios
newParticipantBtn.addEventListener('click', () => {
    const lastForm = formContainer.querySelector('form:last-of-type');
    const newForm = lastForm.cloneNode(true);

    // Limpia los valores de los inputs
    newForm.querySelectorAll('input, select').forEach((input) => {
        if (input.type !== "button") {
            input.value = "";
        }
    });

    // Añade el nuevo formulario al contenedor
    formContainer.appendChild(newForm);

    // Añade validación al nuevo formulario
    addValidationToForm(newForm);
});
