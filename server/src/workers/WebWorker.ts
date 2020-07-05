import * as WebSocket from 'ws';
import { Job, WebWorker, JobResult, Message, ResultMessage, ScriptMessage } from './workers.interface';
import { generateId } from "../utils";
import { createJobMessage } from "./Message";
import { WorkerPool } from './WorkerPool';

class MyWebWorker implements WebWorker {

    id: string;
    waitingJobs: Job[];
    latestSubmitJob?: Job;
    socket: WebSocket;
    pool: WorkerPool;

    constructor(pool: WorkerPool, ws: WebSocket) {
        this.id = generateId()
        this.waitingJobs = []
        this.socket = ws
        this.pool = pool;

        // Listeners
        this.socket.on('message', this.onMessage()); // Handle incomming messages
        this.socket.on('disconnect', this.onDisconnect()); // Handle when a worker is disconnected
        this.socket.send(JSON.stringify({type: "init", workerId: this.id}));
    }

    sendJob(job: Job) {
        const msg = createJobMessage(job);
        this.socket.send(msg);
    }

    onMessage() {
        const instance = this;
        return (message: string) => {
            const parsedMsg: Message = JSON.parse(message);
            switch (parsedMsg.type) {
                // Case we recieved a result
                case "job-result":
                    instance.onJobDone((parsedMsg as ResultMessage).result)

                // case we recieved a new script
                case "new-script":
                    instance.pool.submitScript((parsedMsg as ScriptMessage).script)
                default:
                    console.log("Unknown message submitted...")
            }
        }
    }

    // Call when a job is done and we got a result back
    onJobDone(result: JobResult) {
        // Remove job from list
        this.waitingJobs = this.waitingJobs.filter(job => { return job.id === result.id });
        // Tell the pool I am done
        this.pool.jobDone(result);
    }

    // Call when the client is diconnected
    onDisconnect() {
        return () => {
            console.log("Disconnection...")
            // Remove the worker from the list
            this.pool.removeWeborker(this.id);

            // TODO: move waiting jobs on other worker
        }
    }

}

export default MyWebWorker;