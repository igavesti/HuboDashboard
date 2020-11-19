var insert_button = document.getElementById('insert');
var customerOption = document.getElementById('customerOption');
var customerIds = [];
var insertDataRequest = new XMLHttpRequest();

insertDataRequest.onload = function () {
  var data = this.response;
  alert(data)
}
insertDataRequest.onerror = function () {
  alert(this.statusText)
}

var getDataRequest = new XMLHttpRequest();
getDataRequest.open('GET', 'https://hubo-service.herokuapp.com/data-customer', false);
getDataRequest.onload = function () {

  var data = JSON.parse(this.response);
  if (getDataRequest.status >= 200 && getDataRequest.status < 400) {
	data.forEach(data_kendaraan => {
	  var option = document.createElement("option");
	  option.setAttribute("data-tokens", data_kendaraan.id + " - " + data_kendaraan.nama);
	  option.text = data_kendaraan.id + " - " + data_kendaraan.nama;
	  customerIds.push(data_kendaraan.id);
	  customerOption.add(option);
    });
  } else {
    console.log('ERROR')
    const errorMessage = document.createElement('marquee');
    errorMessage.textContent = `Gah, it's not working!`;
    app.appendChild(errorMessage);
  }
}

getDataRequest.send();

function insertdata() {
	insertDataRequest.open("PUT", 'https://hubo-service.herokuapp.com/transaction', false);
	insertDataRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	insertDataRequest.send(JSON.stringify(
	{
		"fk_customer_id": customerIds[customerOption.selectedIndex]
	}
	));
}

insert_button.onclick = insertdata;