var id = /[&?]id=([^&]+)/.exec(location.search);
id = id ? id[1].replace(/"/g, '&quot;') : '';

var customer = /[&?]customer=([^&]+)/.exec(location.search);
customer = customer ? customer[1].replace(/"/g, '&quot;') : '';

var table = $('#dataTable').DataTable();     

document.getElementById('valueIDTransaction').innerHTML = id;
document.getElementById('valueCustomer').innerHTML = customer;

var updateRequest = new XMLHttpRequest();

updateRequest.onload = function () {
  var data = this.response;
  alert(data);
  window.location.href = "layout-complete-transaction.html";
}
updateRequest.onerror = function () {
  alert(this.statusText);
}

var getRequest = new XMLHttpRequest();
getRequest.open('GET', 'https://hubo-service.herokuapp.com/detail-transaction/'+id, true);
getRequest.onload = function () {

  var data = JSON.parse(this.response);
  if (getRequest.status >= 200 && getRequest.status < 400) {
	data.forEach(detailTransaction => {
		table.row.add( [
            detailTransaction.id,
            detailTransaction.no_pol,
            detailTransaction.nama_driver,
            detailTransaction.nama_barang,
            detailTransaction.rute_awal,
            detailTransaction.rute_tujuan,
            detailTransaction.no_do,
            detailTransaction.tonase,
            detailTransaction.tanggal_muat,
            detailTransaction.tanggal_bongkar,
            detailTransaction.keterangan
			//TODO
			//detailTransaction.image_surat_jalan
        ] ).draw( false );
    });
  } else {
    console.log('ERROR')
    const errorMessage = document.createElement('marquee');
    errorMessage.textContent = `Gah, it's not working!`;
    app.appendChild(errorMessage);
  }
}

getRequest.send();

var insert_button = document.getElementById('insertButton');
var cancel_button = document.getElementById('cancelButton');
var complete_button = document.getElementById('completeButton');

function insertdata() {
	window.location.href = "layout-insert-surat-jalan.html?id="+id+"&customer="+customer;
}

function cancelTransaction() {
	updateRequest.open("POST", 'https://hubo-service.herokuapp.com/incomplete-transaction/cancel', false);
	updateRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	updateRequest.send(JSON.stringify(
	{
		"id": id
	}
	));
}

function completeTransaction() {
	updateRequest.open("POST", 'https://hubo-service.herokuapp.com/incomplete-transaction/complete', false);
	updateRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	updateRequest.send(JSON.stringify(
	{
		"id": id
	}
	));
}

insert_button.onclick = insertdata;
cancel_button.onclick = cancelTransaction;
complete_button.onclick = completeTransaction;