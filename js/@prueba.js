'use strict';

function load() {
    document.getElementById("boton2").onclick = function () { funcionClick("Botón 2") };
    document.getElementById("boton3").addEventListener("click", function () { funcionClick("Botón 3") });
}

document.addEventListener("DOMContentLoaded", load, false);