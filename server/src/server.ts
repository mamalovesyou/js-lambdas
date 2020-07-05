import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import { AddressInfo } from 'net';
import { WorkerPool } from './workers/WorkerPool';

const app = express();

//initialize a simple http server
const server = http.createServer(app);


//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

const pool = new WorkerPool();

wss.on('connection', (ws: WebSocket) => {
    // Add worker to the pool
    pool.addWebWorker(ws);
});



//start our server
server.listen(process.env.PORT || 8000, () => {
    const addr = server.address() as AddressInfo
    var port = addr.port;
    console.log('Running on port ' + port)
});