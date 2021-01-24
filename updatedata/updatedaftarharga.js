var update_button = document.getElementById('update');
var id = localStorage.getItem('idTable') == null ? '' : localStorage.getItem('idTable');

localStorage.removeItem('idTable');

if(id === '') {
  window.location.href = "layout-daftar-harga.html";
}

document.getElementById("id").value = id;

var updateDataRequest = new XMLHttpRequest();

/*Init data*/
var getDataRequest = new XMLHttpRequest();
getDataRequest.open('GET', 'https://hubo-service.herokuapp.com/daftar-harga/'+id, false);
getDataRequest.onload = function () {

  var data = JSON.parse(this.response);
  if (getDataRequest.status >= 200 && getDataRequest.status < 400) {
	document.getElementById("inputFrom").value = data.from;
	document.getElementById("inputTo").value = data.to;
	document.getElementById("inputRpKg").value = data.harga;
	document.getElementById("inputBorongan").value = data.borongan;
	document.getElementById("inputJenisKendaraan").value = data.jenis_kendaraan;
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
	updateDataRequest.open("POST", 'https://hubo-service.herokuapp.com/daftar-harga', false);
	updateDataRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	updateDataRequest.send(JSON.stringify(
	{
		"from": document.getElementById("inputFrom").value,
		"to": document.getElementById("inputTo").value, 
		"harga": document.getElementById("inputRpKg").value, 
		"borongan": document.getElementById("inputBorongan").value,
		"jenis_kendaraan": document.getElementById("inputJenisKendaraan").value,
		"id": document.getElementById("id").value
	}
	));
}
/*Update Data*/

update_button.onclick = updatedata;