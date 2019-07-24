import * as path from 'path'
import * as os from 'os'
import * as pty from 'node-pty'
import * as express from "express"

const terminal = os.platform() === 'win32' ? 'powershell.exe' : '/bin/bash';

const app = express();
const expressWs = require('express-ws')(app);

app.use(express.static(path.resolve('..')));

expressWs.app.ws('/shell', (ws, req) => {
  const shell = pty.spawn(terminal, [], {
    name: 'xterm-color',
    cols: 80,
    rows: 30,
    cwd: process.env.PWD,
    env: process.env
  });
  shell.on('data', (data) => {
    ws.send(data);
  });
  ws.on('message', (msg) => {
    shell.write(msg);
  });
});

app.listen(3000)
