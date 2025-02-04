document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('register').addEventListener('click', function(event) {
        event.preventDefault();
        window.location.href = "../html/crearCuenta.html";
    });
    
    document.getElementById('login').addEventListener('click', function(event) {
        event.preventDefault();
        window.location.href = "../html/index.html";
    });
});

