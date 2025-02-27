document.addEventListener('DOMContentLoaded', function () {

    const btnPagos = document.getElementById('btnPagos');
    const btnTarifas = document.getElementById('btnTarifas');
    const btnDescuentos = document.getElementById('btnDescuentos');
    const infoPagos = document.getElementById('info-pagos');
    const infoTarifas = document.getElementById('info-tarifas');
    const infoDescuentos = document.getElementById('info-descuentos');
    const menuContent = document.getElementById('menu-content');
    const btnGuardarTarifas1 = document.getElementById('btnGuardarTarifas1');
    const btnGuardarTarifas2 = document.getElementById('btnGuardarTarifas2');
    const btnGuardarTarifas3 = document.getElementById('btnGuardarTarifas3');
    const btnGuardarTarifas4 = document.getElementById('btnGuardarTarifas4');


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
                console.log(`ID: ${item.id}, Nombre Tarifa: ${item.name}, Precio: ${item.price}`);
                console.log(index);
                const tarifaCards = document.querySelectorAll('.tarifa-card');
                if (index < tarifaCards.length) {
                    const tarifaCard = tarifaCards[index];
                    const titleElement = tarifaCard.querySelector('.plan-title span');
                    const priceElement = tarifaCard.querySelector('.plan-price span');
                    const buttonsave = tarifaCard.querySelector('button');
                    titleElement.textContent = item.name;
                    priceElement.textContent = item.price;
                    buttonsave.value = item.id;
                }
            })
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
        });

    const btnGuardar = document.querySelectorAll('.btnGuardarTarifas');

    btnGuardar.forEach((btn, index) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const tarifaCards = document.querySelectorAll('.tarifa-card');
            console.log(index);
            if (index < tarifaCards.length) {
                const tarifaCard = tarifaCards[index];
                const nombreTarifa = tarifaCard.querySelector(".plan-title span").textContent;
                const precioTarifa = tarifaCard.querySelector(".plan-price span").textContent;
                const idTarifa = tarifaCard.querySelector("button");
                const tarifaData = {
                    name: nombreTarifa,
                    price: precioTarifa
                };
                console.log(tarifaData);
                actualizarTarifas(tarifaData, idTarifa.value);
            }
        });
    });
    //Fetch para modificar cambios en las tarifas

    function actualizarTarifas(tarifaData, idTarifa) {
        return fetch(`http://127.0.0.1:8000/api/prices/${idTarifa}`, {
            method: 'PUT', //Método para enviar los datos al servidor
            headers: {
                'Content-Type': 'application/json' //Envío de datos en formato JSON
            },
            body: JSON.stringify(tarifaData) //Se convierte el objeto JS a una cadena JSON
        })
            .then(response => {
                // if (!response.ok) {
                //     throw new Error('Error al crear la tarifa');
                // }
                return response.json();
            })
            .then(data => {
                console.log("Tarifa creado con éxito", data);
            })
            .catch(error => {
                console.error('Error al crear la tarifa', error);
            });
    }


    //Fetch para obtener los datos de las inscripciones de la BBDD
    fetch('http://127.0.0.1:8000/api/inscriptions')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error `);
            }
            return response.json();
        })
        .then(data => {
            data.forEach((item, index) => {
                console.log(`ID: ${item.id}, Tutor_Id: ${item.tutor_id}, Child_Id: ${item.child_id}`);
                console.log(index);
                obtenerInfoTutores(item.tutor_id, item.id, item.child_id);
                // crearInfoInscripciones(item.tutor_id);
                // crearElementoInscripcion(item.id, tutorData, childData);
            })
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
        });

    // Fetch para obtener los datos de los tutores que han realizado pagos
    function obtenerInfoTutores(tutor_id, inscription_id, child_id) {
        fetch(`http://127.0.0.1:8000/api/tutors/${tutor_id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error `);
            }
            return response.json();
        })
        .then(tutorData => {
            // Asumiendo que data es un objeto que contiene la información del tutor
            console.log(`ID: ${tutorData.id}, Nombre: ${tutorData.name}, Apellidos: ${tutorData.lastname}, DNI: ${tutorData.dni}, Teléfono: ${tutorData.phone}, Teléfono 2: ${tutorData.phone2}`);
            crearInfoInscripciones(tutor_id, inscription_id, tutorData, child_id);
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
        });
    }

    // Fetch para obtener los datos de los niños que han realizado pagos

    function crearInfoInscripciones(tutor_id, inscription_id, tutorData, child_id) {

        fetch(`http://127.0.0.1:8000/api/children/${child_id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error `);
                }
                return response.json();
            })
            .then(childData => {
                // Asumiendo que childData es un objeto que contiene la información del niño
                console.log(`ID: ${childData.id}, Nombre: ${childData.name}, Apellidos: ${childData.lastname}, DNI: ${childData.dni}, Teléfono: ${childData.phone}, Teléfono 2: ${childData.phone2}`);
                crearElementoInscripcion(inscription_id, tutorData, childData);
            })
            .catch(error => {
                console.error('Error al obtener los datos:', error);
            });
    }

    // Crear elementos HTML para mostrar la información de las inscripciones
    function crearElementoInscripcion(inscription_id, tutorData, childData) {
        const listaInscripciones = document.getElementById('info-pagos');

        const elementoInscripcion = document.createElement('div');
        elementoInscripcion.className = "inscripcion-realizadas-info";

        const inscripcionInfo = document.createElement('p');
        inscripcionInfo.textContent = `Inscripción ID: ${inscription_id}`;

        const tutorInfo = document.createElement('p');
        tutorInfo.textContent = `Tutor: ${tutorData.name} ${tutorData.lastname}`;

        const childInfo = document.createElement('p');
        childInfo.textContent = `Niño: ${childData.name} ${childData.lastname}`;

        elementoInscripcion.appendChild(inscripcionInfo);
        elementoInscripcion.appendChild(tutorInfo);
        elementoInscripcion.appendChild(childInfo);

        listaInscripciones.appendChild(elementoInscripcion);
    }

    btnPagos.addEventListener('click', function () {
        if (infoPagos.style.display === "none") {
            infoPagos.style.display = "block";
            infoTarifas.style.display = "none";
            menuContent.style.display = "block";
            infoDescuentos.style.display = "none";
        } else {
            infoPagos.style.display = "none";
        }
    });
    btnTarifas.addEventListener('click', function () {
        if (infoTarifas.style.display === "none") {
            infoTarifas.style.display = "block";
            infoPagos.style.display = "none";
            menuContent.style.display = "none";
            infoDescuentos.style.display = "none";
        } else {
            infoTarifas.style.display = "none";
        }
    });
    btnDescuentos.addEventListener('click', function () {
        if (infoDescuentos.style.display === "none") {
            infoDescuentos.style.display = "block";
            infoTarifas.style.display = "none";
            menuContent.style.display = "block";
            infoPagos.style.display = "none";
        } else {
            infoDescuentos.style.display = "none";
        }
    });

    document.getElementById('logo-gestionPagos').addEventListener('click', function () {
        window.location.href = '../admin/dashboard.html';
    });

    document.getElementById('dashboard-admin').addEventListener('click', function () {
        window.location.href = '../admin/dashboard.html';
    });

    document.getElementById('gestionPago-admin').addEventListener('click', function () {
        window.location.href = '../admin/gestionpagos.html';
    });

    document.getElementById('seccionMonitores-admin').addEventListener('click', function () {
        window.location.href = '../admin/monitores.html';
    });

    document.getElementById('inscripcionesRegistros-admin').addEventListener('click', function () {
        window.location.href = '../admin/inscripcionesyregistros.html';
    });

    document.getElementById('excursiones-admin').addEventListener('click', function () {
        window.location.href = '../admin/excursionesyactividades.html';
    });

    //Código para que al cargar la página, se seleccione el botón Dashboard
    let defaultButton = document.getElementById('gestionPago-admin');
    //Agrego la clase 'activo' al botón Dashboard
    defaultButton.classList.add('activo');

    document.querySelectorAll('.button-options').forEach(function (boton) {
        // Agrego un evento 'click' a cada botón
        boton.addEventListener('click', function () {

            if (this.classList.contains('activo')) {
                boton.classList.remove('activo');
            } else {
                // Elimino la clase 'activo' de todos los botones
                // Esto es para que solo un botón tenga la clase 'activo' a la vez
                document.querySelectorAll('.button-options').forEach(b => b.classList.remove('activo'));
                // Agrego la clase 'activo' al botón al que se le hizo click
                this.classList.add('activo');
            }
        });
    });

    document.querySelectorAll('.menu-item').forEach(function (boton) {
        // Agrego un evento 'click' a cada botón
        boton.addEventListener('click', function () {
            // Elimino la clase 'activo' de todos los botones
            // Esto es para que solo un botón tenga la clase 'activo' a la vez
            document.querySelectorAll('.menu-item').forEach(b => b.classList.remove('activo'));
            // Agrego la clase 'activo' al botón al que se le hizo click
            this.classList.add('activo');
            //Selecciono el elemento donde se muestra el título
            let titulo = document.getElementById('dashboard-title');
            // Cambio el texto del título por el texto del botón al que se le hizo click
            titulo.textContent = this.textContent;
        });
    });
});