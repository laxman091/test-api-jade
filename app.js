// app.js
var json = require('./modules/employees.js');
const express = require('express');
var request = require('request');  
var router = express.Router();
const app = express();
var PDFDocument = require('pdfkit');
const doc = new PDFDocument();
var phantom = require('phantom');  
const path = require('path');  
const bodyParser = require('body-parser');
const JSON = require('circular-json');

//app.use(bodyParser.json());  
//app.use(bodyParser.urlencoded({ extended: false }));
// Require static assets from public folder
// being rendered res.render()
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));
// Set view engine as EJS
//app.engine('html', require('ejs').renderFile);
//app.set('view engine', 'html');

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');


var url = 'http://www.allcodingworld.com/api/employees.php';
app.get('/employees', function(req, res) {
	 var requestConfig = {
                        url: url,
                        json: true
                    };
    request(requestConfig, function(error, response, body) {
    	//var res_data = JSON.parse(body);
        //res.send(res_data);
        res.render('employees',{'title': 'Employee Records','employees': body.employees});
    });
});


app.get('/register', function(req, res, next) {  
    let data = {
        message: res
    };
    //res.status(200).send(json.result);
    res.render('register');  // uncomment with proper jade template
});

/**
 * Employees API
 */

app.get('/api', function(req, res, next) {  
    let data = {
        message: res
    };
    res.status(200).send(json.result);
    //res.render('index',{'title': 'Employee Records','data': json.result.employees});	// uncomment with proper jade template
});

/**
 * PDF API
 */
app.get('/employee', function(req, res, next) {
    //res.status(200).send(req);
    var id = req.query.id; // $_GET["id"]
    var url2 = 'http://www.allcodingworld.com/api/read.php?id=' + id;
    var requestConfig = {
                        url: url2,
                        json: true
                    };
        request(requestConfig, function(error, response, body) {
    	//var res_data = JSON.parse(body);
        //res.send(body);
        //response.writeHead(200, { 'Content-Type': 'text/html' });
        res.setHeader('Content-Type', 'text/html');
        res.render('employee',{'title': 'Employee Details','employee': body.employee});
        phantom.create().then(function(ph) {
   		ph.createPage().then(function(page) {
        page.open(url2).then(function(status) { 
        	var dir = __dirname + '/pdfs/';
            var file = dir + 'employee'+ id + '.pdf';
        	page.render(file).then(function() {
                console.log('Pdf Generated');
                ph.exit();
            });
        });
    });
});
    });
});

app.get('/update', function(req, res, next) {  
    var id = req.query.id; // $_GET["id"]
    // query a database and save data
    //res.status(200).send(data);
    console.log(id);
    res.render('update',{'title': 'Update Employee', 'id': id});
});

app.post('/api', function(req, res, next) {  
    let data = req.body;
    // query a database and save data
    res.status(200).send(data);
});

/**
 * STATIC FILES
 */
app.use('/', express.static('app'));

// Default every route except the above to serve the index.jade
app.get('*', function(req, res) {  
    //res.sendFile(path.join(__dirname + '/views/index.jade'));
    res.render('home',{'title': 'Jade Template with API'});
});

module.exports = app;