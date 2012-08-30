var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);

function dbStuff(){
    db.transaction(function(qry){
	qry.executeSql('CREATE TABLE IF NOT EXISTS LOGS (id unique, log)');
	qry.executeSql('INSERT INTO LOGS (id, log) VALUES (1, "foobar")');
    });
}

function getDbVal(){
    db.transaction(function(qry){
	qry.executeSql(' SELECT * FROM LOGS', [], function (tx, results) {
	    var len = results.rows.length, i;
	    msg = "<p>Found rows: " + len + "</p>";
	    $('#queryRes').html(msg);
	    for (i = 0; i < len; i++){
		msg = "<p><b>" + results.rows.item(i).log + "</b></p>";
		$('#status').html(msg);
	    }
	}, null);
    });  
}
