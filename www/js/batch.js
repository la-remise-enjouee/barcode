$(document).ready(function() {
    var params = new URLSearchParams(window.location.search);

    syncFormsWithURLParams();
    load();

    function load() {
        code = $("#code").val();
        cols = $("#cols").val();
        rows = $("#rows").val();

        if (code == "") {
            return;
        }

        if (! /^[0-9]{12}$/.test(code)) {
            window.alert("Le code-barre doit contenir 12 chiffres (il ne faut pas mettre le dernier chiffre qui est la clé de contrôle)");
            return;
        }

        $("barcodes").empty();

        for (i=0; i<rows; i++) {
            row = $("<tr></tr>")
    
            for (j=0; j<cols; j++) {
                barcode = $("svg#template").clone().removeAttr("id").show();
    
                barcode.JsBarcode(code, {
                    format: "EAN13",
                    height: 85
                });
    
                cell = $("<td></td>");
                cell.append(barcode);
                row.append(cell);
            }
    
            $("#barcodes").append(row);
        }
    }

    function syncFormsWithURLParams() {   
        if (params.has("code")) {
            $("#code").val(params.get("code"));
        }
        if (!params.has("cols")) {
            $("#cols").val(4);
        } else {
            $("#cols").val(parseInt(params.get("cols")));
        }
        if (!params.has("rows")) {
            $("#rows").val(10);
        } else {
            $("#rows").val(parseInt(params.get("rows")));
        }
    }
});

