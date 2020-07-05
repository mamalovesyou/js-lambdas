import { JobResult, Job, WorkerPoolStats } from '../../workers';

export const SET_SOCKET_ENABLE = 'SET_SOCKET_ENABLE';
export const SET_WORKER_ID = 'SET_WORKER_ID';
export const RECIEVED_JOB = 'RECIEVED_JOB';

export interface SetSocketEnableInterface {
    type: typeof SET_SOCKET_ENABLE;
    payload: { enabled: boolean; }
}

export interface SetWorkerIdInterface {
    type: typeof SET_WORKER_ID;
    payload: { id: string };
}

export interface RecievedJobInterface {
    type: typeof RECIEVED_JOB;
    payload: { job: Job };
}


// Shared with server
export const SHARED_WORKER_ID = '@SHARED/WORKER_ID';
export const SHARED_JOB = '@SHARED/JOB';
export const SHARED_JOB_RESULT = '@SHARED/JOB_RESULT';
export const SHARED_SCRIPT = '@SHARED/SCRIPT';

export interface SharedWorkerIdInterface {
    type: typeof SHARED_WORKER_ID;
    workerId: string ;
}

export interface SharedJobInterface {
    type: typeof SHARED_JOB;
    job: Job;
}

export interface SharedJobResultInterface {
    type: typeof SHARED_JOB_RESULT;
    result: JobResult;
}

export interface SharedScriptInterface {
    type: typeof SHARED_SCRIPT;
    script: string;
}


export type SocketActionType = SetSocketEnableInterface | SetWorkerIdInterface | SharedWorkerIdInterface | SharedJobInterface | SharedJobResultInterface | SharedScriptInterface;