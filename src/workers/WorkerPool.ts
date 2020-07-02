


import { JobWorker } from './JobWorker';
import { Job } from './Job';

export class WorkerPool {

    jobQueue: Job[];
    workerQueue: JobWorker[];
    poolSize: number;
    
    constructor(size: number) {
        this.jobQueue = [];
        this.workerQueue = [];
        this.poolSize = size;

        // Create workers
        this.init();
    }

    // Initialize the pool with a certain number of worker
    init() {
        for (var i = 0; i < this.poolSize; i++) {
            this.workerQueue.push(new JobWorker(this));
        }
    }

    addJob(job: Job) {
        // Check if a worker is available
        if (this.workerQueue.length > 0) {
            // get the first worker available (left of the list)
            const worker = this.workerQueue.shift();
            // Run the job
            worker ? worker.run(job): console.log("No worker in worker queue.");
        } else {
            // no free workers so we need to queue the job
            this.jobQueue.push(job);
        }
        console.log("Queue size: ", this.jobQueue.length)
    }

    freeJobWorker(worker: JobWorker) {
        // Check if any job is waiting in the jobQueue
        if (this.jobQueue.length > 0) {
            // If a job is waiting then don't put back worker in wroker queue
            // but execute next job instead
            const job = this.jobQueue.shift();
            job ? worker.run(job) : console.log("Try to run an undefined job.");
        } else {
            // No job waiting to be executed so put the worker back in worker queue
            this.workerQueue.push(worker);
        }
    }
}

