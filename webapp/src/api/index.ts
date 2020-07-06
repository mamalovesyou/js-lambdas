import { w3cwebsocket as W3CWebSocket } from "websocket";

const PORT = 8000;
const HOST = "localhost";

export class JsLambdasAPI {

    socketEndpoint: string = `ws://${HOST}:${PORT}`;
    socketClient?: W3CWebSocket;

    InitWebSocket(): W3CWebSocket {
        this.socketClient = new W3CWebSocket(this.socketEndpoint);
        return this.socketClient;
    }

    CloseSocket() {
        this.socketClient = undefined;
    }

    // Send a message to socket
    SendMessage(message: string) {
        if (this.socketClient) {
            this.socketClient.send(message);
        }
    }
}


export default JsLambdasAPI;