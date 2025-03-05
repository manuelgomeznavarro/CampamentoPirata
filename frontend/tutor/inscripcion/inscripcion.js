document.addEventListener('DOMContentLoaded', () => {
    // Get elements
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const nav = document.querySelector('header nav');
    const overlay = document.getElementById('overlay');
    const headerBtnsContainer = document.querySelector('.header-btns-container');

    // Function to check if mobile view is active
    function isMobileView() {
        return window.innerWidth <= 992;
    }

    // Function to update DOM for responsive layout
    function updateResponsiveLayout() {
        if (isMobileView()) {
            // Move buttons container into nav for mobile
            if (headerBtnsContainer.parentElement !== nav) {
                nav.appendChild(headerBtnsContainer);
            }
        } else {
            // Move buttons container back to header for desktop
            const header = document.querySelector('header');
            if (headerBtnsContainer.parentElement !== header) {
                header.appendChild(headerBtnsContainer);
            }
            
            // Reset mobile menu state
            hamburgerMenu.classList.remove('open');
            nav.classList.remove('open');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Initial setup
    updateResponsiveLayout();

    // Toggle mobile menu
    hamburgerMenu.addEventListener('click', function() {
        hamburgerMenu.classList.toggle('open');
        nav.classList.toggle('open');
        overlay.classList.toggle('active');
        
        // Prevent body scrolling when menu is open
        document.body.style.overflow = hamburgerMenu.classList.contains('open') ? 'hidden' : '';
    });

    // Close menu when clicking overlay
    overlay.addEventListener('click', function() {
        hamburgerMenu.classList.remove('open');
        nav.classList.remove('open');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Close menu when clicking a nav link
    const navLinks = document.querySelectorAll('header nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (isMobileView()) {
                hamburgerMenu.classList.remove('open');
                nav.classList.remove('open');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Handle window resize
    window.addEventListener('resize', updateResponsiveLayout);

    // Original checkRole function
    function checkRole() {
        const role = localStorage.getItem('role');

        if (role) {
            switch (role) {
                case 'tutor':
                    const headerBtnsContainer = document.querySelector('.header-btns-container');
                    const reservationBtn = document.createElement('a');
                    reservationBtn.classList.add('anchor-button');
                    reservationBtn.href = '../inscripcion/inscripcion.html';
                    reservationBtn.innerText = 'Inscripción';

                    const btnSalir = document.createElement('button');
                    btnSalir.className = "exit-button";
                    const imgSalir = document.createElement('img');
                    imgSalir.src = 'https://campamento-tesoro-perdido-image-hosting.fra1.cdn.digitaloceanspaces.com/icons/logout-icon2.png';
                    btnSalir.appendChild(imgSalir);

                    btnSalir.addEventListener('click', () => {
                        localStorage.removeItem('role');
                        localStorage.removeItem('role_id');
                        location.reload();
                    });

                    const tutorProfilePicContainer = document.createElement('figure');
                    const tutorProfilePic = document.createElement('img');

                    tutorProfilePicContainer.addEventListener('click', () => {
                        location.assign('../perfil_tutor/perfil_tutor.html');
                    });

                    fetch(`http://127.0.0.1:8000/api/get_user_pic`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            role: localStorage.getItem('role'),
                            role_id: localStorage.getItem('role_id')
                        })
                    })
                        .then(response => {
                            return response.json();
                        })
                        .then(data => {
                            if (data.url) {
                                tutorProfilePic.src = data.url;
                            } else {
                                tutorProfilePic.src = 'https://campamento-tesoro-perdido-image-hosting.fra1.cdn.digitaloceanspaces.com/icons/default-profile2.png';
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        });

                    tutorProfilePicContainer.appendChild(tutorProfilePic);

                    headerBtnsContainer.innerHTML = "";
                    headerBtnsContainer.appendChild(reservationBtn);
                    headerBtnsContainer.appendChild(tutorProfilePicContainer);
                    headerBtnsContainer.appendChild(btnSalir);
                    break;

                case 'monitor':
                    location.assign('../../monitor/html/dashboard.html');
                    break;

                case 'admin':
                    location.assign('../../admin/dashboard.html');
                    break;

                default:
                    break;
            }
        } else {
            location.assign('../../error/404.html');

            const inicio = document.getElementById("sign-in");
            const registrar = document.getElementById("sign-up");
        
            inicio.addEventListener('click', () => window.location.href = '../../index.html?showLogin=true');
            registrar.addEventListener('click', () => window.location.href = '../../index.html?showSignUp=true');
        }
    }

    checkRole();

    const select = document.querySelector("select");

    select.addEventListener("click", function () {
        this.classList.toggle("open");
    });

    const stepsWrapper = document.querySelector('.steps-wrapper');
    const steps = Array.from(document.querySelectorAll('.step'));
    const siguienteStep1 = document.querySelector('#siguiente-step1');
    let currentStep = 0;

    function updateStepPosition() {
        stepsWrapper.style.transform = `translateX(-${currentStep * 100}%)`;
        steps.forEach((step, index) => {
            step.classList.toggle('active', index === currentStep);
        });

         // Update progress line and steps
        const progressLine = document.querySelector('.progress-line');
        const stepItems = document.querySelectorAll('.step-item');
        
        // Calculate progress
        const progressWidth = (currentStep / (stepItems.length - 1)) * 100;
        progressLine.style.width = `${progressWidth}%`;

        stepItems.forEach((step, index) => {
            step.classList.toggle('completed', index <= currentStep);
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
    // const email = document.querySelector('#tutor-email-inscription').value.trim();
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
            inputName.style.border = "2px solid rgb(93, 226, 102)";  // Cambia el borde a verde
            inputName.style.boxShadow = "0 0 8px rgba(93, 226, 102, 0.5)";
        } else {
            inputName.classList.add('error');
            nameError.textContent = 'El nombre no es válido';
            // inputName.style.border = '2px solid red';
            // inputName.style.border = "rgb(226, 93, 93)";  // Cambia el borde a rojo
            inputName.style.boxShadow = "0 0 10px rgba(223, 93, 93, 0.5)";  // Añade sombra roja
            inputName.style.border =  "2px solid rgb(226, 93, 93)";
        }
    });

    //validar apellido
    const lastnameRegex = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
    const inputLastname = document.querySelector('#tutor-lastname');
    inputLastname.addEventListener('blur', () => {
        if (lastnameRegex.test(inputLastname.value)) {
            inputLastname.classList.remove('error');
            lastnameError.textContent = '';
            inputLastname.style.border = "2px solid rgb(93, 226, 102)";  // Cambia el borde a verde
            inputLastname.style.boxShadow = "0 0 8px rgba(93, 226, 102, 0.5)";  // Añade sombra verde
        } else {
            inputLastname.classList.add('error');
            lastnameError.textContent = 'El apellido no es válido';
            inputLastname.style.border = "2px solid rgb(226, 93, 93)";  // Cambia el borde a rojo
            inputLastname.style.boxShadow = "0 0 10px rgba(223, 93, 93, 0.5)";  // Añade sombra roja
        }
    });

    //validar dni
    const dniRegex = /^[0-9]{8}[A-Za-z]$/;
    const inputDni = document.querySelector('#tutor-dni');
    inputDni.addEventListener('blur', () => {
        if (dniRegex.test(inputDni.value)) {
            inputDni.classList.remove('error');
            dniError.textContent = '';
            inputDni.style.border = "2px solid rgb(93, 226, 102)";  // Cambia el borde a verde
            inputDni.style.boxShadow = "0 0 8px rgba(93, 226, 102, 0.5)";  // Añade sombra verde
        } else {
            inputDni.classList.add('error');
            dniError.textContent = 'El DNI no es válido. Introduzca 8 dígitos y una letra';
            inputDni.style.border = '2px solid rgb(226, 93, 93)';
            inputDni.style.boxShadow = "0 0 10px rgba(223, 93, 93, 0.5)";
        }
    });

    //Validar telefono1
    const phoneRegex = /^[0-9]{9}$/;
    const inputTel1 = document.querySelector('#tutor-tel1');
    inputTel1.addEventListener('blur', () => {
        if (phoneRegex.test(inputTel1.value)) {
            inputTel1.classList.remove('error');
            tel1Error.textContent = '';
            inputTel1.style.border = "2px solid rgb(93, 226, 102)";  // Cambia el borde a verde
            inputTel1.style.boxShadow = "0 0 8px rgba(93, 226, 102, 0.5)"; 
        } else {
            inputTel1.classList.add('error');
            tel1Error.textContent = 'El teléfono no es válido. Introduzca 9 dígitos';
            inputTel1.style.border = '2px solid rgb(226, 93, 93)';
            inputTel1.style.boxShadow = "0 0 10px rgba(223, 93, 93, 0.5)";
        }
    });

    //Validar telefono2
    const inputTel2 = document.querySelector('#tutor-tel2');
    inputTel2.addEventListener('blur', () => {
        if (phoneRegex.test(inputTel2.value)) {
            inputTel2.classList.remove('error');
            tel2Error.textContent = '';
            inputTel2.style.border = "2px solid rgb(93, 226, 102)";  // Cambia el borde a verde
            inputTel2.style.boxShadow = "0 0 8px rgba(93, 226, 102, 0.5)";
        } else if (inputTel2.value == "") {
            inputTel2.classList.remove('error');
            tel2Error.textContent = '';
            inputTel2.style.border = "1px solid rgba(0, 0, 0, 0.62)";
            inputTel2.style.boxShadow = "none";
        } else {
            inputTel2.classList.add('error');
            tel2Error.textContent = 'El teléfono no es válido. Introduzca 9 dígitos';
            inputTel2.style.border = '2px solid rgb(226, 93, 93)';
            inputTel2.style.boxShadow = "0 0 10px rgba(223, 93, 93, 0.5)";
        }
    });

    //Validar codigo postal
    const postalCodeRegex = /^[0-9]{5}$/;
    const inputPostalCode = document.querySelector('#tutor-postal-code');
    inputPostalCode.addEventListener('blur', () => {
        if (postalCodeRegex.test(inputPostalCode.value)) {
            inputPostalCode.classList.remove('error');
            postalCodeError.textContent = '';
            inputPostalCode.style.border = "2px solid rgb(93, 226, 102)";  // Cambia el borde a verde
            inputPostalCode.style.boxShadow = "0 0 8px rgba(93, 226, 102, 0.5)";
            
        } else if(inputPostalCode.value == ""){
            inputPostalCode.classList.remove('error');
            postalCodeError.textContent = '';
            inputPostalCode.style.border = "1px solid rgba(0, 0, 0, 0.62)";
            inputPostalCode.style.boxShadow = "none";
        } 
        else {
            inputPostalCode.classList.add('error');
            postalCodeError.textContent = 'El código postal no es válido. Introduzca 5 dígitos';
            inputPostalCode.style.border = '2px solid rgb(226, 93, 93)';
            inputPostalCode.style.boxShadow = "0 0 10px rgba(223, 93, 93, 0.5)";
        }
    });

    // Validar imagen del tutor
    const tutorImageInput = document.querySelector('#tutor-image-input');
    const tutorImageError = document.querySelector('#error-tutor-image-code');

    tutorImageInput.addEventListener('blur', () => {
        validateImage(tutorImageInput, tutorImageError, false);
    });
    
    tutorImageInput.addEventListener('change', () => {
        validateImage(tutorImageInput, tutorImageError, false);
    });

    // Universal image validation function
    function validateImage(inputElement, errorElement, isRequired = true) {
        const file = inputElement.files[0];
        
        // Check if file is required but missing
        if (isRequired && (!file || file.length === 0)) {
            errorElement.textContent = 'La imagen de perfil es obligatoria';
            inputElement.style.border = '2px solid rgb(226, 93, 93)';
            inputElement.style.boxShadow = "0 0 10px rgba(223, 93, 93, 0.5)";
            return false;
        } 
        
        // If file exists, validate it
        if (file) {
            // Consistent file types for both validations
            const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
            if (!validTypes.includes(file.type)) {
                errorElement.textContent = 'Formato de imagen no válido. Utilice JPEG, PNG, GIF o WEBP.';
                inputElement.value = ""; // Clear the input
                inputElement.style.border = '2px solid rgb(226, 93, 93)';
                inputElement.style.boxShadow = "0 0 10px rgba(223, 93, 93, 0.5)";
                return false;
            } 
            
            // Add consistent file size validation (5MB)
            if (file.size > 5 * 1024 * 1024) { // 5MB max
                errorElement.textContent = 'La imagen es demasiado grande. Máximo 5MB';
                inputElement.style.border = '2px solid rgb(226, 93, 93)';
                inputElement.style.boxShadow = "0 0 10px rgba(223, 93, 93, 0.5)";
                return false;
            }
            
            // Valid image
            errorElement.textContent = '';
            inputElement.style.border = "2px solid rgb(93, 226, 102)";
            inputElement.style.boxShadow = "0 0 8px rgba(93, 226, 102, 0.5)";
            return true;
        }
        
        // No file but not required
        return true;
    }

    // Corrige la función validarStep1
    function validarStep1() {
        const camposObligatorios = [
            'tutor-name',
            'tutor-lastname',
            'tutor-dni',
            'tutor-tel1'
        ];

        let isValid = true;

        // Validar que los campos obligatorios no estén vacíos
        camposObligatorios.forEach(id => {
            const input = document.querySelector(`#${id}`);
            const errorElement = document.querySelector(`#error-${id}`);
            
            if (input && input.value.trim() === "") {
                isValid = false;
                input.style.border = '2px solid rgb(226, 93, 93)';
                input.style.boxShadow = "0 0 10px rgba(223, 93, 93, 0.5)";
                
                if (id === 'tutor-name') {
                    nameError.textContent = 'El nombre es obligatorio';
                } else if (id === 'tutor-lastname') {
                    lastnameError.textContent = 'El apellido es obligatorio';
                } else if (id === 'tutor-dni') {
                    dniError.textContent = 'El DNI es obligatorio';
                } else if (id === 'tutor-tel1') {
                    tel1Error.textContent = 'El teléfono es obligatorio';
                }
            }
        });

        // Validar DNI (incluso si ya está relleno)
        const dniInput = document.querySelector('#tutor-dni');
        const dniRegex = /^[0-9]{8}[A-Za-z]$/;
        
        if (dniInput && dniInput.value.trim() !== "" && !dniRegex.test(dniInput.value)) {
            isValid = false;
            dniInput.style.border = '2px solid rgb(226, 93, 93)';
            dniInput.style.boxShadow = "0 0 10px rgba(223, 93, 93, 0.5)";
            dniError.textContent = 'El DNI no es válido. Introduzca 8 dígitos y una letra';
        }

        // Validar teléfono principal (incluso si ya está relleno)
        const tel1Input = document.querySelector('#tutor-tel1');
        const phoneRegex = /^[0-9]{9}$/;
        
        if (tel1Input && tel1Input.value.trim() !== "" && !phoneRegex.test(tel1Input.value)) {
            isValid = false;
            tel1Input.style.border = '2px solid rgb(226, 93, 93)';
            tel1Input.style.boxShadow = "0 0 10px rgba(223, 93, 93, 0.5)";
            tel1Error.textContent = 'El teléfono no es válido. Introduzca 9 dígitos';
        }

        // Validar teléfono 2 (solo si hay algo escrito)
        const tel2Input = document.querySelector('#tutor-tel2');
        
        if (tel2Input && tel2Input.value.trim() !== "") {
            if (!phoneRegex.test(tel2Input.value)) {
                isValid = false;
                tel2Input.style.border = '2px solid rgb(226, 93, 93)';
                tel2Input.style.boxShadow = "0 0 10px rgba(223, 93, 93, 0.5)";
                tel2Error.textContent = 'El teléfono no es válido. Introduzca 9 dígitos';
            }
        }

        // Validar código postal (solo si hay algo escrito)
        const postalCodeInput = document.querySelector('#tutor-postal-code');
        const postalCodeRegex = /^[0-9]{5}$/;
        
        if (postalCodeInput && postalCodeInput.value.trim() !== "") {
            if (!postalCodeRegex.test(postalCodeInput.value)) {
                isValid = false;
                postalCodeInput.style.border = '2px solid rgb(226, 93, 93)';
                postalCodeInput.style.boxShadow = "0 0 10px rgba(223, 93, 93, 0.5)";
                postalCodeError.textContent = 'El código postal no es válido. Introduzca 5 dígitos';
            }
        }

        // Validar la imagen del tutor
        if (!validateImage(tutorImageInput, tutorImageError, false)) {
            isValid = false;
        }

        return isValid;
    }

    // Actualiza el listener para el botón "Siguiente"
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
    const nameErrorChild = document.querySelector('#error-child-name');
    const lastnameErrorChild = document.querySelector('#error-child-lastname');
    const bornDateErrorChild = document.querySelector('#error-child-born-date');
    const tShirtSizeErrorChild = document.querySelector('#error-child-t-shirt-size');
    const childImageError = document.querySelector('#error-child-image-code');

    const tShirtSize = document.querySelector('#child-t-shirt-size');
    const childImageInput = document.querySelector('#child-image-input');

    // Expresiones regulares para validaciones
    const nameRegexChild = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
    const lastnameRegexChild = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
    const birthdateRegex = /^((2017|2018)-\d{2}-\d{2})$/;

    function validarStep2() {
        const camposObligatorios = [
            'child-name',
            'child-lastname',
            'child-born-date',
            'child-t-shirt-size',
            'child-image-input'
        ];

        let isValid = true;

        // Validar que los campos obligatorios no estén vacíos
        camposObligatorios.forEach(id => {
            const input = document.querySelector(`#${id}`);
            
            if (input && id === 'child-name') {
                if (input.value.trim() === "") {
                    isValid = false;
                    input.style.border = '2px solid rgb(226, 93, 93)';
                    input.style.boxShadow = "0 0 10px rgba(223, 93, 93, 0.5)";
                    nameErrorChild.textContent = 'El nombre es obligatorio';
                } else if (!nameRegexChild.test(input.value)) {
                    isValid = false;
                    input.style.border = '2px solid rgb(226, 93, 93)';
                    input.style.boxShadow = "0 0 10px rgba(223, 93, 93, 0.5)";
                    nameErrorChild.textContent = 'El nombre no es válido';
                } else {
                    input.style.border = "2px solid rgb(93, 226, 102)";
                    input.style.boxShadow = "0 0 8px rgba(93, 226, 102, 0.5)";
                    nameErrorChild.textContent = '';
                }
            } else if (input && id === 'child-lastname') {
                if (input.value.trim() === "") {
                    isValid = false;
                    input.style.border = '2px solid rgb(226, 93, 93)';
                    input.style.boxShadow = "0 0 10px rgba(223, 93, 93, 0.5)";
                    lastnameErrorChild.textContent = 'El apellido es obligatorio';
                } else if (!lastnameRegexChild.test(input.value)) {
                    isValid = false;
                    input.style.border = '2px solid rgb(226, 93, 93)';
                    input.style.boxShadow = "0 0 10px rgba(223, 93, 93, 0.5)";
                    lastnameErrorChild.textContent = 'El apellido no es válido';
                } else {
                    input.style.border = "2px solid rgb(93, 226, 102)";
                    input.style.boxShadow = "0 0 8px rgba(93, 226, 102, 0.5)";
                    lastnameErrorChild.textContent = '';
                }
            } else if (input && id === 'child-born-date') {
                if (input.value.trim() === "") {
                    isValid = false;
                    input.style.border = '2px solid rgb(226, 93, 93)';
                    input.style.boxShadow = "0 0 10px rgba(223, 93, 93, 0.5)";
                    bornDateErrorChild.textContent = 'La fecha de nacimiento es obligatoria';
                } else if (!birthdateRegex.test(input.value)) {
                    isValid = false;
                    input.style.border = '2px solid rgb(226, 93, 93)';
                    input.style.boxShadow = "0 0 10px rgba(223, 93, 93, 0.5)";
                    bornDateErrorChild.textContent = 'La fecha de nacimiento no es válida. Debe haber nacido entre 2017 y 2018';
                } else {
                    input.style.border = "2px solid rgb(93, 226, 102)";
                    input.style.boxShadow = "0 0 8px rgba(93, 226, 102, 0.5)";
                    bornDateErrorChild.textContent = '';
                }
            } else if (input && id === 'child-t-shirt-size') {
                if (input.selectedIndex === 0) {
                    isValid = false;
                    input.style.border = '2px solid rgb(226, 93, 93)';
                    input.style.boxShadow = "0 0 10px rgba(223, 93, 93, 0.5)";
                    tShirtSizeErrorChild.textContent = 'La talla de camiseta es obligatoria';
                } else {
                    input.style.border = "2px solid rgb(93, 226, 102)";
                    input.style.boxShadow = "0 0 8px rgba(93, 226, 102, 0.5)";
                    tShirtSizeErrorChild.textContent = '';
                }
            } else if (input && id === 'child-image-input') {
                if (input.files.length === 0) {
                    isValid = false;
                    input.style.border = '2px solid rgb(226, 93, 93)';
                    input.style.boxShadow = "0 0 10px rgba(223, 93, 93, 0.5)";
                    childImageError.textContent = 'La imagen de perfil es obligatoria';
                } else {
                    // Validar tipo de archivo
                    const file = input.files[0];
                const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];

                    
                    if (!validTypes.includes(file.type)) {
                        isValid = false;
                        input.style.border = '2px solid rgb(226, 93, 93)';
                        input.style.boxShadow = "0 0 10px rgba(223, 93, 93, 0.5)";
                        childImageError.textContent = 'Formato de imagen no válido. Utilice JPEG, PNG, GIF o WEBP.';

                    } else if (file.size > 5 * 1024 * 1024) { // 5MB max
                        isValid = false;
                        input.style.border = '2px solid rgb(226, 93, 93)';
                        input.style.boxShadow = "0 0 10px rgba(223, 93, 93, 0.5)";
                        childImageError.textContent = 'La imagen es demasiado grande. Máximo 5MB';
                    } else {
                        input.style.border = "2px solid rgb(93, 226, 102)";
                        input.style.boxShadow = "0 0 8px rgba(93, 226, 102, 0.5)";
                        childImageError.textContent = '';
                    }
                }
            }
        });

        return isValid;
    }

    const siguienteStep2 = document.querySelector('#siguiente-step2');
    const priceCardsContainer = document.querySelector('.incription-prices-container');

    siguienteStep2.addEventListener('click', (e) => {
        e.preventDefault();
        priceCardsContainer.style.display = 'flex'
        if (validarStep2()) {
            if (currentStep < steps.length - 1) {
                currentStep++;
                updateStepPosition();
            }
        }
    });

    const backSummaryDataBtn = document.querySelector('#back-summary-data-btn');
    backSummaryDataBtn.addEventListener('click', (e) => {
        e.preventDefault();
        priceCardsContainer.style.display = 'none';
    })

    // Validar nombre en tiempo real (blur)
    const inputNameChild = document.querySelector('#child-name');
    inputNameChild.addEventListener('blur', () => {
        if (inputNameChild.value.trim() === "") {
            inputNameChild.classList.add('error');
            nameErrorChild.textContent = 'El nombre es obligatorio';
            inputNameChild.style.border = '2px solid rgb(226, 93, 93)';
            inputNameChild.style.boxShadow = "0 0 10px rgba(223, 93, 93, 0.5)";
        } else if (nameRegexChild.test(inputNameChild.value)) {
            inputNameChild.classList.remove('error');
            nameErrorChild.textContent = '';
            inputNameChild.style.border = "2px solid rgb(93, 226, 102)";
            inputNameChild.style.boxShadow = "0 0 8px rgba(93, 226, 102, 0.5)";
        } else {
            inputNameChild.classList.add('error');
            nameErrorChild.textContent = 'El nombre no es válido';
            inputNameChild.style.border = '2px solid rgb(226, 93, 93)';
            inputNameChild.style.boxShadow = "0 0 10px rgba(223, 93, 93, 0.5)";
        }
    });

    // Validar apellido en tiempo real (blur)
    const inputLastnameChild = document.querySelector('#child-lastname');
    inputLastnameChild.addEventListener('blur', () => {
        if (inputLastnameChild.value.trim() === "") {
            inputLastnameChild.classList.add('error');
            lastnameErrorChild.textContent = 'El apellido es obligatorio';
            inputLastnameChild.style.border = '2px solid rgb(226, 93, 93)';
            inputLastnameChild.style.boxShadow = "0 0 10px rgba(223, 93, 93, 0.5)";
        } else if (lastnameRegexChild.test(inputLastnameChild.value)) {
            inputLastnameChild.classList.remove('error');
            lastnameErrorChild.textContent = '';
            inputLastnameChild.style.border = "2px solid rgb(93, 226, 102)";
            inputLastnameChild.style.boxShadow = "0 0 8px rgba(93, 226, 102, 0.5)";
        } else {
            inputLastnameChild.classList.add('error');
            lastnameErrorChild.textContent = 'El apellido no es válido';
            inputLastnameChild.style.border = '2px solid rgb(226, 93, 93)';
            inputLastnameChild.style.boxShadow = "0 0 10px rgba(223, 93, 93, 0.5)";
        }
    });

    // Validar fecha de nacimiento del niño en tiempo real (blur)
    const inputBirthdate = document.querySelector('#child-born-date');
    inputBirthdate.addEventListener('blur', () => {
        if (inputBirthdate.value.trim() === "") {
            inputBirthdate.classList.add('error');
            bornDateErrorChild.textContent = 'La fecha de nacimiento es obligatoria';
            inputBirthdate.style.border = '2px solid rgb(226, 93, 93)';
            inputBirthdate.style.boxShadow = "0 0 10px rgba(223, 93, 93, 0.5)";
        } else if (birthdateRegex.test(inputBirthdate.value)) {
            inputBirthdate.classList.remove('error');
            bornDateErrorChild.textContent = '';
            inputBirthdate.style.border = "2px solid rgb(93, 226, 102)";
            inputBirthdate.style.boxShadow = "0 0 8px rgba(93, 226, 102, 0.5)";
        } else {
            inputBirthdate.classList.add('error');
            bornDateErrorChild.textContent = 'La fecha de nacimiento no es válida. Debe haber nacido entre 2017 y 2018';
            inputBirthdate.style.border = '2px solid rgb(226, 93, 93)';
            inputBirthdate.style.boxShadow = "0 0 10px rgba(223, 93, 93, 0.5)";
        }
    });

    // Validar talla de camiseta en tiempo real (blur)
    tShirtSize.addEventListener('blur', () => {
        if (tShirtSize.selectedIndex === 0) {
            tShirtSize.classList.add('error');
            tShirtSizeErrorChild.textContent = 'La talla de camiseta es obligatoria';
            tShirtSize.style.border = '2px solid rgb(226, 93, 93)';
            tShirtSize.style.boxShadow = "0 0 10px rgba(223, 93, 93, 0.5)";
        } else {
            tShirtSize.classList.remove('error');
            tShirtSizeErrorChild.textContent = '';
            tShirtSize.style.border = "2px solid rgb(93, 226, 102)";
            tShirtSize.style.boxShadow = "0 0 8px rgba(93, 226, 102, 0.5)";
        }
    });

    // Validar imagen del niño en tiempo real (change)
    childImageInput.addEventListener('change', () => {
        if (childImageInput.files.length === 0) {
            childImageInput.classList.add('error');
            childImageError.textContent = 'La imagen de perfil es obligatoria';
            childImageInput.style.border = '2px solid rgb(226, 93, 93)';
            childImageInput.style.boxShadow = "0 0 10px rgba(223, 93, 93, 0.5)";
        } else {
            const file = childImageInput.files[0];
            const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];

            if (!validTypes.includes(file.type)) {
                childImageInput.classList.add('error');
                childImageError.textContent = 'Formato de imagen no válido. Utilice JPEG, PNG, GIF o WEBP.';

                childImageInput.style.border = '2px solid rgb(226, 93, 93)';
                childImageInput.style.boxShadow = "0 0 10px rgba(223, 93, 93, 0.5)";
            } else if (file.size > 5 * 1024 * 1024) { // 5MB max
                childImageInput.classList.add('error');
                childImageError.textContent = 'La imagen es demasiado grande. Máximo 5MB';
                childImageInput.style.border = '2px solid rgb(226, 93, 93)';
                childImageInput.style.boxShadow = "0 0 10px rgba(223, 93, 93, 0.5)";
            } else {
                childImageInput.classList.remove('error');
                childImageError.textContent = '';
                childImageInput.style.border = "2px solid rgb(93, 226, 102)";
                childImageInput.style.boxShadow = "0 0 8px rgba(93, 226, 102, 0.5)";
            }
        }
    });


    childImageInput.addEventListener('blur', () => {
        validateImage(childImageInput, childImageError, true);
    });
    
    childImageInput.addEventListener('change', () => {
        validateImage(childImageInput, childImageError, true);
    });
    
    const btnsNavigationPriceCards = document.querySelector('#navigation-buttons-price-cards');
    const inscriptionsPricesContainer = document.querySelector('.incription-prices');


    function validarPricesCards() {
        const radioInputs = [...document.querySelectorAll('input[name="plan"]')];
        let isValid = radioInputs.some(radio => radio.checked);
    
        const existingError = inscriptionsPricesContainer.parentElement.parentElement.querySelector('.plan-error');
    
        if (!isValid) {
            if (!existingError) {
                const errorPriceCards = document.createElement('span');
                errorPriceCards.style.color = "red";
                errorPriceCards.textContent = "¡Selecciona un plan!";
                errorPriceCards.classList.add('plan-error');
                errorPriceCards.classList.add('cards-plans-error');
    
                // Insertar el mensaje de error antes del contenedor de precios
                inscriptionsPricesContainer.parentElement.parentElement.insertBefore(errorPriceCards, btnsNavigationPriceCards);
            }
        } else {
            if (existingError) {
                existingError.remove();
            }
        }
    
        return isValid;
    }

    const insertSummaryDataBtn = document.querySelector('#insert-summary-data-btn');
    const form = document.querySelector('form');

    insertSummaryDataBtn.addEventListener('click', (e) => {
        e.preventDefault();
        priceCardsContainer.style.display = 'none';

    
        if (validarPricesCards()) {
            const formInputs = [...form.querySelectorAll('input, select')];
            const summaryParagraphs = [...document.querySelectorAll('.inscription-summary-cards-container p')];
    
            // Handle selected plan (Step 3 radio buttons)
            const selectedPlan = document.querySelector('input[name="plan"]:checked');
            if (selectedPlan) {
                const planTitle = selectedPlan.closest('.price-card-label').querySelector('.plan-title').textContent;
                summaryParagraphs[8].textContent = planTitle;
            }
    
            // Populate other fields
            for (let i = 0; i < summaryParagraphs.length; i++) {
                if (i === 8) continue; // Skip plan summary handled above
    
                const formIndex = i < 8 ? i : i - 1; // Ajusta índice para niño inputs
    
                if (formIndex === 7 || formIndex === 12) {
                    // Si el input es de tipo file, obtener el nombre del archivo
                    const fileInput = formInputs[formIndex];
                    summaryParagraphs[i].textContent = fileInput.files[0] ? fileInput.files[0].name : '';
                } else {
                    // Para otros inputs, asignar el valor normalmente
                    summaryParagraphs[i].textContent = formInputs[formIndex]?.value || '';
                }
            }
    
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

    function createChild(formData) {
        return fetch(`http://127.0.0.1:8000/api/children`, {
            method: 'POST', //Método para enviar los datos al servidor
            body: formData //Se convierte el objeto JS a una cadena JSON
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
            dni: summaryParagraphs[2].innerText,
            phone: summaryParagraphs[3].innerText,
            phone2: summaryParagraphs[4].innerText,
            city: summaryParagraphs[5].innerText,
            postal_code: summaryParagraphs[6].innerText,
        }

        console.log(tutorInfo);

        const fileInput = document.getElementById('tutor-image-input');
        const file = fileInput.files[0] ?? null;

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
            alergy_intolerance: summaryParagraphs[14].innerText,
            aditional_info: summaryParagraphs[15].innerText,
            acquaintance: summaryParagraphs[16].innerText
        }

        console.log(childInfo);

        const childFormData = new FormData();

        const childFileInput = document.getElementById('child-image-input');
        const childFile = childFileInput.files[0] ?? null;

        // Add the file
        childFormData.append('image', childFile);

        // Convert JSON to string and append to FormData
        childFormData.append('json_data', JSON.stringify(childInfo));

        try {
            updateTutorInfo(formData, localStorage.getItem('role_id'))
            .then(createChild(childFormData)
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

            // const finInscripcion = document.getElementById("finalizar-inscripcion");
            const overlayRegistro = document.getElementById("overlay-registro-correcto");
            const contenedorRegistroCorrecto = document.getElementById("registro-correcto-container");
    
            overlayRegistro.style.display = "flex";
            contenedorRegistroCorrecto.style.display = "flex";
        } catch (error) {
            console.log(error);
        }

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
            data.forEach((item, index) => {
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


        document.addEventListener('DOMContentLoaded', function() {
            const selectElement = document.getElementById('child-t-shirt-size');
        
            selectElement.addEventListener('click', function() {
                this.classList.toggle('open');
            });
        });
});