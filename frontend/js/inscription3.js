const formPriceCards = document.querySelector('form');
const btnReturn = document.querySelector('#btn-return');

formPriceCards.addEventListener('submit', (e) => {
    e.preventDefault();

    const element = e.target;
    const radioInputs = [...formPriceCards.elements.plan];

    radioInputs.forEach(radioBtn => {
        if (!radioBtn.checked) {
            if (!(element.lastElementChild.tagName == "SPAN")) {
                const errorEmail = document.createElement('span');
                errorEmail.style.color = "red";
                errorEmail.textContent = "¡Seleccion un plan!";
    
                element.lastElementChild.after(errorEmail);
            }
        } else {
            if (element.lastElementChild.tagName == "SPAN") {
                element.lastElementChild.remove();
            }

            alert('PAGO');
        }
    });
    
})

btnReturn.addEventListener('click', () => {
    alert('PÁGINA ANTERIOR');
});