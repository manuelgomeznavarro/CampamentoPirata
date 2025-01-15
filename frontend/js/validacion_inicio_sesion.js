document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("email").addEventListener("blur", function () {
        let email = document.getElementById("email").value;
        if(!(/^[\w._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email) || email == null)) {
            console.log("El email no es válido.");
            // document.getElementById("email").focus();
            let errorEmail = document.getElementById("errorEmail");
            errorEmail.style.color = "red";
            errorEmail.innerHTML = "Introduzca un email correcto.";
        } else {
            console.log("Email válido.");
            let errorEmail = document.getElementById("errorEmail");
            errorEmail.innerHTML = "";
        }
    });

    document.getElementById("password").addEventListener("blur", function () {
        let contra = document.getElementById("password").value;
        if (!(/^(?=.[A-Z])(?=.[a-z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/.test(contra)) || contra == null) {
            console.log("No ha introducido la contraseña de forma correcta.")
            // document.getElementById("password").focus();
            let errorPassword = document.getElementById("errorPassword");
            errorPassword.style.color = "red";
            errorPassword.innerHTML = "Introduzca una contraseña correcta.";
        } else {
            console.log("Contraseña válida.");
            let errorPassword = document.getElementById("errorPassword");
            errorPassword.innerHTML = "";
        }
    });

    const form = document.getElementById("login");

    form.addEventListener("submit", function (event) {
        const error = document.getElementById("error");

        let email = document.getElementById("email").value;
        if(!(/^[\w._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email) || email == null)) {
            console.log("El email no es válido.");
            // document.getElementById("email").focus();
            let errorEmail = document.getElementById("errorEmail");
            errorEmail.style.color = "red";
            errorEmail.innerHTML = "Introduzca un email correcto.";
        } else {
            console.log("Email válido.");
            let errorEmail = document.getElementById("errorEmail");
            errorEmail.innerHTML = "";
        }

        let contra = document.getElementById("password").value;
        if (!(/^(?=.[A-Z])(?=.[a-z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/.test(contra)) || contra == null) {
            console.log("No ha introducido la contraseña de forma correcta.")
            // document.getElementById("password").focus();
            let errorPassword = document.getElementById("errorPassword");
            errorPassword.style.color = "red";
            errorPassword.innerHTML = "Introduzca una contraseña correcta.";
        } else {
            console.log("Contraseña válida.");
            let errorPassword = document.getElementById("errorPassword");
            errorPassword.innerHTML = "";
        }

        if (document.getElementById("errorEmail").innerHTML != "" || document.getElementById("errorPassword").innerHTML != "") {
            event.preventDefault();
        }
    });
});