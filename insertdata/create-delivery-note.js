var id = /[&?]id=([^&]+)/.exec(location.search);
id = id ? id[1].replace(/"/g, '&quot;') : '';

var customer = /[&?]customer=([^&]+)/.exec(location.search);
customer = customer ? customer[1].replace(/"/g, '&quot;') : '';

var insert_button = document.getElementById('insert');

//Do Something
function insertdata() {
	alert( 'insert data berhasil' );
	window.location.href = "layout-incomplete-transaction-detail.html?id="+id+"&customer="+customer;
}

$(function () {

    // INITIALIZE DATEPICKER PLUGIN
    $('.datepicker').datepicker({
        clearBtn: true,
        format: "dd/mm/yyyy hh:ii"
    });


    // FOR DEMO PURPOSE
    $('#inputTanggalMuat').on('change', function () {
        var pickedDate = $('input').val();
        $('#pickedDate').html(pickedDate);
    });

    // FOR DEMO PURPOSE
    $('#inputTanggalBongkar').on('change', function () {
        var pickedDate = $('input').val();
        $('#pickedDate').html(pickedDate);
    });
});

insert_button.onclick = insertdata;