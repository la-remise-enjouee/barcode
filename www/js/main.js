$(document).ready(function() {
    var params = new URLSearchParams(window.location.search);
    var lastID;

    syncFormsWithURLParams();
    updateGenButton();
    fetchLastID()
        .done(load);

    $(".gridsize").on("change", function(evt) {
        updateGenButton();
    });

    $("#gen").on("click", async function() {
        cols = $("#cols").val();
        rows = $("#rows").val();
        incrLastID(cols * rows)
            .then(function() {
                $("#form").submit();
            });
    });

    function load() {
        cols = $("#cols").val();
        rows = $("#rows").val();
        start = lastID - cols * rows + 1;

        $("barcodes").empty();

        for (i=0; i<rows; i++) {
            row = $("<tr></tr>")
    
            for (j=0; j<cols; j++) {
                nextid = start + cols * i + j;
                nextcode = "3009999"+nextid.toString().padStart(5, 0);
                barcode = $("svg#template").clone().removeAttr("id").show();
    
                barcode.JsBarcode(nextcode, {
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

    function fetchLastID() {
        return $.get("http://localhost:5000/barcodes/last", null, 'json')
            .then(function(data) {
                lastID = data;
            })
            .catch(function(xhr, textStatus, errorThrown) {
                alert("Error requesting GET /barcodes/last: "+textStatus+": "+errorThrown);
            });
    }

    function incrLastID(n) {
        if (typeof n != "int" || n <= 0) {
            alert("error: invalid parameter while increasing last ID");
            return Promise.reject();
        }

        return fetchLastID()
            .then(function() {
                return $.ajax({
                    url: "http://localhost:5000/barcodes/last",
                    method: 'POST',
                    data: JSON.stringify({ "lastID": lastID+n }), 
                    contentType: 'application/json',
                    dataType: 'json'
                })
                .then(function() {
                    lastID += n;
                })
                .catch(function(xhr, textStatus, errorThrown) {
                    alert("Error requesting POST /barcodes/last: "+textStatus+": "+errorThrown);
                });
            });
    }

    function syncFormsWithURLParams() {   
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

    function updateGenButton() {
        cols = $("#cols").val();
        rows = $("#rows").val();
        size = cols * rows;
        $("#gen").val("Générer "+size+" nouveaux codes-barres");
    }
});

