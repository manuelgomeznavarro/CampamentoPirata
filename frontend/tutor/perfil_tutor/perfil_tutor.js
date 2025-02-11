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

    console.log("Role ID:", localStorage.getItem('role_id'));
    console.log("Role ID:", localStorage.getItem('role_id'));

    //FETCH Obtener datos niño

    function obtenerDatosNino() {
        return fetch(`http://127.0.0.1:8000/api/inscriptions/`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener datos');
            }
            return response.json();
        })
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                if (data[i].tutor_id == localStorage.getItem('role_id')) {
                    console.log("Datos obtenidos con éxito", data[i].child_id);
                    return data[i].child_id;
                }
            }
            console.log("Datos obtenidos con éxito", data);
            // return data;
        })
        .catch(error => {
            console.error('Error al introducir datos', error);
        });
    }

    //FETCH Editar datos niño

    function introducirDatosNino(childData) {
        return fetch(`http:////127.0.0.1:8000/api/children/${localStorage.getItem('role_id')}`, {
            method: 'PUT', //Método para enviar los datos al servidor
            headers: {
                'Content-Type': 'application/json' //Envío de datos en formato JSON
            },
            body: JSON.stringify(childData) //Se convierte el objeto JS a una cadena JSON
        })
            .then(response => {
                console.log(response);
                if (!response.ok) {
                    throw new Error('Error al introducir datos');
                }
                return response.json();
            })
            .then(data => {
                console.log("Datos introducidos con éxito", data);
            })
            .catch(error => {
                console.error('Error al introducir datos', error);
            });
        }

    //FETCH Editar datos tutor
    function introducirDatos(userData) {
        return fetch(`http://127.0.0.1:8000/api/tutors/${localStorage.getItem('role_id')}`, {
            method: 'PUT', //Método para enviar los datos al servidor
            headers: {
                'Content-Type': 'application/json' //Envío de datos en formato JSON
            },
            body: JSON.stringify(userData) //Se convierte el objeto JS a una cadena JSON
        })
            .then(response => {
                console.log(response);
                if (!response.ok) {
                    throw new Error('Error al introducir datos');
                }
                return response.json();
            })
            .then(data => {
                console.log("Datos introducidos con éxito", data);
            })
            .catch(error => {
                console.error('Error al introducir datos', error);
            });
    }

    saveButton.addEventListener('click', function (event) {
        event.preventDefault();

        const userData = {
            name: document.getElementById('editarNombreTutor').value,
            // emailTutor: document.getElementById('editarEmailTutor').value,
            phone: document.getElementById('telfTutor1').value,
            phone2: document.getElementById('telfTutor2').value,
            city: document.getElementById('location').value,
        };

        const childData = {
            birthdate: document.getElementById('editarFechaNacimiento').value,
            alergy_intolerance: document.getElementById('editarAlergias').value,
            aditional_info: document.getElementById('editarOtros').value
        }
        console.log(userData);
        introducirDatos(userData);
        obtenerDatosNino();
        introducirDatosNino(childData);
    });
});

