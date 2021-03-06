var update_button = document.getElementById('update');
var id = localStorage.getItem('idTable') == null ? '' : localStorage.getItem('idTable');

localStorage.removeItem('idTable');

if(id === '') {
  window.location.href = "layout-data-kendaraan.html";
}

document.getElementById("id").value = id;

var updateDataRequest = new XMLHttpRequest();

/*Init data*/
var getDataRequest = new XMLHttpRequest();
getDataRequest.open('GET', 'https://hubo-service.herokuapp.com/data-kendaraan/'+id, false);
getDataRequest.onload = function () {

  var data = JSON.parse(this.response);
  if (getDataRequest.status >= 200 && getDataRequest.status < 400) {
	document.getElementById("inputNoPol").value = data.no_pol;
	document.getElementById("inputJenis").value = data.jenis;
	document.getElementById("inputTahunPembuatan").value = data.tahun_pembuatan;
	document.getElementById("inputWarnaMobil").value = data.warna_mobil;
	document.getElementById("inputNamaPemilik").value = data.nama_pemilik;
	document.getElementById("inputAlamat").value = data.alamat;
	document.getElementById("inputMerk").value = data.merk;
	document.getElementById("inputNoRangka").value = data.no_rangka;
	document.getElementById("inputNoMesin").value = data.no_mesin;
	document.getElementById("inputBahanBakar").value = data.bahan_bakar;
	document.getElementById("inputWarnaTnkb").value = data.warna_tnkb;
	document.getElementById("inputTahunRegistrasi").value = data.tahun_registrasi;
	document.getElementById("inputNomorBPKB").value = data.nomor_bpkb;
	document.getElementById("inputTanggalBerlakuSTNK").value = format(data.tanggal_berlaku_stnk);
	document.getElementById("inputNomorKIR").value = data.nomor_kir;
	document.getElementById("inputTanggalBerlakuKIR").value = format(data.tanggal_berlaku_kir);
		//TODO
	//document.getElementById("inputSTNKDepan").value = data.image_stnk_depan;
	//document.getElementById("inputSTNKBelakang").value = data.image_stnk_belakang;
	//document.getElementById("inputKIRDepan").value = data.image_kir_depan;
	//document.getElementById(""inputKIRBelakang"").value = data.image_kir_belakang;
  } else {
    console.log('ERROR')
    const errorMessage = document.createElement('marquee');
    errorMessage.textContent = `Gah, it's not working!`;
    app.appendChild(errorMessage);
  }
}

getDataRequest.send();
/*Init data*/

/*Update Data*/
updateDataRequest.onload = function () {
  var data = this.response;
  alert(data)
}
updateDataRequest.onerror = function () {
  alert(this.statusText)
}

function updatedata() {
	updateDataRequest.open("POST", 'https://hubo-service.herokuapp.com/data-kendaraan', false);
	updateDataRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	updateDataRequest.send(JSON.stringify(
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
		"tanggal_berlaku_kir": document.getElementById("inputTanggalBerlakuKIR").value,
		//TODO
		//"image_stnk_depan": document.getElementById("inputSTNKDepan").value,
		//"image_stnk_belakang": document.getElementById("inputSTNKBelakang").value,
		//"image_kir_depan": document.getElementById("inputKIRDepan").value,
		//"image_kir_belakang": document.getElementById("inputKIRBelakang").value,
		"id": document.getElementById("id").value
	}
	));
}
/*Update Data*/

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

function format(inputDate) {
    var date = new Date(inputDate);
    if (!isNaN(date.getTime())) {
        return date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
    }
}

update_button.onclick = updatedata;