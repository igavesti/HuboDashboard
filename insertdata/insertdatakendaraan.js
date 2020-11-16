var insert_button = document.getElementById('insert');
var request = new XMLHttpRequest();

request.onload = function () {
  var data = this.response;
  alert(data)
}
request.onerror = function () {
  alert(this.statusText)
}

function insertdata() {
	request.open("PUT", 'https://hubo-service.herokuapp.com/data-kendaraan', false);
	request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	request.send(JSON.stringify(
	{
		"from": document.getElementById("inputFrom").value,
		"to": document.getElementById("inputTo").value, 
		"harga": document.getElementById("inputRpKg").value, 
		"borongan": document.getElementById("inputBorongan").value
	}
	));
}

$(function () {

    // INITIALIZE DATEPICKER PLUGIN
    $('.datepicker').datepicker({
        clearBtn: true,
        format: "dd/mm/yyyy"
    });


    // FOR DEMO PURPOSE
    $('#inputTanggalBerlaku').on('change', function () {
        var pickedDate = $('input').val();
        $('#pickedDate').html(pickedDate);
    });
});

insert_button.onclick = insertdata;