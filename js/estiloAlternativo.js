'use strict';

function estilo(titulo) {
    var arrayLink = document.getElementsByTagName('link');

    for (var i = 0; i < arrayLink.length; i++) {
        // Sólo aquellas etiquetas link que hacen referencia a un estilo
        // y que no sea para impresión
        if (arrayLink[i].getAttribute('rel') != null &&
            arrayLink[i].getAttribute('rel').indexOf('stylesheet') != -1 &&
            arrayLink[i].getAttribute('media') != 'print') {
            // Si tiene título es un estilo preferido o alternativo,
            // si no tiene título es un estilo
            // predeterminado y siempre tiene que utilizarse
            if (arrayLink[i].getAttribute('title') != null &&
                arrayLink[i].getAttribute('title').length > 0) {
                if (arrayLink[i].getAttribute('title') == titulo)
                    arrayLink[i].disabled = false;
                else
                    arrayLink[i].disabled = true;
            }
        }
    }
}

/*

</head>
<body>
<ul>
<!-- Esto está mal, así no se tienen que hacer los botones -->
<li><a href="javascript:estilo('Principal')">Principal</a></li>
<li><a href="javascript:estilo('Secundario')">Secundario</a></li>
</ul>
<p>
Una página web sencilla.
</p>
</body>

*/