$(document).ready(function() {
// document.addEventListener("DOMContentLoaded", function() {
    var params = new URLSearchParams(window.location.search);

    function load() {
        cols = $("#cols").val();
        rows = $("#rows").val();
        start = getLastID() - cols * rows + 1;

        $("barcodes").empty();

        for (i=0; i<rows; i++) {
            row = $("<div></div>");
    
            for (j=0; j<cols; j++) {
                nextid = start + cols * i + j;
                nextcode = "3009999"+nextid.toString().padStart(5, 0);
                barcode = $("svg#template").clone().removeAttr("id").show();
    
                barcode.JsBarcode(nextcode, {
                    format: "EAN13"
                });
    
                row.append(barcode);
            }
    
            $("#barcodes").append(row);
        }
    }

    function getLastID() {
        // TODO get from file
        return 39;
    }

    function incrLastID(n) {
        // TODO incr value in file
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

    $("#gen").on("click", function() {
        cols = $("#cols").val();
        rows = $("#rows").val();
        incrLastID(cols * rows);
    });

    load();
});

