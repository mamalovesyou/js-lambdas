import { WorkerPool } from './WorkerPool';
import * as JobCreator from './Job';

export const createWorkerPool = (poolSize: number): WorkerPool => {
    return new WorkerPool(poolSize)
}

export const createJob = JobCreator.createJob;

// Job interface
export interface Job {
    id?: string;
    script: string;
    onResult: (result: any) => void
}

// Job Result interface
export interface JobResult {
    id: string;
    script: string;
    result?: string;
    error?: string;
}

// WorkerPoolStats interface
export interface WorkerPoolStats {
    isBusy: boolean;
    waitingJobs: number;
    running: number;
}


export default createWorkerPool;