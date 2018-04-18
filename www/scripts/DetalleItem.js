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
    var coditem = valores['id'];
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
        Cargarinfo()
        document.getElementById("btnpedir").addEventListener('click', RegistrarPedido, false)

    };

     function CargarLista() {
         var cadena = "<div class='product-images'>";
         $.ajax({
            type: "GET",
            url: "http://192.168.0.11:8585/PosDetalleItem.aspx?id=" + coditem,
            crossDomain: true,
            cache: false,
            contentType: "application/json; charset=utf-8",
            async: false,
            dataType: "json",
            success: function (result) {
                $.each(result, function (i, field) {
                    cadena = cadena + " <div>";
                    cadena = cadena + " <div >";
                    cadena = cadena + " <img class='border-top' width='225' height='250' src='" + field.Imagen + "'/>";
                    cadena = cadena + "</div>";
                    cadena = cadena + "</div>";
                });
                cadena = cadena + "</div>"
                $("#divLista").append(cadena);
            },
            error: function (result) {
                alert("Ocurrió un problema. Por favor Comuníquese con el administrador del sistema. Gracias.");
            }
        });
    }


     function Cargarinfo() {
         var titulo = "";
         var descripcion = "";
         $.ajax({
             type: "GET",
             url: "http://192.168.0.11:8585/PostInfoItem.aspx?id=" + coditem,
             crossDomain: true,
             cache: false,
             contentType: "application/json; charset=utf-8",
             async: false,
             dataType: "json",
             success: function (result) {
                 $.each(result, function (i, field) {
                     titulo = field.item;
                     descripcion = field.descripcion;
                 });
                 $("#titulo").append(titulo);
                 $("#descripcion").append(descripcion);

             },
             error: function (result) {
                 alert("Ocurrió un problema. Por favor Comuníquese con el administrador del sistema. Gracias.");
             }
         });
     }



     function RegistrarPedido() {
         var nombre = document.getElementById("nombre").value;
         var telefono = document.getElementById("telefono").value;
         var talla = document.getElementById("talla").value;
         var localidad = document.getElementById("localidad").value;
         if (nombre == "") {
             alert("Ingrese un nombre!");
             return false;
         }
         if (telefono == "") {
             alert("Ingrese un telefono!");
             return false;
         }
         if (talla == "") {
             alert("seleccione una talla!");
             return false;
         }
         if (localidad == "") {
             alert("Seleccione una localidad!");
             return false;
         }
         var insert = 0;
         if (confirm("Estas seguro?")) {
             //agregando evento Ajax
             $.ajax({
                 type: "GET",
                 url: "http://192.168.0.11:8585/PostRegistraPedido.aspx?iditem=" + coditem + "&nombre=" + nombre + "&telefono=" + telefono + "&talla=" + talla + "&localidad=" + localidad,
                 crossDomain: true,
                 cache: false,
                 contentType: "application/json; charset=utf-8",
                 async: false,
                 dataType: "json",
                 success: function (result) {

                     alert("!ENSEGUIDA TE LLAMAREMOS!");
                     document.getElementById("nombre").value = "";
                     document.getElementById("telefono").value = "";
                
                 },
                 error: function (result) {
                     alert("Ocurrió un problema. Por favor Comuníquese con el administrador del sistema. Gracias.");
                 }
             });
         }
     }




  




})();