document.addEventListener('DOMContentLoaded', function () {

    const formIncidencia = document.querySelector('form');

    //Fetch para enviar la incidencia
    function enviarIncidencia(incidencia) {
        return fetch('http://127.0.0.1:8000/api/incidents', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(incidencia)
        })
            .then(response => {
                console.log(response);
                // if (!response.ok) {
                //     throw new Error('Error al crear la incidencia');
                // }
                return response.json();
            })
            .then(data => {
                console.log("Incidencia creada con éxito", data);
            })
            .catch(error => {
                console.error('Error al crear la incidencia', error);
            });

    }

    formIncidencia.addEventListener('submit', function (event) {
        event.preventDefault();


        const incidencia = {
            subject: document.getElementById('incident-subject').value,
            description: document.getElementById('incident-description').value,
            tutor_id: localStorage.getItem('role_id'),
            date: new Date(Date.now()).toISOString().split('T')[0],
            status: "Pending",
            admin_id: 2
        };
        console.log("", incidencia);
        enviarIncidencia(incidencia);
        formIncidencia.reset();

    });


    // Aparición de las preguntas frecuentes

    const preguntas = document.querySelectorAll('.faq-card');

    preguntas.forEach(pregunta => {

        const flecha = pregunta.querySelector('.faq-cards-content img');
        const respuesta = pregunta.querySelector('  .faq-card-content-answer');
        flecha.addEventListener('click', () => {
            console.log("flechita");
            if (respuesta.style.display === 'none' || respuesta.style.display === '') {
                respuesta.style.display = 'block';
            } else {
                respuesta.style.display = 'none';
            }        
        });
    });
});