'use strict';

function validaFormulario() {
    var login = document.querySelector("#login").value;
    var password = document.querySelector("#password").value;
    var formLogin = document.querySelector("#formLogin");

    //alert("Usuario: " + login + " Contraseña: " + password);
    //alert(`Usuario: ${login}   "Contraseña: " ${password}`);

    if (login.length == 0 || password.length == 0) {
        // console.log("Error. Hay campos vacíos");
        mostrarDialogoError("No pueden dejar campos vacíos");
    } else {
        if (esSoloSpaceTab(login) || esSoloSpaceTab(password)) {
            // console.log(`Usuario: ${login}   "Contraseña: " ${password}`);
            mostrarDialogoError("No se puede dejar solo espacios o tabuladores");
        } else {
            formLogin.submit();
        }
    }
}


function esSoloSpaceTab( cadena ) {
    for (let i = 0; i < cadena.length; i++) {
        var c = cadena.charAt(i);

        if (c != ' ' && c != '\t') {
            return false; 
        }
    }
    return true;
}

function mostrarDialogoError( mensaje ) {
    var dialogo = document.querySelector("#dialogError");
    var txt = dialogo.querySelector("#mnsDialogError");

    txt.textContent = mensaje;
    dialogo.showModal();
}


/////////////////
// Load

function load() {
    
    var btnsumit = document.querySelector("#btnsumit");

    btnsumit.addEventListener("click", validaFormulario, false);
}

document.addEventListener("DOMContentLoaded", load, false);