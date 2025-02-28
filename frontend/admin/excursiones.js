document.addEventListener('DOMContentLoaded', function () {

    const headerBtnsContainer = document.querySelector('.dashboard-profile');
    const btnSalir = document.createElement('button');
                    const imgSalir = document.createElement('img');
                    imgSalir.src = 'https://campamento-tesoro-perdido-image-hosting.fra1.cdn.digitaloceanspaces.com/icons/logout-icon.png';
                    btnSalir.appendChild(imgSalir);

                    btnSalir.addEventListener('click', () => {
                        localStorage.removeItem('role');
                        localStorage.removeItem('role_id');
                        location.assign('../index.html');
                    });
                    headerBtnsContainer.appendChild(btnSalir);

document.getElementById('logo-excursiones').addEventListener('click', function () {
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
    window.location.href = '../admin/excursiones.html';
});

//Código para que al cargar la página, se seleccione el botón Dashboard
let defaultButton = document.getElementById('excursiones-admin');
//Agrego la clase 'activo' al botón Dashboard
defaultButton.classList.add('activo');

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

document.querySelectorAll('.editable').forEach(cell => {
    cell.addEventListener('click', () => {
        if (cell.innerHTML.trim() === "") {
            const input = document.createElement('input');
            input.type = 'text';
            input.placeholder = "Añadir excursión";

            cell.innerHTML = '';
            cell.appendChild(input);
            input.focus();

            input.addEventListener('blur', () => {
                cell.innerHTML = input.value;
            });
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    cell.innerHTML = input.value;
                }
            });
        }
    });
})
});