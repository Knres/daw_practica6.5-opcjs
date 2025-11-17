'use strict';

function validarNombreUsuario(nombre) {    
    if (estaVacia(nombre)) {
        return "El nombre de usuario no puede estar vacío.";
    }

    /*
    sólo puede contener letras del alfabeto inglés (en mayúsculas y minúsculas) y números; 
    no puede comenzar con un número; longitud mínima 3 caracteres y máxima 15.
    */
    var exp = new RegExp(
        '^' +           // empezar por
        '[A-Za-z]' +    // caracteres permitidos A-Za-z0-9

        '[A-Za-z0-9]' + // caracteres permitidos A-Za-z0-9
        '{2,15}' +      // 2-15 caracteres (empieza por 2 por que el primer caractes ya se ha definido)

        '$'              // final
    );

    if (!exp.test(nombre)) {
        return "El nombre de usuario debe tener entre 3 y 15 caracteres, comenzar por una letra y solo contener letras del alfabeto ingles o números.";
    }

    return "";
}

function validarContrasena(pwd) {
    if (estaVacia(pwd)) {
        return "La contraseña no puede estar vacía.";
    }

    /*
    sólo puede contener letras del alfabeto inglés (en mayúsculas y minúsculas),
    números, el guion y el guion bajo (subrayado); al menos debe contener una letra en mayúscula,
    una letra en minúscula y un número; longitud mínima 6 caracteres y máxima 15.
    */
    var exp = new RegExp(
        '^' +             // empezar por
        '(?=.*[A-Z])' +   // tener al menos una letra mayúscula (A-Z)
        '(?=.*[a-z])' +   // tener al menos una letra minúscula (a-z)
        '(?=.*[0-9])' +   // tener al menos un número (0-9)
        '[A-Za-z0-9_-]' + // caracteres permitidos A-Za-z0-9 y -
        '{6,15}' +        // 6-15 caracteres
        '$'               // final
    );

    if (!exp.test(pwd)) {
        return "La contraseña debe tener entre 6 y 15 caracteres, incluir al menos una mayúscula, una minúscula y un número, y solo contener letras, números, guion o guion bajo.";
    }

    return "";
}


function validarEmail(email) {
    if (estaVacia(email)) {
        return "El correo no puede estar vacío.";
    }

    var exp = new RegExp(
        '^' +            // empezar por
        '(?!\\.)' +      // no empezar por "."
        '(?!.*\\.\\.)' + // no tener puntos seguidos ".."
        '[A-Za-z0-9!#$%&\\\'*+\\-/=?^_`{|}~.]' + // caracteres validos permitidos letras mayuscula y minusculas del alfabeto ingles, numeros y caracteres !#$%&'*+-/=?^_`{|}~
        '{1,64}' +       // de 1-64 caracteres
        '(?<!\\.)' +     // no terminar en "."

        '@' +  // separador "@"

        '[A-Za-z0-9]' +  // subdominio empieza por A-Za-z0-9
        '(?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?' +
        // caracteres permitidos A-Za-z0-9 y -, 
        // 0-61 caracteres, 
        // termina en A-Za-z0-9


        '(?:\\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*' +
        // separar subdominios por ".",
        // caracteres permitidos A-Za-z0-9 y -, 
        // 0-61 caracteres, 
        // termina en A-Za-z0-9

        '$' // final
    );


    if (!exp.test(email)) {
        return "El correo no tiene un formato válido.(mantener el raton encima del apartado para ver formato)";
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

    if (mensaje.includes("\n")) {
        let partes = mensaje.split("\n").filter(l => l.trim() !== "");
        let cabecera = partes.shift(); // "Se han encontrado los siguientes errores:"
        
        let listaHTML = `<p>${cabecera}</p><ul>`;

        for (let err of partes) {
            listaHTML += `<li>${err}</li>`;
        }
        
        listaHTML += `</ul>`;
        txt.innerHTML = listaHTML;
    } else {
        txt.textContent = mensaje;
    }

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
