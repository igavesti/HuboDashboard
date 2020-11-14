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
		"domisili": document.getElementById("inputDomisili").value,
		"image_ktp": document.getElementById("inputImageKTP").value
	}
	));
}

insert_button.onclick = insertdata;