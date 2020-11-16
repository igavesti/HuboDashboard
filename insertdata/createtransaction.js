var insert_button = document.getElementById('insert');
var customerOption = document.getElementById('customerOption');

var getDataRequest = new XMLHttpRequest();
getDataRequest.open('GET', 'https://hubo-service.herokuapp.com/data-customer', false);
getDataRequest.onload = function () {

  var data = JSON.parse(this.response);
  if (getDataRequest.status >= 200 && getDataRequest.status < 400) {
	data.forEach(data_kendaraan => {
	  var option = document.createElement("option");
	  option.text = data_kendaraan.nama;
	  
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
	alert( 'insert data berhasil' );
}

insert_button.onclick = insertdata;