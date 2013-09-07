//replace port 8080 below if you wish to change the server port
var serverport = 8080;

var http = require('http');
var qs = require('querystring');
var url = require('url');
var fs = require('fs');
var util = require('util');
var mime = require('mime');

var vidStreamer = require("vid-streamer");
var firsttime=true;
//write back result
writeResult = function(res, code, result, mimetype) {
  res.writeHead(code, {'Content-Type': mimetype,'Content-Length':result.length});
  res.write(result);
  res.end();
}

// get getFilename from request using url
getFilename = function(req) {
  var filename=req.url.substring(1);
  if (!!filename) return filename;
  return "/";
}

// sendFile 
sendFile = function(filename, res) {
  if (filename[filename.length-1] === '/') filename += 'index.html'
  fs.readFile(filename, function (err, data) {
    if (err){
      writeResult(res, "404", res.url+" Page not found!", "text/plain");
      return;
    }
    //console.log('file: ' + filename + ' mime : ' + mime.lookup(filename));
    writeResult(res, 200, data, mime.lookup(filename));
  });
}

// sendScores
sendScores = function(req, res) {
  var str = "<ul data-role='listview'>"
    + "<li data-role='list-divider'>Group A</li><li>Team A beat Team B [ 5 - 3 ]</li><li>Team C lost to Team D [ 1 - 2 ]</li>"
    + "<li data-role='list-divider'>Group B</li><li>Team E drew Team F [ 0 - 0 ]</li><li>Team G lost to Team H [ 3 - 4 ]</li></ul>";
  writeResult(res, "200", str, "text/html");
}

// the GET handler
handleGet = function(req, res) {

  var filename=getFilename(req).replace(/%20/g, " ");

  console.log('req.url-'+req.url);

  if (req.url === "/") {
    writeResult(res, "200", "jQM Cookbook Server says: Congrats!", "text/plain");  	
  }
  else if (req.url=="/api/wines") {
      setTimeout(function(){
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({ "shlomo": "eee"}));
        //writeResult(res, "200", "name,lasname\nmoshe,vilner\nmiri,vilner\nnaftali,vilner\nyarden,vilner\nshmuel,vilner\nelisheva,adler\nsara,lam", "application/csv");  
        res.end();
      }, 1000);
  }
  else if (req.url === "/delay") {
    setTimeout(function(){
      sendFile('dummypage', res);
    }, 2000);
  }
  else if (req.url.indexOf("/resources/video") >= 0
  	|| req.url.indexOf("/resources/audio") >= 0	) {
    vidStreamer(req, res);
  } 
  else if(req.url=="/excel"){
      generateExcel(req, res);
  }
  else {
    sendFile(filename, res);
     // util.log('was ajax get...');
  }
}
 
//Handles /postComment
addComment = function(req, res) {
  var body="";
  req.on('data', function (data) {
    body += data;
  });
  req.on('end', function () {
    var creds = qs.parse(body);
    var str = "<div data-role='page' data-theme='a'><div data-role='header'><h1>Comments Added</h1></div>"
      + "<div data-role='content'>Hi " + creds.username + "!"
      + "<p>Your Email ID: " + creds.email + "</p>"
      + "<p>Added your comment: " + creds.comments + "</p>"
      + "<a href='#' data-role='button' data-rel='back'>Back</a></div></div>";
    writeResult(res, "200", str, "text/html");
  });
}

//generate excel file
generateExcel = function(req, res){
  util.log('excel generate called');

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



// HTTP REQUEST HANDLERS
handlePost = function(req, res) {
   
  if (req.url === "/postComment") {
    addComment(req, res);
  } 


  else if(req.url === "/api/wines"){

    
	  var body="";
    
	  req.on('data', function (data) {
		  body += data;

	  });
	  req.on('end', function () {

       var data=JSON.parse(body)
       setTimeout(function(){       
       
       //  util.log('post called');
       //  if(firsttime){
          //  writeResult(res, "404", "Page not found!", "text/plain");
           // firsttime=false;
       // }else{
    		   res.writeHead(200, { 'Content-Type': 'application/json' });
    		   res.write(JSON.stringify({ "result": "wine saved successfully"}));
    		   res.end();
        // }
          
       }, 1000);
	  });
    
     
  }else if(req.url === "/api/headers/"){
          for(headeer in req.headers){
            util.log('header--'+headeer+':'+req.headers[headeer])
          }
             
           res.writeHead(200, { 'Content-Type': 'application/json' });
           res.write(JSON.stringify({ "result": "wine saved successfully"}));
           res.end();
  }else if(req.url === "/api/objecttype/"){
      var body="";
      req.on('data', function (data) {
        body += data;

      });
      req.on('end', function () {

           var data=JSON.parse(body) 
          
           util.log('data:'+data.objectparameter.name);
             
           res.writeHead(200, { 'Content-Type': 'application/json' });
           res.write(JSON.stringify({ "result": "wine saved successfully"}));
           res.end();
      });
  }
  else {
    var str = "<div data-role='dialog'><div data-role='header'><h1>Server Response</h1></div>"
      + "<div data-role='content'>Your post was successful!</div></div>";
    writeResult(res, "200", str, "text/html");
        util.log('was ajax post...');
  }
}
// HTTP REQUEST HANDLERS
handlePut = function(req, res) {
  setTimeout(function(){  
         util.log('put called');
         res.writeHead(200, { 'Content-Type': 'application/json' });
         res.write(JSON.stringify({ "result": "wine updated successfully"}));
         res.end();
  }, 1000); 
}

handleDelete = function(req, res) {
  setTimeout(function(){ 
         util.log('delete called');
         res.writeHead(200, { 'Content-Type': 'application/json' });
         res.write(JSON.stringify({ "result": "wine deleted successfully"}));
         res.end(); 
  },1000);
}
// server starts here
http.createServer(function (req, res) {  
  if (req.method == 'GET' ) {
    handleGet(req, res);  
  }
  else 
  if ( req.method == 'POST' ) {
    handlePost(req, res);
  } 
  else if(req.method== 'PUT'){
    handlePut(req, res)
  }
  else if(req.method== 'DELETE'){
    handleDelete(req, res)
  }
}).listen(serverport);
util.log('jQuery Mobile Cookbook Node Server is running...');
