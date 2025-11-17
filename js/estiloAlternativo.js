'use strict';

function estilo(titulo) {
    var arrayLink = document.getElementsByTagName('link');

    for (var i = 0; i < arrayLink.length; i++) {
        var link = arrayLink[i];
        var rel = link.getAttribute('rel');

        if (rel != null && rel.indexOf('stylesheet') != -1 && link.getAttribute('media') != 'print') {

            var linkTitle = link.getAttribute('title');

            if (linkTitle != null && linkTitle.length > 0) {
                if (linkTitle == titulo) {
                    // activar el estilo: cambiar a "stylesheet" y disabled=false
                    link.setAttribute('rel', 'stylesheet');
                    link.disabled = false;
                } else {
                    // desactivar el estilo: cambiar a "alternate stylesheet" y disabled=true
                    link.setAttribute('rel', 'alternate stylesheet');
                    link.disabled = true;
                }
            }
        }
    }
}

function restaurarEstiloPredeterminado() {
    var arrayLink = document.getElementsByTagName('link');

    for (var i = 0; i < arrayLink.length; i++) {
        var link = arrayLink[i];
        var rel = link.getAttribute('rel');

        if (rel != null && rel.indexOf('stylesheet') != -1 && link.getAttribute('media') != 'print' &&
            link.getAttribute('title') != null && link.getAttribute('title').length > 0) {
            
            // Restaurar a "alternate stylesheet" y desactivar
            link.setAttribute('rel', 'alternate stylesheet');
            link.disabled = true;
        }
    }
}

function cargarEstiloGuardado() {
    if (cookiesAceptadas()) {
        var estiloGuardado = getCookie('estiloPreferido');

        if (estiloGuardado !== '') {
            estilo(estiloGuardado);
        }
    }
}

/////////////////
// Load

function load() {
    cargarEstiloGuardado();
}

document.addEventListener("DOMContentLoaded", load, false);
