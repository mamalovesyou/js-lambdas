import * as WebSocket from 'ws';
import { Job, WebWorker, JobResult } from "./workers.interface";
import { createJob } from "./Job";
import MyWebWorker from "./WebWorker";




/**
 * A WorkerPool to manage Workers
 * In our implementation, workers are open connections
 * @constructor
 */

export class WorkerPool {

    jobQueue: Job[];
    workerQueue: WebWorker[];
    
    constructor() {
        this.jobQueue = [];
        this.workerQueue = [];
    }

    // Add a new worker to the pool
    // Called when a new tab is open in the browser
    addWebWorker(ws: WebSocket) {
        // Create and the worker to the queue
        const worker = new MyWebWorker(this, ws);
        this.workerQueue.push(worker);
    }

    addJob(job: Job) {
        // Check if a worker is available
        if (this.workerQueue.length > 0) {
            // get the first worker available (left of the list)
            const worker = this.workerQueue.shift();
            // Send the job

            // Add job to worker witing list and set it as latest
            if (worker) {
                worker.waitingJobs.push(job);
                worker.latestSubmitJob = job;
            }
            else{
                console.log("Ooops... trying to send a job to undefined");
            }

        } else {
            // no workers so we need to queue the job
            this.jobQueue.push(job);
        }
    }

    // Called when a result is send back by the worker
    jobDone(result: JobResult) {

        // Check if it was the latest job submited by one of the workers
        this.workerQueue.forEach((worker) => {
            if(worker.latestSubmitJob && worker.latestSubmitJob.id === result.id) {
                // Send response to worker
                // ws send message
            }
        });
    }

    submitScript(content: string) {
        // Convert script content to a job
        const job = createJob(content);
        
        // Make sure there is ta worker
        if (this.workerQueue.length > 0) {

            // Sort worker to find the one that has fewer jobs in its witing list
            this.workerQueue.sort((a: WebWorker, b: WebWorker) => (a.waitingJobs.length - b.waitingJobs.length))
            // Dispatch job to the the first as list is sorted
            this.workerQueue[0].sendJob(job);

        } else {
            // Queue the job if no worker are available
            this.jobQueue.push(job);
        }

    }

}

