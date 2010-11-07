#!/usr/bin/env node

require.paths.unshift(__dirname + '/modules');

var fs = require('fs');
var framer = require('framer');

var stream = fs.createReadStream(process.argv[2], {encoding: 'utf8'});

framer(stream, 14);

stream.on('frame', function (frame){
    console.log('got a frame:');
    console.log(frame);
});

