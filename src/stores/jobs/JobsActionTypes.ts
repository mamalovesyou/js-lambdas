import { JobResult, Job } from '../../workers/Job';
import { WorkerPoolStats } from '../../workers/WorkerPool';

export const SUBMIT_SCRIPT = 'SUBMIT_SCRIPT';
export const SET_LATEST_JOB = 'SET_LATEST_JOB';
export const SET_JOB_RESULT = 'SET_JOB_RESULT';
export const GET_POOL_STATUS = 'GET_POOL_STATUS';
export const SET_POOL_STATUS = 'SET_POOL_STATUS';

export interface SubmitScriptInterface {
    type: typeof SUBMIT_SCRIPT;
    payload: {
        script: string;
    }
}

export interface SetLatestJobInterface {
    type: typeof SET_LATEST_JOB;
    payload: Job;
}

export interface SetJobResultInterface {
    type: typeof SET_JOB_RESULT;
    payload: JobResult;
}

export interface GetPoolStatusInterface {
    type: typeof GET_POOL_STATUS;
}

export interface SetPoolStatusInterface {
    type: typeof SET_POOL_STATUS;
    payload: WorkerPoolStats;
}


export type JobsActionType = SubmitScriptInterface | SetLatestJobInterface | SetJobResultInterface | GetPoolStatusInterface | SetPoolStatusInterface;