import { WorkerPool } from './WorkerPool';
import * as JobCreator from './Job';

export const createWorkerPool = (poolSize: number, minPoolSize: number = 1): WorkerPool => {
    return new WorkerPool(poolSize, minPoolSize)
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


export default createWorkerPool;