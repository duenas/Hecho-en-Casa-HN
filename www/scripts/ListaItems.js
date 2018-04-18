// Si quiere una introducción sobre la plantilla En blanco, vea la siguiente documentación:
// http://go.microsoft.com/fwlink/?LinkID=397704
// Para depurar código al cargar la página en cordova-simulate o en dispositivos o emuladores Android: inicie la aplicación, establezca puntos de interrupción 
// y ejecute "window.location.reload()" en la Consola de JavaScript.
(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);
  // llama la funcion que obtiene parametros url
    var valores = getGET();
    //asigna valores de url
    var Catego = valores['categoria'];
    //funcion para obtener la url
    function getGET() {
        // capturamos la url
        var loc = document.location.href;
        // si existe el interrogante
        if (loc.indexOf('?') > 0) {
            // cogemos la parte de la url que hay despues del interrogante
            var getString = loc.split('?')[1];
            // obtenemos un array con cada clave=valor
            var GET = getString.split('&');
            var get = {};

            // recorremos todo el array de valores
            for (var i = 0, l = GET.length; i < l; i++) {
                var tmp = GET[i].split('=');
                get[tmp[0]] = unescape(decodeURI(tmp[1]));
            }
            return get;
        }
    }
    // funcion para obtener la url

    //cargar lista de los items segun categoria

    //fin cargar lista segun categoria

    function onDeviceReady() {
        // Controlar la pausa de Cordova y reanudar eventos
        //alert("Menu");
        CargarLista()
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);
    };

    function CargarLista() {
        //var cadena = "<div class='row'>";
        //cadena = cadena + ""
        var cadena = "";


        //agregando evento Ajax
        var cadena1 = "";
        $.ajax({
            type: "GET",
            url: "http://192.168.0.11:8585/PostItemPortada.aspx?categoria=" + Catego,
            crossDomain: true,
            cache: false,
            contentType: "application/json; charset=utf-8",
            async: false,
            dataType: "json",
            success: function (result) {
                $.each(result, function (i, field) {
                    cadena = cadena + "<div class='row'>";
                    cadena = cadena + "<div class='col-md-3'>";
                    cadena = cadena + "<div class='ibox'>";
                    cadena = cadena + "<div class='ibox-content product-box'>";
                    cadena = cadena + "<div>";
                    cadena = cadena + "<img class='border-top' width='300' height='250' src='" + field.portada + "'/>";
                    cadena = cadena + "</div>";
                    cadena = cadena + "<div class='product-desc'>";
                    cadena = cadena + "<a href='#' class='product-name'>" + field.item + "</a>";
                    cadena = cadena + "<div class='small m-t-xs'>";
                    cadena = cadena + field.descripcion;
                    cadena = cadena + "</div>";
                    cadena = cadena + "<div class='m-t text-righ'>";
                    cadena = cadena + "<a href='DetalleItem.html?id=" + field.id + "' class='btn btn-xs btn-outline btn-primary'>Ir <i class='fa fa-long-arrow-right'></i> </a>";
                    cadena = cadena + "</div>";
                    cadena = cadena + "</div>";
                    cadena = cadena + "</div>";
                    cadena = cadena + "</div>";
                    cadena = cadena + "</div>";
                    cadena = cadena + "</div>";




                   

                });


                $("#divLista").append(cadena);
            },
            error: function (result) {
                alert("Ocurrió un problema. Por favor Comuníquese con el administrador del sistema. Gracias.");
            }
        });
    }
   

   




})();