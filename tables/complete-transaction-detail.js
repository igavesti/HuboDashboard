var id = /[&?]id=([^&]+)/.exec(location.search);
id = id ? id[1].replace(/"/g, '&quot;') : '';

var customer = /[&?]customer=([^&]+)/.exec(location.search);
customer = customer ? customer[1].replace(/"/g, '&quot;') : '';

var table = $('#dataTable').DataTable();     

var request = new XMLHttpRequest();
request.open('GET', 'http://localhost:8080/complete-transaction-detail/'+id+'/'+customer, true);
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