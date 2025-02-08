document.addEventListener('DOMContentLoaded', function () {
    const btnPagos = document.getElementById('btnPagos');
    const btnTarifas = document.getElementById('btnTarifas');
    const btnDescuentos = document.getElementById('btnDescuentos');
    const infoPagos = document.getElementById('info-pagos');
    const infoTarifas = document.getElementById('info-tarifas');
    const infoDescuentos = document.getElementById('info-descuentos');
    const menuContent = document.getElementById('menu-content');

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

});