


import { JobWorker } from './JobWorker';
import { Job, WorkerPoolStats, WorkerInterface  } from '.';

/**
 * A WorkerPool to manage JobWorkers
 * @param {Number} [size]   Pool size (max number of workers)
 * @constructor
 */

export const TAB_MODE = "tabs";
export const WORKER_MODE = "worker";

export class WorkerPool {

    jobQueue: Job[];
    workerQueue: WorkerInterface[];
    poolSize: number;
    minPoolSize: number;
    running: number;
    mode: string;
    
    constructor(size: number, minSize: number = 1, mode=WORKER_MODE) {
        this.mode = mode;
        this.jobQueue = [];
        this.workerQueue = [];
        this.minPoolSize = minSize;
        (size < minSize) ? this.poolSize = minSize : this.poolSize = size;
        this.running = 0;

        // Create workers
        this.init();
    }

    // Initialize the pool with a certain number of worker
    private init() {
        switch(this.mode) {
            // Cannot access chrome api
            // case TAB_MODE:
            //     for (var i = 0; i < this.poolSize; i++) {
            //         const tabWorker = new TabWorker(this);
            //         this.workerQueue.push(tabWorker);
            //         tabWorker.init();
            //     }

            case WORKER_MODE:
            default:
                for (var i = 0; i < this.poolSize; i++) {
                    this.workerQueue.push(new JobWorker(this));
                }

        }
    }

    public static getWorkerPoolInstance(): WorkerPool | undefined {
        return window.workerPool;
    }

    resize(newSize: number) {
        // Check that new size is valid
        if (newSize < this.minPoolSize || newSize === this.poolSize) return

        // Check for a
        if (this.running < newSize && this.poolSize < newSize) {
            for (var i = 0; i < (newSize-this.poolSize); i++) {
                const worker = new JobWorker(this)
                if(this.hasWaithingJobs()) {
                    // If any job then execute immediatly
                    const job = this.jobQueue.shift();
                    job ? worker.run(job) : console.log("Try to run an undefined job.");
                } else {
                    this.workerQueue.push(worker);
                }
            }
        } else {
            // Set size
            this.poolSize = newSize;
        }
    }

    hasWaithingJobs(): boolean {
        return this.jobQueue.length > 0;
    }

    addJob(job: Job) {
        job.recievedAt =  Date.now();
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
            // Chek that pool size has'nt been modified first
            // Re add worker only if number of running worker and 
            // len of available workers are less than poolSize
            if ((this.running + this.workerQueue.length) < this.poolSize) {
                this.workerQueue.push(worker);
            }
        }
    }

    // Return true if 1 or more worker are not done yet
    getStats(): WorkerPoolStats {
        return {
            isBusy: (this.running > 0),
            waitingJobs: this.jobQueue.length,
            running: this.running,
            size: this.poolSize
        }
    }
}

