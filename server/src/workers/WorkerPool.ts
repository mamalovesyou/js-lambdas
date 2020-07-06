import * as WebSocket from 'ws';
import { Job, WebWorker, JobResult } from "./workers.interface";
import { createJob } from "./Job";
import MyWebWorker from "./WebWorker";
import { Logger } from '../logger';
import { createJobResultMessage } from '../messages';



/**
 * A WorkerPool to manage Workers
 * In our implementation, workers are open connections
 * @constructor
 */

export class WorkerPool {

    jobQueue: Job[];
    workerQueue: WebWorker[];
    logger: Logger;
    
    constructor() {
        this.jobQueue = [];
        this.workerQueue = [];
        this.logger = new Logger('Pool');
    }

    // Add a new worker to the pool
    // Called when a new tab is open in the browser
    addWebWorker(ws: WebSocket) {
        // Create and the worker to the queue
        const worker = new MyWebWorker(this, ws);
        this.workerQueue.push(worker);
        this.logger.info("Connection established with new worker: " + worker.id);
    }

    // Remove a web worker from the queue
    // Usefuul to handle disconnection
    removeWeborker(id: string) {
        this.workerQueue = this.workerQueue.filter(worker => worker.id !== id);
        this.logger.info("Connection lost with worker: " + id);
    }


    // Called when a result is send back by the worker
    jobDone(result: JobResult) {

        // Check if it was the latest job submited by one of the workers
        this.workerQueue.forEach((worker) => {
            const latestId = worker.latestSubmitJob ? worker.latestSubmitJob.id : null;
            if(worker.latestSubmitJob && worker.latestSubmitJob.id === result.id) {
                // Send response to worker
                this.logger.info("Forwarding result to worker: " + worker.id);
                const msg = createJobResultMessage(result);
                worker.socket.send(msg);
            }
        });
    }

    submitScript(content: string, worker: WebWorker) {
        // Convert script content to a job
        const job = createJob(content);

        // Set the latest submit job for the worker that sent the script
        worker.setLatestJob(job);
        

        // Make sure there is ta worker
        if (this.workerQueue.length > 0) {
            // Sort worker to find the one that has fewer jobs in its witing list
            this.workerQueue.sort((a: WebWorker, b: WebWorker) => (a.waitingJobs.length - b.waitingJobs.length))
            this.logger.debug("Sorted workerQueue: " + this.workerQueue);
            // Dispatch job to the the first as list is sorted
            this.logger.info("Sending job to worker: " + this.workerQueue[0].id);
            this.workerQueue[0].sendJob(job);


        } else {
            // Queue the job if no worker are available
            this.jobQueue.push(job);
            this.logger.info("No worker available. Queue job: " + job.id);
        }

    }

}

