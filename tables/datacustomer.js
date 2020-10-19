var table = $('#dataTable').DataTable();     

var request = new XMLHttpRequest();
request.open('GET', 'http://localhost:8080/data-customer', true);
request.onload = function () {

  var data = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
    
	data.forEach(data_kendaraan => {
		table.row.add( [
            data_kendaraan.id,
            data_kendaraan.nama,
            data_kendaraan.alamat,
            data_kendaraan.no_telp,
            data_kendaraan.pic
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
