Preparation

- get access to Oracle Database instance
- get access to MBase cloud and create MongoDB database
- create Kafka Topic on a Kafka Cluster
- create a Twitter account and App client credentials


Run ngrok

ngrok http 3000

Get the ngrok endpoint

open oracle-ddl.SQL
inject ngrok endpoint

open sys-prepare-ddl.SQL
inject ngrok endpoint

Open SQL Developer

Connect to Jose-DBaaS-Cloud (SYS)
run sys-prepare-ddl.SQL (at least salient pieces)


Connect to Jose-DBaaS-OrderMS (C##ORDERMS)
run oracle-ddl.SQL (at least salient pieces)

commandline, goto /db-synch-orcl-2-mongodb-over-twitter-or-kafka

run 
node index.js

now at localhost port 3000 - a Node application is listening, ready to receive GET requests from the database (or anyone else) for new orders and  publish Tweets for the orders (with JSON content)

commandline, /db-synch-to-mongodb-over-twitter-or-kafka

run
node index.js

Now an application is listening to both Twitter and Kafka Topic; for any Tweet or Event (for new orders) it will create a new Order document in MongoDB

open Twitter for hashtag #japacorderevent
https://twitter.com/search?vertical=default&q=%23japacorderevent&src=typd&lang=en

Open Browser, go to https://mlab.com/databases/world/collections/orders?q=&f=&s=&pageNum=0&pageSize=10
show current contents of Orders Document Collection in MongoDB databases

Back in SQL Developer, Jose-DBaaS-OrderMS (C##ORDERMS)
open table DVX_ORDERS
insert a new record.
Commit;


Now check in Twitter: there should be a new Tweet for this new order

Subsequently, the listener should have created the new order in MongoDB; check in MLab browser window.


Next:

stop the publisher in /db-synch-orcl-2-mongodb-over-twitter-or-kafka
open index.js
toggle the boolean publishOrderSynchEventOverKafka from false to true; 
this means that event forwarding no longer happens over Twitter but via Kafka

insert another new order in SQL Developer
check MongoDB
check Twitter
check command line for listener and/or forwarder


