import { JobResult, Job, WorkerPoolStats } from '../../workers';

export const SET_SOCKET_ENABLE = 'SET_SOCKET_ENABLE';
export const SET_WORKER_ID = 'SET_WORKER_ID';
export const RECIEVED_JOB = 'RECIEVED_JOB';

export interface ISetSocketEnable {
    type: typeof SET_SOCKET_ENABLE;
    payload: { enabled: boolean; }
}

export interface ISetWorkerId {
    type: typeof SET_WORKER_ID;
    payload: { id: string };
}

export interface IRecievedJob {
    type: typeof RECIEVED_JOB;
    payload: { job: Job };
}


// Shared with server
export const SHARED_WORKER_ID = '@SHARED/WORKER_ID';
export const SHARED_JOB = '@SHARED/JOB';
export const SHARED_JOB_RESULT = '@SHARED/JOB_RESULT';
export const SHARED_SCRIPT = '@SHARED/SCRIPT';
export const SHARED_LATEST_JOB_ID = '@SHARED/LATEST_JOB_ID';

export interface ISharedWorkerId {
    type: typeof SHARED_WORKER_ID;
    workerId: string ;
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


export type SocketActionType = ISetSocketEnable | ISetWorkerId | ISharedWorkerId | ISharedJob | ISharedJobResult | ISharedScript;