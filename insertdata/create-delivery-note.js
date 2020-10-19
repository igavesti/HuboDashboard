var id = /[&?]id=([^&]+)/.exec(location.search);
id = id ? id[1].replace(/"/g, '&quot;') : '';

var customer = /[&?]customer=([^&]+)/.exec(location.search);
customer = customer ? customer[1].replace(/"/g, '&quot;') : '';

var insert_button = document.getElementById('insert');

//Do Something
function insertdata() {
	alert( 'insert data berhasil' );
	window.location.href = "layout-incomplete-transaction-detail.html?id="+id+"&customer="+customer;
}

insert_button.onclick = insertdata;