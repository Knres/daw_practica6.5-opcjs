'use strict';

function actualizarEstadoCookies() {
    var estado = document.getElementById('estadoActual');
    var boton = document.getElementById('btnCambiarPreferencia');
    var consent = checkCookieConsent();
    
    if (consent === 'accepted') {
        estado.textContent = 'Actualmente tiene las cookies aceptadas.';
        boton.textContent = 'Rechazar cookies';
        boton.onclick = function() {
            rechazarCookiesYActualizar();
        };
    } else if (consent === 'rejected') {
        estado.textContent = 'Actualmente tiene las cookies rechazadas.';
        boton.textContent = 'Aceptar cookies';
        boton.onclick = function() {
            aceptarCookiesYActualizar();
        };
    } else {
        estado.textContent = 'No ha establecido ninguna preferencia sobre las cookies.';
        boton.textContent = 'Aceptar cookies';
        boton.onclick = function() {
            aceptarCookiesYActualizar();
        };
    }
}

function aceptarCookiesYActualizar() {
    setCookie('cookieConsent', 'accepted', 90);
    mostrarMensajeConfirmacion('Se han guardado sus preferencias en cuanto a las cookies. Ha aceptado el uso de cookies.');
    actualizarEstadoCookies();
}

function rechazarCookiesYActualizar() {
    setCookie('cookieConsent', 'rejected', 90);
    
    var estiloCookie = getCookie('estiloPreferido');
    if (estiloCookie !== '') {
        setCookie('estiloPreferido', '', -1);
    }
    
    mostrarMensajeConfirmacion('Se han guardado sus preferencias en cuanto a las cookies. Ha rechazado el uso de cookies.');
    actualizarEstadoCookies();
}

/////////////////
// Load

function load() {
    actualizarEstadoCookies();
}

document.addEventListener('DOMContentLoaded', load, false);
