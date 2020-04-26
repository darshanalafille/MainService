'use strict';

const express = require('express');
const axious = require('axios');
const cors = require('cors');
const ip = require('ip');

const randomString = require('randomstring');
const xxx = randomString.generate({
  length: 7,
  charset: 'numeric'
});
const ipAddress = ip.address();
// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

var results = {  
  serverId : xxx,
  ip:ipAddress
};


// App
const app = express();

app.use(cors());

app.get('/', (req, res) => {
  //res.send('Hello World : ' + xxx);
  
  //res.json(results);
  
  axious.get('http://authservice').
    then(resp => {		
		
      console.log(resp.data);
      results.auth = resp.data;
	  
      axious.get("http://dataservice").
       then(r => {
         results.items = r.data;
          res.json(results);
        });
      
    });
	
	
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);