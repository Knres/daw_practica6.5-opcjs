'use strict';

function obtenerEstilosDisponibles() {
    var estilos = [];
    var arrayLink = document.getElementsByTagName('link');

    for (var i = 0; i < arrayLink.length; i++) {
        if (arrayLink[i].getAttribute('rel') != null &&
            arrayLink[i].getAttribute('rel').indexOf('stylesheet') != -1 &&
            arrayLink[i].getAttribute('media') != 'print' &&
            arrayLink[i].getAttribute('title') != null &&
            arrayLink[i].getAttribute('title').length > 0) {
            estilos.push(arrayLink[i].getAttribute('title'));
        }
    }

    return estilos;
}

function crearSelectorEstilo() {
    var selector = document.getElementById('selectorEstilo');
    var estilos = obtenerEstilosDisponibles();

    if (!selector) return;


    // Limpiar opciones existentes
    selector.innerHTML = '<option value="">Estilo predeterminado</option>';

    // Añadir estilos disponibles
    for (var i = 0; i < estilos.length; i++) {
        var option = document.createElement('option');

        option.value = estilos[i];
        option.textContent = estilos[i];
        selector.appendChild(option);
    }


    var estiloActual = getCookie('estiloPreferido');

    if (estiloActual !== '' && cookiesAceptadas()) {
        selector.value = estiloActual;
    }

    // aplicar estilo (no se guarda en cookies)
    selector.addEventListener('change', function () {
        if (this.value === '') {
            restaurarEstiloPredeterminado();
        } else {
            estilo(this.value);
        }
    }, false);

    // se guarda cuando se pulsa el boton guardar
    var btnGuardar = document.getElementById('btnGuardarEstilo');

    if (btnGuardar) {
        btnGuardar.addEventListener('click', function () {
            var estiloSeleccionado = selector.value;

            guardarEstilo(estiloSeleccionado);
        }, false);
    }
}

function guardarEstilo(titulo) {
    if (cookiesAceptadas()) {
        if (titulo === '' || titulo === null) {
            setCookie('estiloPreferido', '', -1); // eliminar cookies de estilo si se escoje el predeterminado
            mostrarMensajeConfirmacion('Se ha restaurado el estilo predeterminado. La preferencia de estilo ha sido eliminada.');
        } else {
            setCookie('estiloPreferido', titulo, 45);
            mostrarMensajeConfirmacion('El estilo "' + titulo + '" se ha guardado correctamente y se aplicará en todas las páginas.');
        }
        return true;
    } else {
        mostrarDialogError('Debe aceptar las cookies para poder guardar su preferencia de estilo. Por favor, acepte las cookies desde el banner o desde la página de Política de cookies.');
        return false;
    }
}

function mostrarDialogError(mensaje) {
    var dialogError = document.getElementById('dialogError');
    var parrafo = document.getElementById('mnsDialogError');

    if (dialogError && parrafo) {
        parrafo.textContent = mensaje;
        dialogError.showModal();
    }
}


/////////////////
// Load

function load() {
    crearSelectorEstilo();
}

document.addEventListener("DOMContentLoaded", load, false);

