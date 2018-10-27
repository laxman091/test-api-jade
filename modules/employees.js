const express = require('express');
var request = require('request');  

 var url = 'http://www.allcodingworld.com/api/employees.php';
 var requestConfig = {
                        url: url,
                        json: true
                    };

 request(requestConfig, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    //console.log(body.data);
    exports.result = body;
  }
});