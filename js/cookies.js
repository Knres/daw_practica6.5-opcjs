'use strict';

function setCookie(c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) +
        ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}

function getCookie(c_name) {
    if (document.cookie.length > 0) {
        var c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            var c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1)
                c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}

function checkCookieConsent() {
    return getCookie('cookieConsent');
}

function cookiesAceptadas() {
    var consent = checkCookieConsent();
    return consent == 'accepted';
}

function aceptarCookies() {
    setCookie('cookieConsent', 'accepted', 90);
    ocultarBannerCookies();
    mostrarMensajeConfirmacion('Se han guardado sus preferencias en cuanto a las cookies. Para cambiar sus preferencias en cualquier momento, consulte la política de cookies o siga el enlace que se proporciona en el pie de página.');
}

function rechazarCookies() {
    setCookie('cookieConsent', 'rejected', -1);
    setCookie('estiloPreferido', '', -1);
    ocultarBannerCookies();
    //mostrarMensajeConfirmacion('Se han guardado sus preferencias en cuanto a las cookies. Para cambiar sus preferencias en cualquier momento, consulte la política de cookies o siga el enlace que se proporciona en el pie de página.');
}

function ocultarBannerCookies() {
    var banner = document.getElementById('bannerCookies');
    if (banner) {
        banner.style.display = 'none';
    }
}

function mostrarBannerCookies() {
    var consent = checkCookieConsent();
    
    if (consent == '') {
        var banner = document.getElementById('bannerCookies');
        if (banner) {
            banner.style.display = 'block';
        }
    }
}

function mostrarMensajeConfirmacion(mensaje) {
    var dialogAviso = document.getElementById('dialogAvisoCookies');
    var parrafo = document.getElementById('mnsDialogCookies');
    
    if (dialogAviso && parrafo) {
        parrafo.textContent = mensaje;
        dialogAviso.showModal();
        
        setTimeout(function() {
            dialogAviso.close();
        }, 5000);
    }
}

//////////////////
// Load

function load() {
    var btnAceptar = document.getElementById('btnAceptarCookies');
    var btnRechazar = document.getElementById('btnRechazarCookies');
    
    mostrarBannerCookies();
    
    if (btnAceptar) {
        btnAceptar.addEventListener('click', aceptarCookies, false);
    }
    
    if (btnRechazar) {
        btnRechazar.addEventListener('click', rechazarCookies, false);
    }
}

document.addEventListener('DOMContentLoaded', load, false);