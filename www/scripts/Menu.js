// Si quiere una introducción sobre la plantilla En blanco, vea la siguiente documentación:
// http://go.microsoft.com/fwlink/?LinkID=397704
// Para depurar código al cargar la página en cordova-simulate o en dispositivos o emuladores Android: inicie la aplicación, establezca puntos de interrupción 
// y ejecute "window.location.reload()" en la Consola de JavaScript.
(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function onDeviceReady() {
        // Controlar la pausa de Cordova y reanudar eventos
        //alert("Menu");
        CargarLista()
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);
    };

    function onPause() {
        // TODO: esta aplicación se ha suspendido. Guarde el estado de la aplicación aquí.
    };

    function onResume() {
        // TODO: esta aplicación se ha reactivado. Restaure el estado de la aplicación aquí.
    };


    function CargarLista() {
        //var cadena = "<div class='row'>";
        //cadena = cadena + ""
        var cadena = "";

       
        //agregando evento Ajax
        var cadena1 = "";
        $.ajax({
            type: "GET",
            url: "http://192.168.0.11:8585/PostCategorias.aspx",
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
                    cadena = cadena + "<img class='border-top' width='300' height='250' src='" + field.direccion + "'/>";
                    cadena = cadena + "</div>";
                    cadena = cadena + "<div class='product-desc'>";
                    cadena = cadena + "<a href='#' class='product-name'>" + field.nombre +"</a>";
                    cadena = cadena + "<div class='small m-t-xs'>";
                    cadena = cadena + field.descripcion;
                    cadena = cadena + "</div>";
                    cadena = cadena + "<div class='m-t text-righ'>";
                    cadena = cadena + "<a href='ListaItems.html?categoria=" + field.id + "' class='btn btn-xs btn-outline btn-primary'>Ir <i class='fa fa-long-arrow-right'></i> </a>";
                    cadena = cadena + "</div>";
                    cadena = cadena + "</div>";
                    cadena = cadena + "</div>";
                    cadena = cadena + "</div>";
                    cadena = cadena + "</div>";
                    cadena = cadena + "</div>";




                    ////cadena1 = cadena1 + field.nombre;
                    ////cadena1 = cadena1 +  field.id;
                    //cadena = "<div class='row'> <div class='col-md-3'> <div class='ibox'> <div class='ibox-content product-box'> <div> <img class='border- top' width='300' height='250' src='" + field.direccion + "/>  </div>  <div class='product- desc'> <a href='#' class='product- name'> Zapatos de Hombre</a> <div class='small m-t-xs'> Todo tipo de Zapato para Hombre </div> <div class='m-t text- righ'> <a href='ListaItems.html' class='btn btn- xs btn- outline btn- primary'>Ir <i class='fa fa- long - arrow - right'></i> </a>  </div> </div> </div> </div> </div> </div> "
                    //cadena = cadena + " <tr >" + "<td data-edicion=" + field.edicion + "class=center-wrapper ><h3 class= 'center-wrapper'>" + field.edicion + "</h3>" + " <img  align=middle border=5 style=display: block;  width=300 height=250 src=" + field.urlportada + ">" + "" + " </td>" + " </tr>";

                });
               

                $("#divLista").append(cadena);
            },
            error: function (result) {
                alert("Ocurrió un problema. Por favor Comuníquese con el administrador del sistema. Gracias.");
            }
        });
    }





})();