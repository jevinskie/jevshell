#!/usr/bin/env node

require.paths.unshift(__dirname + '/modules');

var fs = require('fs');
var framer = require('framer');

var stream = fs.createReadStream(process.argv[2], {encoding: 'utf8'});

framer(stream, 14); // 14 lines per frame

stream.on('frame', function (frame, repeat){
    console.log('got a frame (repeats ' + repeat + '):');
    console.log(frame);
    stream.pause();
    setTimeout(function (){
        stream.resume();
    }, 1000.0/15.0 * repeat);
});

