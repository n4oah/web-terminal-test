"use strict";
exports.__esModule = true;
var path = require("path");
var os = require("os");
var pty = require("node-pty");
var express = require("express");
var terminal = os.platform() === 'win32' ? 'powershell.exe' : '/bin/bash';
var app = express();
var expressWs = require('express-ws')(app);
app.use(express.static(path.resolve('..')));
expressWs.app.ws('/shell', function (ws, req) {
    var shell = pty.spawn(terminal, [], {
        name: 'xterm-color',
        cols: 80,
        rows: 30,
        cwd: process.env.PWD,
        env: process.env
    });
    shell.on('data', function (data) {
        ws.send(data);
    });
    ws.on('message', function (msg) {
        shell.write(msg);
    });
});
app.listen(3000);
