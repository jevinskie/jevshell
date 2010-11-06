require.paths.unshift(__dirname + '/modules');

var express = require('express');
var fs = require('fs');

var app = express.createServer();

app.configure(function(){
    app.set('view options', {
        layout: false
    });
});

app.get('/', function(req, res){
    fs.readFile(__dirname + '/views/index.html', function (err, data) {
        if (err) throw err;
        res.send(data, { 'Content-Type': 'text/html' }, 200);
    });
});

app.listen(3000);

