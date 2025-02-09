document.addEventListener('DOMContentLoaded', function () {

    const editButton = document.getElementById('edit-button');
    const contenedorEditar = document.getElementById('profile-container-global-editar');
    const contenedorPerfil = document.getElementById('profile-container-global');
    const saveButton = document.getElementById('save-button');

    editButton.addEventListener('click', function () {
        if (contenedorEditar.style.display === "none") {
            contenedorEditar.style.display = "flex";
            contenedorPerfil.style.display = "none";

        } else {
            contenedorEditar.style.display = "none";
        }
    });

    saveButton.addEventListener('click', function () {
        if (contenedorPerfil.style.display === "none") {
            contenedorPerfil.style.display = "flex";
            contenedorEditar.style.display = "none";

        } else {
            contenedorPerfil.style.display = "none";
        }
    });

    //FETCH Editar datos
    function introducirDatos(userData) {
        return fetch(`http://127.0.0.1/api/tutors/${localStorage.getItem('role_id')}`, {
            method: 'PUT', //Método para enviar los datos al servidor
            headers: {
                'Content-Type': 'application/json' //Envío de datos en formato JSON
            },
            body: JSON.stringify(userData) //Se convierte el objeto JS a una cadena JSON
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al introducir datos');
                }
                return response.json();
            })
            .then(data => {
                console.log("Datos introducitos con éxito", data);
            })
            .catch(error => {
                console.error('Error al introducir datos', error);
            });
    }

    document.getElementById('save-button').addEventListener('click', function (event) {
        event.preventDefault();

        const userData = {
            nombreTutor: document.getElementById('editarNombreTutor').value,
            emailTutor: document.getElementById('editarEmailTutor').value,
            telefonoTutor1: document.getElementById('telfTutor1').value,
            telefonoTutor2: document.getElementById('telfTutor2').value,
            direccionTutor: document.getElementById('location').value,
        };
        console.log(userData);
        introducirDatos(userData)
        .then(data => console.log("Datos introducidos con éxito", data))
        .catch(error => console.error('Error al introducir datos', error));
    });
});

