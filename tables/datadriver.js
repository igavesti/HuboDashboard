var table = $('#dataTable').DataTable();     

var request = new XMLHttpRequest();
request.open('GET', 'https://hubo-service.herokuapp.com/data-driver', true);
request.onload = function () {

  var data = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
    
	data.forEach(data_kendaraan => {
		table.row.add( [
            data_kendaraan.id,
            data_kendaraan.nama,
            data_kendaraan.tempat_lahir,
            data_kendaraan.tanggal_lahir,
            data_kendaraan.domisili,
            data_kendaraan.image_ktp,
            data_kendaraan.image_kk,
            data_kendaraan.image_skck,
            data_kendaraan.image_surat_keterangan,
            data_kendaraan.image_sim
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
