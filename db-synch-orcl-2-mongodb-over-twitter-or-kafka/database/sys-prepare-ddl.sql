REM AS SYS:


create user  C##ORDERMS identified by  C##ORDERMS default tablespace users temporary tablespace temp;
grant create table, create procedure , connect to  C##ORDERMS;
ALTER USER  C##ORDERMS QUOTA UNLIMITED ON users;
ALTER USER  C##ORDERMS IDENTIFIED BY  C##ORDERMS ACCOUNT UNLOCK;
grant create trigger to  C##ORDERMS;

grant execute on utl_http to  C##ORDERMS
/

grant execute on dbms_lock to  C##ORDERMS
/

BEGIN
  DBMS_NETWORK_ACL_ADMIN.create_acl (
    acl          => 'dbsynchdatapi_acl_file.xml', 
    description  => 'Granting  C##ORDERMS access to connect to external hosts',
    principal    => 'C##ORDERMS',
    is_grant     => TRUE, 
    privilege    => 'connect',
    start_date   => SYSTIMESTAMP,
    end_date     => NULL);
end;
 
begin
  DBMS_NETWORK_ACL_ADMIN.assign_acl (
    acl         => 'dbsynchdatapi_acl_file.xml',
    host        => '2bfa7414.ngrok.io', 
    lower_port  => 80,
    upper_port  => 80);    
end; 

Note:

in order to UTL_HTTP to an HTTPS endpoint (over SSL) requires uploading Certificates to Oracle Wallet and configuring UTL_HTTP for that wallet:
https://oracle-base.com/articles/misc/utl_http-and-ssl#get-site-certificates 
