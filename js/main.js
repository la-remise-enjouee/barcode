$(document).ready(function() {
// document.addEventListener("DOMContentLoaded", function() {
    params = new URLSearchParams(window.location.search);
    start = parseInt(params.get("start"));
    cols = parseInt(params.get("cols"));
    rows = parseInt(params.get("rows"));

    // $("#test").JsBarcode("300999900000", {
    //     format: "EAN13"
    // });

    // foo = $("svg#template").clone().show();
    // foo.JsBarcode("300999900000", {
    //     format: "EAN13"
    // });
    // $("#barcodes").append(foo);

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
});

