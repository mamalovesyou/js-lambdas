import * as WebSocket from 'ws';
import { Job, WebWorker, JobResult} from './workers.interface';
import { generateId } from "../utils";
import { WorkerPool } from './WorkerPool';
import * as Messages from '../messages';
import { Logger } from '../logger';

class MyWebWorker implements WebWorker {

    id: string;
    waitingJobs: Job[];
    latestSubmitJob?: Job;
    socket: WebSocket;
    pool: WorkerPool;
    logger: Logger;

    constructor(pool: WorkerPool, ws: WebSocket) {
        this.id = generateId()
        this.waitingJobs = [];
        this.socket = ws;
        this.pool = pool;
        this.logger = new Logger(`Worker: ${this.id}`);

        // Listeners
        this.socket.on('message', this.onMessage()); // Handle incomming messages
        this.socket.onclose = this.onDisconnect(); // Handle when a worker is closed

        // Send Id to worker
        this.socket.send(Messages.createWorkerIdMessage(this.id));
    }

    sendJob(job: Job) {
        const msg = Messages.createJobMessage(job);
        this.socket.send(msg);
        // Add job to waiting list
        this.waitingJobs.push(job);
        this.logger.debug("Job sent with payload: " + msg);
    }

    setLatestJob(job: Job) {
        this.latestSubmitJob = job;
        this.logger.debug("Set latest submit jobId: " + job.id);
    }

    onMessage() {
        const instance = this;
        return (message: string) => {
            const parsedMsg: Messages.SharedMessage = JSON.parse(message);
            switch (parsedMsg.type) {
                // Case we recieved a result
                case Messages.SHARED_JOB_RESULT:
                    const jobResult = (parsedMsg as Messages.ISharedJobResult).result
                    this.logger.info("Recieved job result for job: " + jobResult.id);
                    instance.onJobDone(jobResult);
                    return
                // Case we recieved a script
                case Messages.SHARED_SCRIPT:
                    this.logger.info("Recieved new script");
                    instance.pool.submitScript((parsedMsg as Messages.ISharedScript).script, instance)
                    return
                default:
                    this.logger.warn("Unknown message recieved. Ignoring it. " + message);
            }
        }
    }

    // Call when a job is done and we got a result back
    onJobDone(result: JobResult) {
        // Remove job from list
        this.waitingJobs = this.waitingJobs.filter(job => { return job.id === result.id });
        this.logger.debug(`Removing job: ${result.id} from witing list. ${this.waitingJobs.length} remaining jobs.`);
        // Tell the pool I am done
        this.pool.jobDone(result);
    }

    // Call when the client is diconnected
    onDisconnect() {
        return () => {
            this.logger.info(`Disconnected...`);
            // Remove the worker from the list
            this.pool.removeWeborker(this.id);

            // TODO: move waiting jobs on other worker
        }
    }

    toString() {
        return `Worker<${this.id}>`
    }

}

export default MyWebWorker;