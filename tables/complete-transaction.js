var table = $('#dataTable').DataTable();     

var request = new XMLHttpRequest();
request.open('GET', 'https://hubo-service.herokuapp.com/complete-transaction', true);
request.onload = function () {

  var data = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
    
	data.forEach(incomplete_transaction => {
		var status = incomplete_transaction.status;
		if(status == "COMPLETE"){
			status = status.fontcolor("green");
		}
		else {
			status = status.fontcolor("red");
		}
		table.row.add( [
            incomplete_transaction.id,
            incomplete_transaction.fk_customer_id,
            incomplete_transaction.hal,
			status
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
		localStorage.setItem('transactionId', table.row( this ).data()[0]);
		localStorage.setItem('customerId', table.row( this ).data()[1]);
		localStorage.setItem('hal', table.row( this ).data()[2]);
		window.location.href = "layout-complete-transaction-detail.html";
    } );
} );