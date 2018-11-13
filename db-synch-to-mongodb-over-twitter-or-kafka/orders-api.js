var ordersAPI = module.exports;

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var mongodbHost =  process.env.MONGODB_HOST; // something like ||'ds18912891276.mlab.com';
var mongodbPort = process.env.MONGODB_PORT||'39791';
var authenticate = 'mongouser:mongopass@'
var mongodbDatabase = 'world'; // name of your MongoDB database instance

var mongoDBUrl = 'mongodb://' + authenticate + mongodbHost + ':' + mongodbPort + '/' + mongodbDatabase;
var nameOfCollection ="orders"

ordersAPI.insertOrderIntoDatabase = function (order) {
    console.log("Order received for processing: "+JSON.stringify(order))
    MongoClient.connect(mongoDBUrl, function (err, db) {
		db.collection(nameOfCollection).insertMany([order], function (err, r) {
			console.log(r.insertedCount + "orders created into collection " + nameOfCollection);
		})//insertMany
	}//connect
	)

}