var uri = 'api/notas';
var items;
var edit = false;
$(document).ready(function () {
   
    
    getAllNotes();
    clearText();
    

    $('#save').on('click', save);
    
});
function clearText() {
    $('#nombre').val('');
    $('#texto').val('');
}
function deleteItem(ID) {
    $.ajax(uri + '/' + ID, { method: "DELETE" });
    $('#' + ID).remove();

}
function editItem(ID){
    
   
    items.forEach(function (item) {
        if (item.ID === ID) {
            $('#nombre').val(item.nombre);
            $('#texto').val(item.texto);
            $('#hidden').val(item.ID);
        }

        console.log('click edit');
    });
}



function getAllNotes() {
    // Send an AJAX request
    $.getJSON(uri)
        .done(function (data) {
            // On success, 'data' contains a list of products.
            $('#notas').html('');
            items = data;
            $.each(data, function (key, item) {
                // Add a list item for the product.
                
                $('<div class="notas-sep" id=' + item.ID + '>').appendTo($('#notas'));
                
                $('#' + item.ID).append("<button onclick='editItem("+item.ID+")'>Edit</button>");
                $('#' + item.ID).append('<button onclick="deleteItem(' + item.ID + ')">x</button>');
                $('#' + item.ID).append('<li> ' + formatItem(item) + '</li>');
            });
            $('.notas-sep').mouseenter(function () {
                $(this).animate({
                    height: '+=10px',
                    width:'+=10px'
                    
                });
            });
            $('.notas-sep').mouseleave(function () {
                $(this).animate({
                    height: '-=10px',
                    width: '-=10px'
                });
                
            });
        });
}
function formatItem(item) {
    return item.nombre + ': ' + item.texto;
}

function find() {
    var id = $('#ID').val();
    $.getJSON(uri + '/' + id)
        .done(function (data) {
            $('#nota').text(formatItem(data));
        })
        .fail(function (jqXHR, textStatus, err) {
            $('#nota').text('Error: ' + err);
        });
}

function save() {
    var hidden = $('#hidden').val();
    
    if (hidden) {
        
        var nombre = $('#nombre').val();
        var texto = $('#texto').val();
        var nota = { 'ID': hidden, 'nombre': nombre, 'texto': texto }
        
        $.ajax(uri + '/' + hidden, {
            method: "PUT",
            data: nota,
            success: function () {
                $('#hidden').val('');
                getAllNotes();
            }
        });
        
        console.log('edita');
    }
    else {
        var nombre = $('#nombre').val();
        var texto = $('#texto').val();
        var nota = { 'nombre': nombre, 'texto': texto }
        $.post(uri, nota, function () {
            getAllNotes();

        });
        
    }
    
    clearText();



    

    //.fail(function (jqXHR, textStatus, err) {
    //    $('#errorSave').text('Error: ' + err);
    //});






}