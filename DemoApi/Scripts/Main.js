var uri = 'api/notas';

$(document).ready(function () {
   
    getAllNotes();
    $('.notas-sep').mouseenter(function () {
        $(this).animate({
            height: '+=10px'
        });
    });
    $('.notas-sep').mouseleave(function () {
        $(this).animate({
            height: '-=10px'
        });
        $(this).fadeTo('fast', 0.5);
    });
   

    $('#save').on('click', save);
});
function deleteItem(ID) {
    $.ajax(uri + '/' + ID, { method: "DELETE" });
    $('#' + ID).remove();

}
function editItem(item){
    //$.ajax(uri + '/' + ID, { method: "PUT" });
    $('#nombre').val('HOLAS');
    $('#texto').val(item.texto);
    alert('click');
    
    /*var nombre = $('#nombre').val();
    var texto = $('#texto').val();
    var nota = { 'nombre': nombre, 'texto': texto }
    $.ajax(uri + '/' + item.ID, {
        method: "PUT",
        contentType: "application/json",
        data: nota,

        function() {
            getAllNotes();
        } */
     }   



function getAllNotes() {
    // Send an AJAX request
    $.getJSON(uri)
        .done(function (data) {
            var itid = 0;
            // On success, 'data' contains a list of products.
            //$('#notas').html('');
            $.each(data, function (key, item) {
                // Add a list item for the product.
                itid = item.ID;
                $('<div class="notas-sep" id=' + itid + '>').appendTo($('#notas'));
                $('#' + item.ID).append('<button onclick="editItem(' + item + ')">Edit</button>');
                $('#' + item.ID).append('<button onclick="deleteItem(' + item.ID + ')">x</button>');
                $('#' + item.ID).append('<li> ' + formatItem(item) + '</li>');
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

    var nombre = $('#nombre').val();
    var texto = $('#texto').val();
    var nota = { 'nombre': nombre, 'texto': texto }
    $.post(uri, nota, function () {
        getAllNotes();

    });
    clearText();


    function clearText() {
        $('#nombre').val('');
        $('#texto').val('');
    }

    //.fail(function (jqXHR, textStatus, err) {
    //    $('#errorSave').text('Error: ' + err);
    //});






}