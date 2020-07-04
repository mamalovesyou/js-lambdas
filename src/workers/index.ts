import { WorkerPool } from './WorkerPool';
import * as JobCreator from './Job';

export const createWorkerPool = (poolSize: number, minPoolSize: number = 1): WorkerPool => {
    // Store our worker pool in window (better for units tests)
    if (window.workerPool) return window.workerPool;
    const pool = new WorkerPool(poolSize, minPoolSize)
    window.workerPool = pool;
    return window.workerPool;
}

export const createJob = JobCreator.createJob;

// Job interface
export interface Job {
    id: string;
    script: string;
    onResult: (result: any) => void,
    recievedAt?: number;
}

// Job Result interface
export interface JobResult {
    id: string;
    script: string;
    result?: string;
    error?: string;
    recievedAt: number;
    finishedAt: number;
}

// WorkerPoolStats interface
export interface WorkerPoolStats {
    isBusy: boolean;
    waitingJobs: number;
    running: number;
    size: number;
}


declare global {
    interface Window { workerPool?: WorkerPool; }
}

// Provide an interface to run a job and tell the pool I am free
export interface WorkerInterface {
    run: (job: Job) => void;
    free: () => void;
};

export default createWorkerPool;