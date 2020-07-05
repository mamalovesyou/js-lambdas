import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import * as cors from 'cors';
import { AddressInfo } from 'net';
import { generateId } from './utils';
import { scriptsRouter } from './scripts/scripts.router';
import { WorkerPool } from './workers/WorkerPool';

const app = express();
app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use("/scripts", scriptsRouter);

//initialize a simple http server
const server = http.createServer(app);


//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws: WebSocket) => {
    // Add worker to the pool
    console.log("New connection open that means a new worker!");

    //send immediatly a feedback to the incoming connection    
    ws.send('Hi there, I am a WebSocket server');
});



//start our server
server.listen(process.env.PORT || 8000, () => {
    const addr = server.address() as AddressInfo
    var port = addr.port;
    console.log('Running on port ' + port)
});