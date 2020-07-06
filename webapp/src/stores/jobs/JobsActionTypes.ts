import { JobResult } from '../../workers';

export const SUBMIT_SCRIPT = 'SUBMIT_SCRIPT';
export const SET_LATEST_JOB_ID = 'SET_LATEST_JOB_ID';
export const SET_JOB_RESULT = 'SET_JOB_RESULT';
export const GET_POOL_STATUS = 'GET_POOL_STATUS';
export const SET_POOL_STATUS = 'SET_POOL_STATUS';

export interface ISubmitScript {
    type: typeof SUBMIT_SCRIPT;
    payload: {
        script: string;
    }
}

export interface ISetLatestJobId {
    type: typeof SET_LATEST_JOB_ID;
    payload: {id: string};
}

export interface ISetJobResult {
    type: typeof SET_JOB_RESULT;
    payload: { result:JobResult, fromSocket?: boolean };
}



export type JobsActionType = ISubmitScript | ISetLatestJobId | ISetJobResult ;