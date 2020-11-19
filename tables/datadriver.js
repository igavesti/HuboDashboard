var table = $('#dataTable').DataTable();     

var request = new XMLHttpRequest();
request.open('GET', 'https://hubo-service.herokuapp.com/data-driver', true);
request.onload = function () {

  var data = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
    
	data.forEach(data_driver => {
		table.row.add( [
            data_driver.id,
            data_driver.nama,
            data_driver.tempat_lahir,
            format(data_driver.tanggal_lahir),
            data_driver.domisili,
            data_driver.status,
            data_driver.image_ktp,
            data_driver.image_kk,
            data_driver.image_skck,
            data_driver.image_surat_keterangan,
            data_driver.image_sim
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
			window.location.href = "layout-update-data-driver.html?id="+table.row('.selected').data()[0];
		}
    } );
	
	$('#insertButton').click( function () {
		window.location.href = "layout-insert-data-driver.html";
    } );
} );

function format(inputDate) {
    var date = new Date(inputDate);
    if (!isNaN(date.getTime())) {
        return date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
    }
}