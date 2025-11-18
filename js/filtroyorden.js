'use strict'

const contenedor = document.querySelector('#seccion_resultadosAnuncios');
const articulos = contenedor ? Array.from(contenedor.querySelectorAll('article')) : [];
//
//
//IMPORTANTE: HAY QUE AÑADIR DOS OPTION (SELECCIONAR CRITERIO Y DIRECCION) EN EL HTML SI NO NO VA A FUNCIONAR
//
//

//scrapea el articulo para conseguir la fecha
function extraerFechaDeArticulo(articulo) {
	const time = articulo.querySelector('time');
	if (!time) return new Date(0);
	const dt = time.getAttribute('datetime') || time.textContent.trim();
	const fecha = new Date(dt);
	if (isNaN(fecha)) return new Date(0);
	return fecha;
}

//scrapea el articulo para conseguir el titulo
function extraerTituloDeArticulo(articulo) {
	const enlace = articulo.querySelector('h3 a');
	return enlace ? enlace.textContent.trim().toLowerCase() : '';
}

//scrapea el articulo para conseguir el precio, limpiando el texto para convertirlo en número
function extraerPrecioDeArticulo(articulo) {
	
    const parrafos = Array.from(articulo.querySelectorAll('p'));
	//busca el párrafo que contiene la palabra "precio" dentro del artículo que le pasamos por parámetro
    const nodoPrecio = parrafos.find(p => /precio/i.test(p.textContent));
	
    if (!nodoPrecio) return 0;
	//aqui la expresioin regular busca la palabra precio y elimina cualquier espacio o dos puntos que haya despues
    let texto = nodoPrecio.textContent.replace(/Precio[:\s]*/i, '');
    //aqui la expresion regular "limpia" el texto eliminando el símbolo de euro, espacios y además cambia la coma por punto, para que pueda ser parseado correctamente
    texto = texto.replace(/€/g, '').replace(/\s/g, '').replace(/\./g, '').replace(',', '.');
	
    //aqui la expresión regular elimina cualquier caracter que no sea número, punto o signo negativo, no deberían haber letras ni otros símbolos en el precio pero por si acaso
    texto = texto.replace(/[^0-9\.\-]/g, '');
	const numero = parseFloat(texto);
	return isNaN(numero) ? 0 : numero;
}

//aplica el orden segun el criterio seleccionado haciendo una copia de los artículos .
function ordenarArticulosPor(criterio, direccion) {
	const copia = articulos.slice();
	copia.sort((a, b) => {
		if (criterio === 'fecha') {
			return extraerFechaDeArticulo(a) - extraerFechaDeArticulo(b);
		}
		if (criterio === 'titulo') {
			return extraerTituloDeArticulo(a).localeCompare(extraerTituloDeArticulo(b));
		}
		if (criterio === 'precio') {
			return extraerPrecioDeArticulo(a) - extraerPrecioDeArticulo(b);
		}
		return 0;
	});
	if (direccion === 'desc') copia.reverse();
	return copia;
}

//con la copia ordenada, actualiza el DOM con el nuevo orden.
function aplicarOrden(criterio = 'fecha', direccion = 'desc') {
	if (!contenedor) return;
	const articulosOrdenados = ordenarArticulosPor(criterio, direccion);

	// borra los article de la seccion seccion_resultadosAnuncios
	const actuales = Array.from(contenedor.querySelectorAll('article'));
	actuales.forEach(a => contenedor.removeChild(a));

	// Añadir los nuevos child contenidos en la copia ordenada
	articulosOrdenados.forEach(a => contenedor.appendChild(a));

	// Como articulos es una constante, no se puede reasignar, pero sí modificar su contenido, entonces lo que hacemos es vaciarlo y llenarlo de nuevo para que refleje
    // el nuevo orden.
	articulos.length = 0;
	articulos.push(...articulosOrdenados);
}

// añade los event listeners a los selectores de orden y aplica el orden inicial(por fecha descendente)
const selectCriterio = document.querySelector('#selectCriterioOrden');
const selectDireccion = document.querySelector('#selectDireccionOrden');
if (selectCriterio && selectDireccion) {


	selectCriterio.addEventListener('change', () => aplicarOrden(selectCriterio.value, selectDireccion.value));
	selectDireccion.addEventListener('change', () => aplicarOrden(selectCriterio.value, selectDireccion.value));

	aplicarOrden(selectCriterio.value || 'fecha', selectDireccion.value || 'desc');
} else {
	aplicarOrden('fecha', 'desc');
}

