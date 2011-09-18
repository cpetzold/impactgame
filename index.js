var express = require('express'),
    impact = require('impact');
  
var server = express.createServer();

server.configure(function(){
  server.set('views', __dirname + '/views');
  server.use(express.methodOverride());
  server.use(express.bodyParser());
  server.use(server.router);
  server.use(express.static(__dirname + '/public'));
});

server.get('/', function(req, res){
  res.render('index.jade', {
    locals: { title: 'Game' }
  });
});

var im = impact.listen(server, { root: __dirname });
server.use(express.static(im.root));

server.listen(8080, function() {
  console.log(':)');
});
