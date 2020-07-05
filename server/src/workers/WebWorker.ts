import * as WebSocket from 'ws';
import { Job, WebWorker, JobResult} from './workers.interface';
import { generateId } from "../utils";
import { WorkerPool } from './WorkerPool';
import * as Messages from '../messages';

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
        this.socket.onclose = this.onDisconnect(); // Handle when a worker is closed

        // Send Id to worker
        this.socket.send(Messages.createWorkerIdMessage(this.id));
    }

    sendJob(job: Job) {
        const msg = Messages.createJobMessage(job);
        this.socket.send(msg);
    }

    onMessage() {
        const instance = this;
        return (message: string) => {
            const parsedMsg: Messages.SharedMessage = JSON.parse(message);
            console.log("Recieved: " + parsedMsg);
            switch (parsedMsg.type) {
                // Case we recieved a result
                case Messages.SHARED_JOB_RESULT:
                    console.log("Recieved Job result")
                    instance.onJobDone((parsedMsg as Messages.ISharedJobResult).result)
                    return
                // Case we recieved a script
                case Messages.SHARED_SCRIPT:
                    console.log("Recieved script")
                    instance.pool.submitScript((parsedMsg as Messages.ISharedScript).script)
                    return
                default:
                    console.log("Unknown message submitted: " + parsedMsg.type)
            }
        }
    }

    // Call when a job is done and we got a result back
    onJobDone(result: JobResult) {
        console.log("removing job from waiting jobs");
        // Remove job from list
        this.waitingJobs = this.waitingJobs.filter(job => { return job.id === result.id });
        console.log("new waiting jobs: ", this.waitingJobs);
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