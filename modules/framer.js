var lines = require('lines');

// this function is called when a listener for 'line' has been added
// to the stream. it is not nested in the setup function to prevent
// any unnecessary closured data
function _setupReader(stream, num_lines) {
    var frame_buffer = '';
    var cur_line = 0;
    var repeat = 0;
    stream.on('line', function (line){
        if (cur_line == 0) {
            repeat = line;
        } else {
            frame_buffer += line + '\n';
        }
        cur_line++;

        if (cur_line == num_lines) {
            this.emit('frame', frame_buffer);
            cur_line = 0;
            frame_buffer = '';
        }
    });

    stream.on('end', function (){
        this.emit('frame', frame_buffer);
    });
}


module.exports = function frame_reader(stream, num_lines) {
    lines(stream);
    stream.on('newListener', function(type, listener) {
        if(type === 'frame') {
            _setupReader(this, num_lines);
        }
    });
};

