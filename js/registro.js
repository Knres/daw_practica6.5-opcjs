'use strict';

function validarNombreUsuario(nombre) {
    if (estaVacia(nombre)) {
        return "El nombre de usuario no puede estar vacío.";
    }

    if (nombre.length < 3 || nombre.length > 15) {
        return "El nombre de usuario debe tener entre 3 y 15 caracteres.";
    }

    var primer = nombre.charAt(0);

    if (primer >= "0" && primer <= "9") {
        return "El nombre de usuario no puede comenzar por un número.";
    }

    for (let i = 0; i < nombre.length; i++) {
        var c = nombre.charAt(i);
        var esLetra = (c >= "A" && c <= "Z") || (c >= "a" && c <= "z");
        var esNum = c >= "0" && c <= "9";

        if (!esLetra && !esNum) {
            return "El nombre solo puede contener letras y números.";
        }
    }
    return "";
}

function validarContrasena(pwd) {
    if (estaVacia(pwd)) {
        return "La contraseña no puede estar vacía.";
    }

    if (pwd.length < 6 || pwd.length > 15) {
        return "La contraseña debe tener entre 6 y 15 caracteres.";
    }

    let mayus = false,
        minus = false,
        num = false;

    for (let i = 0; i < pwd.length; i++) {
        var c = pwd.charAt(i);
        var esMay = c >= "A" && c <= "Z";
        var esMin = c >= "a" && c <= "z";
        var esNum = c >= "0" && c <= "9";
        var esGuion = c === "-" || c === "_";

        if (!esMay && !esMin && !esNum && !esGuion) {
            return "La contraseña solo puede contener letras, números, guion y guion bajo.";
        }

        if (esMay) {
            mayus = true;
        }
        if (esMin) {
            minus = true;
        }
        if (esNum) {
            num = true;
        }
    }

    if (!mayus || !minus || !num) {
        return "La contraseña debe incluir al menos una mayúscula, una minúscula y un número.";
    }

    return "";
}


function validarEmail(email) {
    if (estaVacia(email)) {
        return "El correo no puede estar vacío.";
    }

    if (email.length > 254) {
        return "La dirección de correo es demasiado larga.";
    }

    var partes = email.split("@");
    if (partes.length !== 2) {
        return "El correo debe contener una sola '@'.";
    }

    var local = partes[0];
    var dominio = partes[1];

    if (local.length < 1 || local.length > 64) {
        return "La parte local del correo no tiene longitud válida.";
    }

    if (dominio.length < 1 || dominio.length > 255) {
        return "La parte del dominio no tiene longitud válida.";
    }

    if (local.startsWith(".") || local.endsWith(".")) {
        return "La parte local no puede empezar ni terminar con punto.";
    }

    if (local.includes("..")) {
        return "La parte local no puede contener dos puntos seguidos.";
    }



    var validosLocal = "!#$%&'*+-/=?^_`{|}~.";

    for (let c of local) {
        var esLetra = (c >= "A" && c <= "Z") || (c >= "a" && c <= "z");
        var esNum = c >= "0" && c <= "9";

        if (!esLetra && !esNum && !validosLocal.includes(c)) {
            return "La parte local contiene caracteres no permitidos.";
        }
    }



    var subdoms = dominio.split(".");

    if (subdoms.length < 1) {
        return "El dominio no es válido.";
    }

    for (let sub of subdoms) {
        if (sub.length < 1 || sub.length > 63)
            return "Algún subdominio no tiene longitud válida.";
        if (sub.startsWith("-") || sub.endsWith("-"))
            return "Un subdominio no puede comenzar ni terminar con guion.";
        for (let c of sub) {
            var esLetra = (c >= "A" && c <= "Z") || (c >= "a" && c <= "z");
            var esNum = c >= "0" && c <= "9";
            var esGuion = c === "-";

            if (!esLetra && !esNum && !esGuion) {
                return "El dominio contiene caracteres no válidos.";
            }
        }
    }

    return "";
}

function validarSexo(valor) {
    if (valor === "") {
        return "Debe seleccionar un sexo.";
    }
    return "";
}

function validarFechaNacimiento(valor) {
    if (estaVacia(valor)) {
        return "Debe indicar una fecha de nacimiento.";
    }

    var fecha = new Date(valor);

    if (isNaN(fecha.getTime())) {
        return "La fecha no es válida.";
    }

    var hoy = new Date();
    let edad = hoy.getFullYear() - fecha.getFullYear();
    var mes = hoy.getMonth() - fecha.getMonth();
    var dia = hoy.getDate() - fecha.getDate();

    if (mes < 0 || (mes === 0 && dia < 0)) {
        edad--;
    }

    if (edad < 18) {
        return "Debe tener al menos 18 años cumplidos.";
    }

    return "";
}


function validarPsw2(p1, p2) {
    if (p1 !== p2) {
        return "Las contraseñas no coinciden.";
    }

    return "";
}

function estaVacia(cadena) {
    return cadena == null || cadena.trim().length === 0;
}

function esSoloSpaceTab(cadena) {
    for (let i = 0; i < cadena.length; i++) {
        var c = cadena.charAt(i);

        if (c != ' ' && c != '\t') {
            return false;
        }
    }
    return true;
}


function validarFormulario(event) {
    event.preventDefault();

    var login = document.getElementById("login").value;
    var psw1 = document.getElementById("password1").value;
    var psw2 = document.getElementById("password2").value;
    var email = document.getElementById("email").value;
    var sexo = document.getElementById("sexo").value;
    var fecha = document.getElementById("nacimiento").value;

    var validaciones = [
        ["login", validarNombreUsuario(login)],
        ["password1", validarContrasena(psw1)],
        ["password2", validarPsw2(psw1, psw2)],
        ["email", validarEmail(email)],
        ["sexo", validarSexo(sexo)],
        ["nacimiento", validarFechaNacimiento(fecha)]
    ];

    var errores = validaciones.filter(v => v[1] !== "").map(v => `${v[0]}: ${v[1]}`);

    if (errores.length > 0) {
        mostrarDialogoError("Se han encontrado los siguientes errores:\n\n" + errores.join("\n"));
    } else {
        mostrarDialogoExito("Registro completado correctamente.");
    }
}


function mostrarDialogoError(mensaje) {
    var dialogo = document.querySelector("#dialogError");
    var txt = dialogo.querySelector("#mnsDialogError");

    txt.textContent = mensaje;
    dialogo.showModal();
}

function mostrarDialogoExito(mensaje) {
    var dialogo = document.querySelector("#dialogExito");
    var txt = dialogo.querySelector("#mnsDialogExito");

    txt.textContent = mensaje;
    dialogo.showModal();
}

/////////////////
// Load

function load() {
    var form = document.getElementById("formRegistro");
    form.addEventListener("submit", validarFormulario, false);
}

document.addEventListener("DOMContentLoaded", load, false);
