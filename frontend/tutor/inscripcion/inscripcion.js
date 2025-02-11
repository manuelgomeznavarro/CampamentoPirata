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
    let currentStep = 0;

    function updateStepPosition() {
        stepsWrapper.style.transform = `translateX(-${currentStep * 100}%)`;
        steps.forEach((step, index) => {
            step.classList.toggle('active', index === currentStep);
        });
    }

    document.addEventListener('click', (e) => {
        if (e.target.matches('.siguiente')) {
            e.preventDefault();
            if (currentStep < steps.length - 1) {
                currentStep++;
                updateStepPosition();
            }
        }

        if (e.target.matches('.volver')) {
            e.preventDefault();
            if (currentStep > 0) {
                currentStep--;
                updateStepPosition();
            }
        }
    });
    

    // const form = document.querySelector('form');

    // form.addEventListener('submit', (e) => {
    //     e.preventDefault();

    //     const formData = [...form.querySelectorAll('input')];
        
    //     const summaryParagraphs = [...document.querySelectorAll('.inscription-summary-cards-container p')];

    //     for (let i = 0; i < formData.length; i++) {
    //         const element = array[i];

    //         if (i >= 15 && element.checked) {
    //             summaryParagraphs[8].innerText = element.value;
    //             break;
    //         }
    //     }

    //     for (let i = 0; i < summaryParagraphs.length; i++) {
    //         const element = array[i];

    //         if (i == 8) {
    //             continue;
    //         }

    //         element.innerText = formData[i];
    //     }
    // });


    const insertSummaryDataBtn = document.querySelector('#insert-summary-data-btn');
    const form = document.querySelector('form');

    insertSummaryDataBtn.addEventListener('click', (e) => {
        e.preventDefault();

        const formInputs = [...form.querySelectorAll('input')];
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

            if (i < 8) {
                // Tutor data (formInputs 0-7)
                summaryParagraphs[i].textContent = formInputs[i].value;
            } else {
                // Niño data (formInputs 8-14 correspond to summary i 9-15)
                const formIndex = i - 1; // Adjust index for niño inputs
                summaryParagraphs[i].textContent = formInputs[formIndex]?.value || '';
            }
        }
    });

    function updateTutorInfo(tutorData, tutorId) {
        return fetch(`http://127.0.0.1:8000/api/tutors/${tutorId}`, {
            method: 'PUT', //Método para enviar los datos al servidor
            headers: {
                    'Content-Type': 'application/json' //Envío de datos en formato JSON
                },
                body: JSON.stringify(tutorData) //Se convierte el objeto JS a una cadena JSON
            })
                .then(response => {
                    // if (!response.success) {
                    //     throw new Error('Error al registrar el usuario');
                    // }
                    return response.json();
                })
                .then(data => {
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

        updateTutorInfo(tutorInfo, localStorage.getItem('role_id'))
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
});