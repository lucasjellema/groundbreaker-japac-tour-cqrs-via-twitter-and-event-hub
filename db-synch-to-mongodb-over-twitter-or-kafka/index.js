var tweet = require("./tweet");
var eventListener = require("./EventListener");

var ordersAPI = require('./orders-api');

eventListener.subscribeToEvents(function (orderPayload) {
    order = JSON.parse(orderPayload)
    console.log("Order from Event is " + order);
    ordersAPI.insertOrderIntoDatabase(order)
}
)

