var id = /[&?]id=([^&]+)/.exec(location.search);
id = id ? id[1].replace(/"/g, '&quot;') : '';

var customer = /[&?]customer=([^&]+)/.exec(location.search);
customer = customer ? customer[1].replace(/"/g, '&quot;') : '';

var table = $('#dataTable').DataTable();     

var request = new XMLHttpRequest();
request.open('GET', 'https://hubo-service.herokuapp.com/detail-transaction/'+id, true);
request.onload = function () {

  var data = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
	document.getElementById('valueIDTransaction').innerHTML = data.id_transaction;
	document.getElementById('valueCustomer').innerHTML = data.customer;
	data.detailTransaction.forEach(detailTransaction => {
		table.row.add( [
            detailTransaction.no_pol,
            detailTransaction.driver_name,
            detailTransaction.nama_barang,
            detailTransaction.rute_from,
            detailTransaction.rute_to,
            detailTransaction.no_do,
            detailTransaction.tanggal_muat,
            detailTransaction.tanggal_bongkar,
            detailTransaction.tonase,
            detailTransaction.keterangan
        ] ).draw( false );
    });
  } else {
    console.log('ERROR')
    const errorMessage = document.createElement('marquee');
    errorMessage.textContent = `Gah, it's not working!`;
    app.appendChild(errorMessage);
  }
}

request.send();

var insert_button = document.getElementById('button_insert');

//Do Something
function insertdata() {
	window.location.href = "layout-insert-surat-jalan.html?id="+id+"&customer="+customer;
}

insert_button.onclick = insertdata;