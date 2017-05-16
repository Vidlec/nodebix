# nodebix
Nodebix is a API library for zabbix
  - Login
  - Call API
  - Logout

# example

```js
var zabbix = require("nodebix");
var client = new zabbix("zabbix_url","user","password");

client.login().then((result)=>{
    console.log(result);
    client.call("host.get",{hostids:1}).then((result)=>{
        console.log(result);
        client.logout().then((result)=>console.log(result);
    });
}).catch((error)=>console.log(error));
```

Result:

```sh
Logged in
{ jsonrpc: '2.0',
  result:
   [ { hostid: '1',
       proxy_hostid: '0',
       host: 'someserver',
       status: '1',
       ...
       } ],
  id: 1 }
Logged out
```