var update_button = document.getElementById('update');
var id = localStorage.getItem('idTable') == null ? '' : localStorage.getItem('idTable');

localStorage.removeItem('idTable');

if(id === '') {
  window.location.href = "layout-data-driver.html";
}

document.getElementById("id").value = id;

var updateDataRequest = new XMLHttpRequest();

/*Init data*/
var getDataRequest = new XMLHttpRequest();
getDataRequest.open('GET', 'https://hubo-service.herokuapp.com/data-driver/'+id, false);
getDataRequest.onload = function () {

  var data = JSON.parse(this.response);
  if (getDataRequest.status >= 200 && getDataRequest.status < 400) {
	document.getElementById("inputNama").value = data.nama;
	document.getElementById("inputTempatLahir").value = data.tempat_lahir;
	document.getElementById("inputTanggalLahir").value = format(data.tanggal_lahir);
	document.getElementById("inputDomisili").value = data.domisili;
	
	
	var opts = document.getElementById("inputStatus").options;
	for (var opt, j = 0; opt = opts[j]; j++) {
		if (opt.value == data.status) {
			document.getElementById("inputStatus").selectedIndex = j;
			break;
		}
	}
	
	//TODO
	//document.getElementById("inputImageKTP").value = data.image_ktp;
	//document.getElementById("inputImageKK").value = data.image_kk;
	//document.getElementById("inputImageSKCK").value = data.image_skck;
	//document.getElementById("inputImageSuratKeterangan").value = data.image_surat_keterangan;
	//document.getElementById("inputImageSIM").value = data.image_sim;
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
	updateDataRequest.open("POST", 'https://hubo-service.herokuapp.com/data-driver', false);
	updateDataRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	updateDataRequest.send(JSON.stringify(
	{
		"nama": document.getElementById("inputNama").value,
		"tempat_lahir": document.getElementById("inputTempatLahir").value, 
		"tanggal_lahir": document.getElementById("inputTanggalLahir").value, 
		"domisili": document.getElementById("inputDomisili").value,
		"status": document.getElementById("inputStatus").value,
		//TODO
		//"image_ktp": document.getElementById("inputImageKTP").value
		//"image_kk": document.getElementById("inputImageKK").value,
		//"image_skck": document.getElementById("inputImageSKCK").value,
		//"image_surat_keterangan": document.getElementById("inputImageSuratKeterangan").value,
		//"image_sim": document.getElementById("inputImageSIM").value
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
    $('#inputTanggalLahir').on('change', function () {
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