var update_button = document.getElementById('update');
var id = localStorage.getItem('idTable') == null ? '' : localStorage.getItem('idTable');
localStorage.removeItem('idTable');

document.getElementById("id").value = id;

var updateDataRequest = new XMLHttpRequest();

/*Init data*/
var getDataRequest = new XMLHttpRequest();
getDataRequest.open('GET', 'https://hubo-service.herokuapp.com/data-customer/'+id, false);
getDataRequest.onload = function () {

  var data = JSON.parse(this.response);
  if (getDataRequest.status >= 200 && getDataRequest.status < 400) {
	document.getElementById("inputNama").value = data.nama;
	document.getElementById("inputAlamat").value = data.alamat;
	document.getElementById("inputNoTelp").value = data.no_telp;
	document.getElementById("inputPIC").value = data.pic;
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
	updateDataRequest.open("POST", 'https://hubo-service.herokuapp.com/data-customer', false);
	updateDataRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	updateDataRequest.send(JSON.stringify(
	{
		"nama": document.getElementById("inputNama").value,
		"alamat": document.getElementById("inputAlamat").value, 
		"no_telp": document.getElementById("inputNoTelp").value, 
		"pic": document.getElementById("inputPIC").value,
		"id": document.getElementById("id").value
	}
	));
}
/*Update Data*/

update_button.onclick = updatedata;