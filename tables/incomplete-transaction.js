var table = $('#dataTable').DataTable();     

var request = new XMLHttpRequest();
request.open('GET', 'https://hubo-service.herokuapp.com/incomplete-transaction', true);
request.onload = function () {

  var data = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
    
	data.forEach(incomplete_transaction => {
		table.row.add( [
            incomplete_transaction.id_transaction,
            incomplete_transaction.customer
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
    var table = $('#dataTable').DataTable();
 
    $('#dataTable tbody').on( 'click', 'tr', function () {
		window.location.href = "layout-incomplete-transaction-detail.html?id="+table.row( this ).data()[0]+"&customer="+table.row( this ).data()[1];
    } );
} );