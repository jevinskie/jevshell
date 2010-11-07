require.paths.unshift(__dirname + '/modules');

var express = require('express');
var fs = require('fs');
var io = require('socket.io');
var framer = require('framer');

var app = express.createServer();

app.configure(function(){
    app.set('view options', {
        layout: false
    });
});

app.get('/', function(req, res){
    res.render('index.html');
});

app.listen(3000);

socket = io.listen(app);
socket.on('connection', function(client){
    console.log('got client: ' + client);
    var stream = fs.createReadStream('starwars.txt', {encoding: 'utf8'});
    framer(stream, 14); // 14 lines per frame
    stream.on('frame', function(frame, repeat){
        console.log('got frame!');
        client.send(frame);
    });
});


