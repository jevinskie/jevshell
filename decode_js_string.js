#!/usr/bin/env node

var fs = require('fs');

var encoded = fs.readFileSync(process.argv[2], 'utf8');
var decoded = eval("new String('" + encoded + "');");

fs.writeFileSync(process.argv[3], decoded);

