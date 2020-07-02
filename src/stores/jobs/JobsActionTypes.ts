import { JobResult, Job } from '../../workers/Job';

export const SUBMIT_SCRIPT = 'SUBMIT_SCRIPT';
export const SET_LATEST_JOB = 'SET_LATEST_JOB';
export const SET_JOB_RESULT = 'SET_JOB_RESULT';

export interface SubmitScriptInterface {
    type: string;
    payload: {
        script: string;
    }
}

export interface SetLatestJobInterface {
    type: string;
    payload: Job;
}

export interface SetJobResultInterface {
    type: string;
    payload: JobResult;
}


export type JobsActionType = SubmitScriptInterface | SetLatestJobInterface | SetJobResultInterface;