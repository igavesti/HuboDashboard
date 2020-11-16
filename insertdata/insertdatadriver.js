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
	request.open("PUT", 'https://hubo-service.herokuapp.com/data-driver', false);
	request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	request.send(JSON.stringify(
	{
		"nama": document.getElementById("inputNama").value,
		"tempat_lahir": document.getElementById("inputTempatLahir").value, 
		"tanggal_lahir": document.getElementById("inputTanggalLahir").value, 
		"domisili": document.getElementById("inputDomisili").value
		//TODO
		//"image_ktp": document.getElementById("inputImageKTP").value,
		//"image_kk": document.getElementById("inputImageKK").value,
		//"image_skck": document.getElementById("inputImageSKCK").value,
		//"image_surat_keterangan": document.getElementById("inputImageSuratKeterangan").value,
		//"image_sim": document.getElementById("inputImageSIM").value
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
    $('#inputTanggalLahir').on('change', function () {
        var pickedDate = $('input').val();
        $('#pickedDate').html(pickedDate);
    });
});

insert_button.onclick = insertdata;
