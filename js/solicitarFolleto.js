'use strict';

/*
Cuidado que si hay 7 paginas, se cobran las 5 primeras paginas en se cobran la precio del de <5 y las procimas pagianas de 5 a 10 y despues de estas >10
*/
function calcularCoste(paginas, fotos, color, resolucionAlta) {
    const envio = 10;
    let costePag = 0;
    let restantes = paginas;

    // <5 páginas (máx. 4 páginas)
    const tramo1 = Math.min(restantes, 4);
    costePag += tramo1 * 2;
    restantes -= tramo1;

    // 5–10 páginas (máx. 6 páginas)
    if (restantes > 0) {
        const tramo2 = Math.min(restantes, 6);
        costePag += tramo2 * 1.8;
        restantes -= tramo2;
    }

    // >10 páginas
    if (restantes > 0) {
        costePag += restantes * 1.6;
    }

    const costeColor = color ? fotos * 0.5 : 0;
    const costeResol = resolucionAlta ? fotos * 0.2 : 0;

    return (envio + costePag + costeColor + costeResol).toFixed(2);
}

function crearTablaCostes() {
    const tabla = document.createElement("table");

    const cab1 = document.createElement("tr");
    cab1.innerHTML = `
    <th rowspan="2">Número de páginas</th>
    <th rowspan="2">Número de fotos</th>
    <th colspan="2">Blanco y negro</th>
    <th colspan="2">Color</th>
    `;

    tabla.appendChild(cab1);

    const cab2 = document.createElement("tr");
    cab2.innerHTML = `
    <th>150–300 dpi</th>
    <th>450–900 dpi</th>
    <th>150–300 dpi</th>
    <th>450–900 dpi</th>
    `;
    tabla.appendChild(cab2);

    for (let paginas = 1; paginas <= 15; paginas++) {
        const fila = document.createElement("tr");

        const fotos = paginas * 3;

        const tdPag = document.createElement("td");
        tdPag.textContent = paginas;
        fila.appendChild(tdPag);

        const tdFotos = document.createElement("td");
        tdFotos.textContent = fotos;
        fila.appendChild(tdFotos);

        // BN - baja resolución
        const tdBNBaja = document.createElement("td");
        tdBNBaja.textContent = calcularCoste(paginas, fotos, false, false) + " €";
        fila.appendChild(tdBNBaja);

        // BN - alta resolución
        const tdBNAlta = document.createElement("td");
        tdBNAlta.textContent = calcularCoste(paginas, fotos, false, true) + " €";
        fila.appendChild(tdBNAlta);

        // Color - baja resolución
        const tdColorBaja = document.createElement("td");
        tdColorBaja.textContent = calcularCoste(paginas, fotos, true, false) + " €";
        fila.appendChild(tdColorBaja);

        // Color - alta resolución
        const tdColorAlta = document.createElement("td");
        tdColorAlta.textContent = calcularCoste(paginas, fotos, true, true) + " €";
        fila.appendChild(tdColorAlta);

        tabla.appendChild(fila);
    }

    return tabla;
}

// Mostrar / Ocultar la tabla
function toggleTabla() {
    const seccion = document.getElementById("contenedorTablaCostes");
    const boton = document.getElementById("btnMostrarCostes");
    const tablaExistente = seccion.querySelector("table");

    if (tablaExistente) {
        tablaExistente.remove();
    } else {
        seccion.appendChild(crearTablaCostes());
    }
}




function load() {
    document.getElementById("btnMostrarCostes")
        .addEventListener("click", toggleTabla, false);
}

document.addEventListener("DOMContentLoaded", load, false);