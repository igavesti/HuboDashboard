var id = /[&?]id=([^&]+)/.exec(location.search);
id = id ? id[1].replace(/"/g, '&quot;') : '';

var customer = /[&?]customer=([^&]+)/.exec(location.search);
customer = customer ? customer[1].replace(/"/g, '&quot;') : '';

var insert_button = document.getElementById('insert');


var insertRequest = new XMLHttpRequest();

insertRequest.onload = function () {
  var data = this.response;
  alert(data)
  window.location.href = "layout-incomplete-transaction-detail.html?id="+id+"&customer="+customer;
}
insertRequest.onerror = function () {
  alert(this.statusText)
}

function insertdata() {
	insertRequest.open("PUT", 'https://hubo-service.herokuapp.com/detail-transaction', false);
	insertRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	insertRequest.send(JSON.stringify(
	{
		"transactionId": id,
		"kendaraanId": kendaraanIds[kendaraanOption.selectedIndex],
		"driverId": driverIds[driverOption.selectedIndex],
		"nama_barang": document.getElementById("inputNamaBarang").value,
		"rute_awal": document.getElementById("inputRuteAsal").value,
		"rute_tujuan": document.getElementById("inputRuteTujuan").value,
		"harga": document.getElementById("inputHarga").value,
		"no_do": document.getElementById("inputNoDo").value,
		"tanggal_muat": document.getElementById("inputTanggalMuat").value,
		"tanggal_bongkar": document.getElementById("inputTanggalBongkar").value,
		"tonase": document.getElementById("inputTonase").value,
		"keterangan": document.getElementById("inputKeterangan").value
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
    $('#inputTanggalMuat').on('change', function () {
        var pickedDate = $('input').val();
        $('#pickedDate').html(pickedDate);
    });

    // FOR DEMO PURPOSE
    $('#inputTanggalBongkar').on('change', function () {
        var pickedDate = $('input').val();
        $('#pickedDate').html(pickedDate);
    });
});

insert_button.onclick = insertdata;



var driverOption = document.getElementById('driverOption');
var driverIds = [];

var kendaraanOption = document.getElementById('kendaraanOption');
var kendaraanIds = [];

var getDataRequest = new XMLHttpRequest();
var getDataRequest2 = new XMLHttpRequest();
getDataRequest.open('GET', 'https://hubo-service.herokuapp.com/data-driver', false);
getDataRequest.onload = function () {


  var data = JSON.parse(this.response);
  if (getDataRequest.status >= 200 && getDataRequest.status < 400) {
	data.forEach(data_driver => {
	  var option = document.createElement("option");
	  option.setAttribute("data-tokens", data_driver.id + " - " + data_driver.nama);
	  option.text = data_driver.id + " - " + data_driver.nama;
	  driverIds.push(data_driver.id);
	  driverOption.add(option);	  
    });
	
	
	getDataRequest2.open('GET', 'https://hubo-service.herokuapp.com/data-kendaraan', false);
	getDataRequest2.onload = function () {
	  var data2 = JSON.parse(this.response);
	  if (getDataRequest2.status >= 200 && getDataRequest2.status < 400) {
		data2.forEach(data_kendaraan => {
		  var option2 = document.createElement("option");
		  option2.setAttribute("data-tokens", data_kendaraan.id + " - " + data_kendaraan.no_pol);
		  option2.text = data_kendaraan.id + " - " + data_kendaraan.no_pol;
		  kendaraanIds.push(data_kendaraan.id);
		  kendaraanOption.add(option2);	  
		});
	  } else {
		console.log('ERROR')
		const errorMessage = document.createElement('marquee');
		errorMessage.textContent = `Gah, it's not working!`;
		app.appendChild(errorMessage);
	  }
	}

	getDataRequest2.send();
  } else {
    console.log('ERROR')
    const errorMessage = document.createElement('marquee');
    errorMessage.textContent = `Gah, it's not working!`;
    app.appendChild(errorMessage);
  }
}

getDataRequest.send();
