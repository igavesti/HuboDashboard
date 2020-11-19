var id = /[&?]id=([^&]+)/.exec(location.search);
id = id ? id[1].replace(/"/g, '&quot;') : '';

var customer = /[&?]customer=([^&]+)/.exec(location.search);
customer = customer ? customer[1].replace(/"/g, '&quot;') : '';

var table = $('#dataTable').DataTable();     

document.getElementById('valueIDTransaction').innerHTML = id;
document.getElementById('valueCustomer').innerHTML = customer;
var request = new XMLHttpRequest();
request.open('GET', 'https://hubo-service.herokuapp.com/detail-transaction/'+id, true);
request.onload = function () {

  var data = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
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