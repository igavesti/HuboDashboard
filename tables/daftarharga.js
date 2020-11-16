var table = $('#dataTable').DataTable();     

var request = new XMLHttpRequest();
request.open('GET', 'https://hubo-service.herokuapp.com/daftar-harga', true);
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
			window.location.href = "layout-update-daftar-harga.html?id="+table.row('.selected').data()[0];
		}
    } );
	
	$('#insertButton').click( function () {
		window.location.href = "layout-insert-daftar-harga.html";
    } );
} );