var ordersAPI = module.exports;

var MongoClient = require('mongodb').MongoClient;

var mongodbHost =  process.env.MONGODB_HOST; 
var mongodbPort = process.env.MONGODB_PORT;
var authenticate = 'mongouser:mongopass@'
var mongodbDatabase = process.env.MONGODB_DATABASE||'world'; // name of your MongoDB database instance

var mongoDBUrl = 'mongodb://' + authenticate + mongodbHost + ':' + mongodbPort + '/' + mongodbDatabase;
var nameOfCollection ="orders"

ordersAPI.insertOrderIntoDatabase = function (orderEvent) {
	var order = orderEvent.order
	console.log(`Order received for processing: ${JSON.stringify(order)} into collection ${nameOfCollection}` )
	// find all current orders:
    MongoClient.connect(mongoDBUrl, function (err, db) {
		console.log("read current orders ")
		if (err) throw err;
		var dbo = db.db(mongodbDatabase);
		dbo.collection(nameOfCollection).find({}).toArray(function(err, result) {
		  if (err) throw err;
		  console.log(result);
		  db.close();
		});
	  });

    MongoClient.connect(mongoDBUrl, function (err, db) {
		db.collection(nameOfCollection).insertMany([order], function (err, r) {
			if (err) {
				console.error("Problem with inserting order "+err)
			} else {
			   console.log(r.insertedCount + "orders created into collection " + nameOfCollection);
			}
		})//insertMany
	}//connect
	)

}