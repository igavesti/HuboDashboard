var table = $('#dataTable').DataTable();     

var request = new XMLHttpRequest();
request.open('GET', 'http://localhost:8080/data-kendaraan', true);
request.onload = function () {

  var data = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
    
	data.forEach(data_kendaraan => {
		table.row.add( [
            data_kendaraan.id,
            data_kendaraan.no_stnk,
            data_kendaraan.jenis,
            data_kendaraan.tahun_pembuatan,
            data_kendaraan.warna_mobil,
            data_kendaraan.nama_pemilik,
            data_kendaraan.alamat,
            data_kendaraan.merk,
            data_kendaraan.no_rangka,
            data_kendaraan.no_mesin,
            data_kendaraan.bahan_bakar,
            data_kendaraan.warna_tnkb,
            data_kendaraan.tahun_registrasi,
            data_kendaraan.nomor_bpkb,
            data_kendaraan.tanggal_berlaku,
            data_kendaraan.image_stnk_depan,
            data_kendaraan.image_stnk_belakang
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