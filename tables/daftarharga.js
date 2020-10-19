var table = $('#dataTable').DataTable();     

var request = new XMLHttpRequest();
request.open('GET', 'http://localhost:8080/daftar-harga', true);
request.onload = function () {

  var data = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
    
	data.forEach(data_kendaraan => {
		table.row.add( [
            data_kendaraan.id,
            data_kendaraan.from,
            data_kendaraan.to,
            data_kendaraan.harga,
            data_kendaraan.borongan
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
