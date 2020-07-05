import axios from 'axios';
import { w3cwebsocket as W3CWebSocket } from "websocket";

const PORT = 8000;
const HOST = "localhost";

export class JsLambdasAPI {

    httpEndpoint: string = `http://${HOST}:${PORT}`;
    socketEndpoint: string = `ws://${HOST}:${PORT}`;
    socketClient?: W3CWebSocket;

    GetURIForPath(path:string) {
        return `${this.httpEndpoint}/${path}`
    }

    PostScript(script: string) {
        const uri = this.GetURIForPath('scripts')
        return axios.post(uri, {content: script}).then(response => response.data)
    }

    InitWebSocket(): W3CWebSocket {
        this.socketClient = new W3CWebSocket(this.socketEndpoint);
        return this.socketClient;
    }
}


export default JsLambdasAPI;