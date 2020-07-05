import * as express from 'express';
import * as http from 'http';
import * as cors from 'cors';
import { AddressInfo } from 'net';
import { scriptsRouter } from './scripts/scripts.router';

const app = express();
app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use("/scripts", scriptsRouter);

//initialize a simple http server
const server = http.createServer(app);


//start our server
server.listen(process.env.PORT || 8000, () => {
    const addr = server.address() as AddressInfo
    var port = addr.port;
    console.log('Running on port ' + port)
});