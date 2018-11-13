SELECT utl_http.request('http://2bfa7414.ngrok.io/about') FROM dual;


create table dvx_orders
( id varchar2(200)
, status varchar2(100)
, customer_id varchar2(200)
, customer_name varchar2(200)
, shipping_destination varchar2(200)
, last_updated_timestamp timestamp default systimestamp
);



create or replace
procedure publish_order_event
( p_order_id in varchar2
, p_status in varchar2
, p_customer_id in varchar2
, p_customer_name in varchar2
, p_shipping_destination in varchar2
, p_last_update_timestamp in timestamp default systimestamp
) is
  url varchar2(4000) := 'http://2bfa7414.ngrok.io:80/order';
  urlparams varchar2(4000) := utl_url.escape('orderId='||p_order_id
  ||chr(38)||'customerName='||p_customer_name
  ||chr(38)||'status='||p_status
  ||chr(38)||'customerId='||p_customer_id
  ||chr(38)||'shippingDestination='||p_shipping_destination
  ||chr(38)||'timestamp='||to_char(systimestamp,'YYYYMMDDHH24MISS')
  
  );
  l_result varchar2(4000);
begin
  l_result:= utl_http.request(url||'?'||urlparams);
end;



test:

begin
publish_order_event(
  p_order_id => 'AB123'
, p_status => 'OPEN'
, p_customer_id => 'XY-99'
, p_customer_name => 'Jansen'
, p_shipping_destination => 'Birmingham'
, p_last_update_timestamp => systimestamp
);
end;


create or replace 
trigger order_event_reporter
after INSERT OR UPDATE ON dvx_orders
FOR EACH ROW
begin
  publish_order_event(
    p_order_id => :new.id
  , p_status => :new.status
  , p_customer_id => :new.customer_id
  , p_customer_name => :new.customer_name
  , p_shipping_destination => :new.shipping_destination
  , p_last_update_timestamp => systimestamp
);
end;


insert into dvx_orders
(id, shipping_destination, customer_id, customer_name, status)
values
('8172','Amsterdam','QQ1','Tobias','OPEN')
;   