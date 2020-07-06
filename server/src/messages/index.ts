import { Job, JobResult } from "../workers/workers.interface";

// Shared with app
export const SHARED_WORKER_ID = '@SHARED/WORKER_ID';
export const SHARED_JOB = '@SHARED/JOB';
export const SHARED_JOB_RESULT = '@SHARED/JOB_RESULT';
export const SHARED_SCRIPT = '@SHARED/SCRIPT';
export const SHARED_LATEST_JOB_ID = '@SHARED/LATEST_JOB_ID';

export interface ISharedWorkerId {
    type: typeof SHARED_WORKER_ID;
    id: string ;
}

export interface ISharedJob {
    type: typeof SHARED_JOB;
    job: Job;
}

export interface ISharedJobResult {
    type: typeof SHARED_JOB_RESULT;
    result: JobResult;
}

export interface ISharedScript {
    type: typeof SHARED_SCRIPT;
    script: string;
}


export type SharedMessage = ISharedJob | ISharedScript | ISharedJobResult | ISharedWorkerId;

export const createJobMessage = (job: Job): string => {
    const  msg = {type: SHARED_JOB, job: job }
    return JSON.stringify(msg)
}

export const createWorkerIdMessage = (workerId: string): string => {
    const  msg = {type: SHARED_WORKER_ID, workerId }
    return JSON.stringify(msg)
}

export const createJobResultMessage = (result: JobResult): string => {
    const msg = {type: SHARED_JOB_RESULT, result};
    return JSON.stringify(msg)
}