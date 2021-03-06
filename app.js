var express = require('express');
var app = express();
app.use(express.bodyParser());
app.use(express.static(__dirname));


app.post ('/login',function(req, res, next){
  res.json({ token: 'tokeeeen' });
});


generateXml = function(req, res){
  res.writeHead(200, {'Content-Type': 'text/xml'});
  console.log('Content-Type-"text/xml"');

  var result=
  '<?xml version="1.0" encoding="UTF-8"?>'+
'<celebs>'+
  '<celeb id="421">'+
    '<name>Johnny Stardust</name>'+
    '<image>johnny_200.jpg</image>'+
   '</celeb>'+
 '</celebs>';


  res.write( result);
  res.end();
}


app.get('/xml', function(req, res, next){
  generateXml(req, res);
});

generateExcel = function(req, res){
  
  var fs = require('fs');
  var writeStream = fs.createWriteStream("file.xls");

  var header="Sl No"+"\t"+" Age"+"\t"+"Name"+"\n";
  var row1 = "0"+"\t"+" 21"+"\t"+"Rob"+"\n";
  var row2 = "1"+"\t"+" 22"+"\t"+"bob"+"\n";

  writeStream.write(header);
  writeStream.write(row1);
  writeStream.write(row2);
  writeStream.end();
 
  
  res.writeHead(200, { 'Content-Type': 'application/csv' });
  res.write( header+row1+row2);
  res.end();
  
}

app.get('/excel', function(req, res, next){
	generateExcel(req, res);
});

app.get('/api/wines', function(req, res, next){
    setTimeout(function(){
		res.send({ "result": "got all the wines collection"});
	},1000);
});

app.post('/api/wines', function(req, res, next){
    //console.log('rrr:'+req.body.country)
	res.send({ "result": "wine created!","country":req.body.country});
});

app.put('/api/wines', function(req, res, next) {
	res.json({ "result": "wine updated!"});
});

app.del('/api/wines/yoko', function(req, res, next) {
	res.send({ "result": "wine deleted!"});
});

app.post('/api/headers', function(req, res, next){
	res.send({ "result": "header customheader1:"+req.headers['customheader1']+" sended"});
});

app.post('/api/objecttype', function(req, res, next){    
	res.send({ "result": "object {name:"+req.body.objectparameter[0].month+"} sended!"});
});

app.listen(3000);
console.log('Listening on port 3000');