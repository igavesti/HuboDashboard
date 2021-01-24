var table = $('#dataTable').DataTable();     

var request = new XMLHttpRequest();
request.open('GET', 'https://hubo-service.herokuapp.com/data-kendaraan', true);
request.onload = function () {

  var data = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
    
	data.forEach(data_kendaraan => {
		table.row.add( [
            data_kendaraan.id,
            data_kendaraan.no_pol,
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
            format(data_kendaraan.tanggal_berlaku_stnk),
            data_kendaraan.nomor_kir,
            format(data_kendaraan.tanggal_berlaku_kir),
            data_kendaraan.image_stnk_depan,
            data_kendaraan.image_stnk_belakang,
            data_kendaraan.image_kir_depan,
            data_kendaraan.image_kir_belakang
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

$(document).ready(function() { 
    $('#dataTable tbody').on( 'click', 'tr', function () {
        if ( $(this).hasClass('selected') ) {
            $(this).removeClass('selected');
        }
        else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    } );
 
 
    $('#editButton').click( function () {
		if ( table.row('.selected').length == 0 ) {
			alert('Please select the row before edit');
        }
		else {
			localStorage.setItem('idTable', table.row('.selected').data()[0]);
			window.location.href = "layout-update-data-kendaraan.html";
		}
    } );
	
	$('#insertButton').click( function () {
		window.location.href = "layout-insert-data-kendaraan.html";
    } );
} );

function format(inputDate) {
    var date = new Date(inputDate);
    if (!isNaN(date.getTime())) {
        return date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
    }
}