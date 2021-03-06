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
		"no_pol": document.getElementById("inputNoPol").value,
		"jenis": document.getElementById("inputJenis").value,
		"tahun_pembuatan": document.getElementById("inputTahunPembuatan").value,
		"warna_mobil": document.getElementById("inputWarnaMobil").value,
		"nama_pemilik": document.getElementById("inputNamaPemilik").value,
		"alamat": document.getElementById("inputAlamat").value,
		"merk": document.getElementById("inputMerk").value,
		"no_rangka": document.getElementById("inputNoRangka").value,
		"no_mesin": document.getElementById("inputNoMesin").value,
		"bahan_bakar": document.getElementById("inputBahanBakar").value,
		"warna_tnkb": document.getElementById("inputWarnaTnkb").value,
		"tahun_registrasi": document.getElementById("inputTahunRegistrasi").value,
		"nomor_bpkb": document.getElementById("inputNomorBPKB").value,
		"tanggal_berlaku_stnk": document.getElementById("inputTanggalBerlakuSTNK").value,
		"nomor_kir": document.getElementById("inputNomorKIR").value,
		"tanggal_berlaku_kir": document.getElementById("inputTanggalBerlakuKIR").value
		//TODO
		//"image_stnk_depan": document.getElementById("inputSTNKDepan").value,
		//"image_stnk_belakang": document.getElementById("inputSTNKBelakang").value,
		//"image_kir_depan": document.getElementById("inputKIRDepan").value,
		//"image_kir_belakang": document.getElementById("inputKIRBelakang").value,
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
    $('#inputTanggalBerlakuSTNK').on('change', function () {
        var pickedDate = $('input').val();
        $('#pickedDate').html(pickedDate);
    });
    $('#inputTanggalBerlakuKIR').on('change', function () {
        var pickedDate = $('input').val();
        $('#pickedDate').html(pickedDate);
    });
});

insert_button.onclick = insertdata;