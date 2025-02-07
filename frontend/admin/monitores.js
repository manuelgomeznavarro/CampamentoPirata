document.addEventListener('DOMContentLoaded', function () {
    const btnCrearMonitores = document.getElementById("btnCrearMonitores");
    const btnGrupos = document.getElementById("btnGrupos");
    const btnListaMonitores = document.getElementById("btnListaMonitores");
    const formCrearMonitores = document.getElementById("form-crear-monitor");
    const grupos = document.getElementById("grupos");
    const listaMonitores = document.getElementById("lista-monitores");

    btnCrearMonitores.addEventListener('click', function () {
        if (formCrearMonitores.style.display === "none") {
            formCrearMonitores.style.display = "flex";
            grupos.style.display = "none";
            listaMonitores.style.display = "none";
        } else {
            formCrearMonitores.style.display = "none";
        }
    });

    btnGrupos.addEventListener('click', function () {
        if (grupos.style.display === "none") {
            grupos.style.display = "block";
            formCrearMonitores.style.display = "none";
            listaMonitores.style.display = "none";
        } else {
            grupos.style.display = "none";
        }
    });

    btnListaMonitores.addEventListener('click', function () {
        if (listaMonitores.style.display === "none") {
            listaMonitores.style.display = "block";
            formCrearMonitores.style.display = "none";
            grupos.style.display = "none";
        } else {
            listaMonitores.style.display = "none";
        }
    });
});