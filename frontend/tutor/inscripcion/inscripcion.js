document.addEventListener('DOMContentLoaded', () => {
    function checkRole() {
        const role = localStorage.getItem('role');

        if (role) {
            switch (role) {
                case 'tutor':
                    const headerBtnsContainer = document.querySelector('header .header-btns-container');

                    const reservationBtn = document.createElement('a');
                    reservationBtn.classList.add('anchor-button');
                    reservationBtn.href = './tutor/inscripcion/inscripcion.html';
                    reservationBtn.innerText = 'Reserva';

                    const tutorProfilePicContainer = document.createElement('figure');
                    const tutorProfilePic = document.createElement('img');
                    tutorProfilePic.src = 'https://placehold.co/40x40';

                    tutorProfilePicContainer.appendChild(tutorProfilePic);

                    headerBtnsContainer.innerHTML = "";
                    headerBtnsContainer.appendChild(reservationBtn);
                    headerBtnsContainer.appendChild(tutorProfilePicContainer);

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

    const stepsWrapper = document.querySelector('.steps-wrapper');
    const steps = Array.from(document.querySelectorAll('.step'));
    const siguienteStep1 = document.querySelector('#siguiente-step1');
    let currentStep = 0;

    function updateStepPosition() {
        stepsWrapper.style.transform = `translateX(-${currentStep * 100}%)`;
        steps.forEach((step, index) => {
            step.classList.toggle('active', index === currentStep);
        });


    }

    // Añadir este código en la sección de inicialización
    document.querySelectorAll('input[name="plan"]').forEach(radio => {
        radio.addEventListener('change', () => {
            validarPricesCards();
        });
    });

    document.addEventListener('click', (e) => {
        if (e.target.matches('.volver')) {
            e.preventDefault();
            if (currentStep > 0) {
                currentStep--;
                updateStepPosition();
            }
        }
    });


    const name = document.querySelector('#tutor-name').value.trim();
    const lastname = document.querySelector('#tutor-lastname').value.trim();
    const email = document.querySelector('#tutor-email-inscription').value.trim();
    const dni = document.querySelector('#tutor-dni').value.trim();
    const tel1 = document.querySelector('#tutor-tel1').value.trim();
    const tel2 = document.querySelector('#tutor-tel2').value.trim();
    const city = document.querySelector('#tutor-city').value.trim();
    const postalCode = document.querySelector('#tutor-postal-code').value.trim();
    const nameError = document.querySelector('#error-tutor-name');
    const lastnameError = document.querySelector('#error-tutor-lastname');
    const emailError = document.querySelector('#error-tutor-email');
    const dniError = document.querySelector('#error-tutor-dni');
    const tel1Error = document.querySelector('#error-tutor-tel1');
    const tel2Error = document.querySelector('#error-tutor-tel2');
    const postalCodeError = document.querySelector('#error-tutor-postal-code');

    //validar nombre
    const nameRegex = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
    const inputName = document.querySelector('#tutor-name');
    inputName.addEventListener('blur', () => {
        if (nameRegex.test(inputName.value)) {
            inputName.classList.remove('error');
            nameError.textContent = '';
        } else {
            inputName.classList.add('error');
            nameError.textContent = 'El nombre no es válido';
        }
    });

    //validar apellido
    const lastnameRegex = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
    const inputLastname = document.querySelector('#tutor-lastname');
    inputLastname.addEventListener('blur', () => {
        if (lastnameRegex.test(inputLastname.value)) {
            inputLastname.classList.remove('error');
            lastnameError.textContent = '';
        } else {
            inputLastname.classList.add('error');
            lastnameError.textContent = 'El apellido no es válido';
        }
    });

    //validar dni
    const dniRegex = /^[0-9]{8}[A-Za-z]$/;
    const inputDni = document.querySelector('#tutor-dni');
    inputDni.addEventListener('blur', () => {
        if (dniRegex.test(inputDni.value)) {
            inputDni.classList.remove('error');
            dniError.textContent = '';
        } else {
            inputDni.classList.add('error');
            dniError.textContent = 'El DNI no es válido. Introduzca 8 dígitos y una letra';
        }
    });

    //Validar email
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const inputEmail = document.querySelector('#tutor-email-inscription');
    if (inputEmail) {
        inputEmail.addEventListener('blur', () => {
            if (emailRegex.test(inputEmail.value)) {
                inputEmail.classList.remove('error');
                emailError.textContent = '';
            } else {
                inputEmail.classList.add('error');
                emailError.textContent = 'El email no es válido';
            }
        });
    }

    //Validar telefono1
    const phoneRegex = /^[0-9]{9}$/;
    const inputTel1 = document.querySelector('#tutor-tel1');
    inputTel1.addEventListener('blur', () => {
        if (phoneRegex.test(inputTel1.value)) {
            inputTel1.classList.remove('error');
            tel1Error.textContent = '';
        } else {
            inputTel1.classList.add('error');
            tel1Error.textContent = 'El teléfono no es válido. Introduzca 9 dígitos';
        }
    });

    //Validar telefono2
    const inputTel2 = document.querySelector('#tutor-tel2');
    inputTel2.addEventListener('blur', () => {
        if (inputTel2.value == "" || phoneRegex.test(inputTel2.value)) {
            inputTel2.classList.remove('error');
            tel2Error.textContent = '';
        } else {
            inputTel2.classList.add('error');
            tel2Error.textContent = 'El teléfono no es válido. Introduzca 9 dígitos';
        }
    });

    //Validar codigo postal
    const postalCodeRegex = /^[0-9]{5}$/;
    const inputPostalCode = document.querySelector('#tutor-postal-code');
    inputPostalCode.addEventListener('blur', () => {
        if (inputPostalCode.value == "" || postalCodeRegex.test(inputPostalCode.value)) {
            inputPostalCode.classList.remove('error');
            postalCodeError.textContent = '';
        } else {
            inputPostalCode.classList.add('error');
            postalCodeError.textContent = 'El código postal no es válido. Introduzca 5 dígitos';
        }
    });

    //VALIDAR STEP 1
    function validarStep1() {

        const camposObligatorios = [
            'tutor-name',
            'tutor-lastname',
            'tutor-email-inscription',
            'tutor-dni',
            'tutor-tel1'
        ];

        let isValid = true;

        //Validar que los campos obligatorios no estén vacíos
        camposObligatorios.forEach(id => {
            const input = document.querySelector(`#${id}`);
            if (input && input.value.trim() === "") {
                isValid = false;
                input.style.border = '2px solid red';
                if (id === 'tutor-name') {
                    nameError.textContent = 'El nombre es obligatorio';
                } else if (id === 'tutor-lastname') {
                    lastnameError.textContent = 'El apellido es obligatorio';
                } else if (id === 'tutor-email-inscription') {
                    emailError.textContent = 'El email es obligatorio';
                } else if (id === 'tutor-dni') {
                    dniError.textContent = 'El DNI es obligatorio';
                } else if (id === 'tutor-tel1') {
                    tel1Error.textContent = 'El teléfono es obligatorio';
                }
            } else if (input) {
                input.style.border = '1px solid #ccc';
            }
        });

        const inputTel1 = document.querySelector('#tutor-tel1');
        inputTel1.addEventListener('input', () => {
            if (phoneRegex.test(inputTel1.value)) {
                inputTel1.classList.remove('error');
                tel1Error.textContent = '';
            } else {
                inputTel1.classList.add('error');
                tel1Error.textContent = 'El teléfono no es válido. Introduzca 9 dígitos';
            }
        });


        //validar telf2, al ser opcional, tiene que tener 9 digitos en caso de que lo escriba, pero no es obligatorio, es decir, puede estar vacío
        if (tel2 !== "") {
            if (!phoneRegex.test(tel2)) {
                isValid = false;
                document.querySelector('#tutor-tel2').classList.add('error');
                tel2Error.textContent = 'El teléfono no es válido. Introduzca 9 dígitos';
            } else {
                document.querySelector('#tutor-tel2').classList.remove('error');
            }
        } else {
            document.querySelector('#tutor-tel2').classList.remove('error');
        }

        const inputTel2 = document.querySelector('#tutor-tel2');
        inputTel2.addEventListener('input', () => {
            if (phoneRegex.test(inputTel2.value)) {
                inputTel2.classList.remove('error');
                tel2Error.textContent = '';
            } else {
                inputTel2.classList.add('error');
                tel2Error.textContent = 'El teléfono no es válido. Introduzca 9 dígitos';
            }
        });

        const inputDni = document.querySelector('#tutor-dni');
        inputDni.addEventListener('input', () => {
            if (dniRegex.test(inputDni.value)) {
                inputDni.classList.remove('error');
                dniError.textContent = '';
            } else {
                inputDni.classList.add('error');
                dniError.textContent = 'El DNI no es válido. Introduzca 8 dígitos y una letra';
            }
        });

        if (postalCode !== "") {
            const postalCodeRegex = /^[0-9]{5}$/;
            if (!postalCodeRegex.test(postalCode)) {
                isValid = false;
                document.querySelector('#tutor-postal-code').classList.add('error');
                postalCodeError.textContent = 'El código postal no es válido. Introduzca 5 dígitos';
            } else {
                document.querySelector('#tutor-postal-code').classList.remove('error');
            }
        } else {
            document.querySelector('#tutor-postal-code').classList.remove('error');
        }

        const inputPostalCode = document.querySelector('#tutor-postal-code');
        inputPostalCode.addEventListener('input', () => {
            if (postalCodeRegex.test(inputPostalCode.value)) {
                inputPostalCode.classList.remove('error');
                postalCodeError.textContent = '';
            } else {
                inputPostalCode.classList.add('error');
                postalCodeError.textContent = 'El código postal no es válido. Introduzca 5 dígitos';
            }
        });

        return isValid;

    }

    siguienteStep1.addEventListener('click', (e) => {
        e.preventDefault();
        if (validarStep1()) {
            if (currentStep < steps.length - 1) {
                currentStep++;
                updateStepPosition();
            }
        }
    });

    //VALIDAR STEP 2

    // const nameChild = document.querySelector('#child-name').value.trim();
    // const lastnameChild = document.querySelector('#child-lastname').value.trim();
    // const birthdate = document.querySelector('#child-boen-date').value.trim();

    const nameErrorChild = document.querySelector('#error-child-name');
    const lastnameErrorChild = document.querySelector('#error-child-lastname');
    const bornDateErrorChild = document.querySelector('#error-child-born-date');
    const tShirtSizeErrorChild = document.querySelector('#error-child-t-shirt-size');

    const tShirtSize = document.querySelector('#child-t-shirt-size');

    function validarStep2() {

        const camposObligatorios = [
            'child-name',
            'child-lastname',
            'child-born-date',
            'child-t-shirt-size'
        ];

        let isValid = true;

        //Validar que los campos obligatorios no estén vacíos
        camposObligatorios.forEach(id => {
            const input = document.querySelector(`#${id}`);
            if (input && input.value.trim() === "") {
                isValid = false;
                input.style.border = '2px solid red';
                if (id === 'child-name') {
                    nameErrorChild.textContent = 'El nombre es obligatorio';
                } else if (id === 'child-lastname') {
                    lastnameErrorChild.textContent = 'El apellido es obligatorio';
                } else if (id === 'child-born-date') {
                    bornDateErrorChild.textContent = 'La fecha de nacimiento es obligatoria';
                }
            } else if (input && id === 'child-t-shirt-size' && input.selectedIndex == 0) {
                isValid = false;
                tShirtSizeErrorChild.textContent = 'La talla de camiseta es obligatoria';
            } else if (input) {
                input.style.border = '1px solid #ccc';
            }
        });

        return isValid;

    }

    const siguienteStep2 = document.querySelector('#siguiente-step2');
    siguienteStep2.addEventListener('click', (e) => {
        e.preventDefault();
        if (validarStep2()) {
            if (currentStep < steps.length - 1) {
                currentStep++;
                updateStepPosition();
            }
        }
    });

    //validar nombre
    const nameRegexChild = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
    const inputNameChild = document.querySelector('#child-name');
    inputNameChild.addEventListener('blur', () => {
        if (nameRegexChild.test(inputNameChild.value)) {
            inputNameChild.classList.remove('error');
            nameErrorChild.textContent = '';
        } else {
            inputNameChild.classList.add('error');
            nameErrorChild.textContent = 'El nombre no es válido';
        }
    });

    //validar apellido
    const lastnameRegexChild = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
    const inputLastnameChild = document.querySelector('#child-lastname');
    inputLastnameChild.addEventListener('blur', () => {
        if (lastnameRegexChild.test(inputLastnameChild.value)) {
            inputLastnameChild.classList.remove('error');
            lastnameErrorChild.textContent = '';
        } else {
            inputLastnameChild.classList.add('error');
            lastnameErrorChild.textContent = 'El apellido no es válido';
        }
    });

    //validar fecha de nacimiento del niño, que debe haber nacido entre 2017 y 2018
    const birthdateRegex = /^((2017|2018)-\d{2}-\d{2})$/;
    const inputBirthdate = document.querySelector('#child-born-date');
    inputBirthdate.addEventListener('blur', () => {
        if (birthdateRegex.test(inputBirthdate.value)) {
            inputBirthdate.classList.remove('error');
            bornDateErrorChild.textContent = '';
        } else {
            inputBirthdate.classList.add('error');
            bornDateErrorChild.textContent = 'La fecha de nacimiento no es válida. Debe haber nacido entre 2017 y 2018';
        }
    });

    tShirtSize.addEventListener('blur', (e) => {
        if (e.target.selectedIndex == 0) {
            tShirtSize.classList.add('error');
            tShirtSizeErrorChild.textContent = 'La talla de camiseta es obligatoria';
        } else {
            inputBirthdate.classList.remove('error');
            tShirtSizeErrorChild.textContent = '';
        }
    });


    function validarPricesCards() {
        const radioInputs = [...document.querySelectorAll('input[name="plan"]')];
        let isValid = radioInputs.some(radio => radio.checked);

        const existingError = inscriptionsPricesContainer.querySelector('.plan-error');

        if (!isValid) {
            if (!existingError) {
                const errorPriceCards = document.createElement('span');
                errorPriceCards.style.color = "red";
                errorPriceCards.textContent = "¡Selecciona un plan!";
                errorPriceCards.classList.add('plan-error');
                inscriptionsPricesContainer.appendChild(errorPriceCards);
            }
        } else {
            if (existingError) {
                existingError.remove();
            }
        }

        return isValid;
    }

    const inscriptionsPricesContainer = document.querySelector('.incription-prices');
    const insertSummaryDataBtn = document.querySelector('#insert-summary-data-btn');
    const form = document.querySelector('form');



    insertSummaryDataBtn.addEventListener('click', (e) => {
        e.preventDefault();

        if (validarPricesCards()) {
            const formInputs = [...form.querySelectorAll('input, select')];
            const summaryParagraphs = [...document.querySelectorAll('.inscription-summary-cards-container p')];

            console.log([formInputs, summaryParagraphs]);
            

            // Handle selected plan (Step 3 radio buttons)
            const selectedPlan = document.querySelector('input[name="plan"]:checked');
            if (selectedPlan) {
                const planTitle = selectedPlan.closest('.price-card-label').querySelector('.plan-title').textContent;
                summaryParagraphs[8].textContent = planTitle;
            }

            // Populate other fields
            for (let i = 0; i < summaryParagraphs.length; i++) {
                if (i === 8) continue; // Skip plan summary handled above

                if (i < 8) {
                    // Tutor data (formInputs 0-7)
                    summaryParagraphs[i].textContent = formInputs[i].value;
                } else {
                    // Niño data (formInputs 8-14 correspond to summary i 9-15)
                    const formIndex = i; // Adjust index for niño inputs
                    summaryParagraphs[i].textContent = formInputs[formIndex]?.value || '';
                }
            }

            // console.log(steps);

            if (currentStep < steps.length - 1) {
                currentStep++;
                updateStepPosition();
            }
        }
    });

    function updateTutorInfo(formData, tutorId) {
        formData.append('_method', 'PUT');
        return fetch(`http://127.0.0.1:8000/api/tutors/${tutorId}`, {
            method: 'POST', //Método para enviar los datos al servidor
            body: formData
        })
            .then(response => {
                console.log(response);
                

                // if (!response.success) {
                //     throw new Error('Error al registrar el usuario');
                // }
                return response.json();
            })
            .then(data => {
                console.log(data);
                
                console.log("Información del tutor actualizada con éxito", data);
                // localStorage.setItem('role', data.user.role);
                // localStorage.setItem('role_id', data.user.role_id);
            })
            .catch(error => {
                console.error('Error al actualizar los datos del tutor', error);
            });
    }

    function createChild(childData) {
        return fetch(`http://127.0.0.1:8000/api/children`, {
            method: 'POST', //Método para enviar los datos al servidor
            headers: {
                'Content-Type': 'application/json' //Envío de datos en formato JSON
            },
            body: JSON.stringify(childData) //Se convierte el objeto JS a una cadena JSON
        })
            .then(response => {
                // if (!response.success) {
                //     throw new Error('Error al registrar el usuario');
                // }
                return response.json();
            })
            .then(data => {
                console.log("Niño creado con éxito", data);
                // localStorage.setItem('role', data.user.role);
                // localStorage.setItem('role_id', data.user.role_id);
                return data.id;
            })
            .catch(error => {
                console.error('Error al crear al niño', error);
            });
    }

    function createInscription(inscriptionData) {
        return fetch(`http://127.0.0.1:8000/api/inscriptions`, {
            method: 'POST', //Método para enviar los datos al servidor
            headers: {
                'Content-Type': 'application/json' //Envío de datos en formato JSON
            },
            body: JSON.stringify(inscriptionData) //Se convierte el objeto JS a una cadena JSON
        })
            .then(response => {
                // if (!response.success) {
                //     throw new Error('Error al registrar el usuario');
                // }
                return response.json();
            })
            .then(data => {
                console.log("Inscripción creada con éxito", data);
                // localStorage.setItem('role', data.user.role);
                // localStorage.setItem('role_id', data.user.role_id);
            })
            .catch(error => {
                console.error('Error al crear la Inscripción', error);
            });
    }



    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (e.submitter.className === 'volver') {
            return;
        }

        const summaryParagraphs = [...document.querySelectorAll('.inscription-summary-cards-container p')];

        const tutorInfo = {
            name: summaryParagraphs[0].innerText,
            lastname: summaryParagraphs[1].innerText,
            dni: summaryParagraphs[3].innerText,
            phone: summaryParagraphs[4].innerText,
            phone2: summaryParagraphs[5].innerText,
            city: summaryParagraphs[6].innerText,
            postal_code: summaryParagraphs[7].innerText,
        }

        console.log(tutorInfo);

        const fileInput = document.getElementById('image-input');
        const file = fileInput.files[0];
        
        if (!file) {
            alert('Please select an image');
            return;
        }
        
        // Create form data for both file and JSON data
        const formData = new FormData();
        
        // Add the file
        formData.append('image', file);
        
        // Convert JSON to string and append to FormData
        formData.append('json_data', JSON.stringify(tutorInfo));

        const childInfo = {
            name: summaryParagraphs[9].innerText,
            lastname: summaryParagraphs[10].innerText,
            birthdate: summaryParagraphs[11].innerText,
            t_shirt_size: summaryParagraphs[12].innerText,
            alergy_intolerance: summaryParagraphs[13].innerText,
            aditional_info: summaryParagraphs[14].innerText,
            acquaintance: summaryParagraphs[15].innerText
        }

        console.log(childInfo);

        // console.log(formData.entries());
        for (const pair of formData.entries()) {
            console.log(pair[0], pair[1]);
            console.log(pair);
            
        }

        updateTutorInfo(formData, localStorage.getItem('role_id'))
            .then(createChild(childInfo)
                .then(childId => {
                    console.log(childId);

                    const inscripcionInfo = {
                        inscription_date: new Date(Date.now()).toISOString().split('T')[0],
                        tutor_id: localStorage.getItem('role_id'),
                        child_id: childId
                    }

                    createInscription(inscripcionInfo)
                })
            )
    })

    //Fetch para obtener los datos de las tarifas de la BBDD
    fetch('http://127.0.0.1:8000/api/prices')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error `);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            data.forEach((item, index) => {
                console.log(`ID: ${item.id}, Nombre Tarifa: ${item.name}, Precio: ${item.price}`);
                console.log(index);
                const tarifaCards = document.querySelectorAll('.plan-card');
                if (index < tarifaCards.length) {
                    const tarifaCard = tarifaCards[index];
                    const titleElement = tarifaCard.querySelector('.plan-title');
                    const priceElement = tarifaCard.querySelector('.plan-price');
                    // const buttonsave = tarifaCard.querySelector('button');
                    titleElement.textContent = item.name;
                    priceElement.textContent = item.price;
                    // buttonsave.value = item.id;
                }
            })
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
        });

});