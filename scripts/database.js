var databaseUrl = "mydb"; // "username:password@example.com/mydb"
var collections = ["testCollection"];
var db = require("mongojs").connect(databaseUrl, collections);


function getData() {
    db.testCollection.find(function(err, users) {
	if( err || !users) console.log("No data found");
	else users.forEach( function(data) {
	    console.log(data);
	} );
    });
    db.close();
}


getData();
