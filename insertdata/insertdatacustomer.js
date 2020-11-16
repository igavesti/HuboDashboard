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
	request.open("PUT", 'https://hubo-service.herokuapp.com/data-customer', false);
	request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	request.send(JSON.stringify(
	{
		"nama": document.getElementById("inputNama").value,
		"alamat": document.getElementById("inputAlamat").value, 
		"no_telp": document.getElementById("inputNoTelp").value, 
		"pic": document.getElementById("inputPIC").value
	}
	));
}

insert_button.onclick = insertdata;