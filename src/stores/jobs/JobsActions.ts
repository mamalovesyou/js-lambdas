import * as ActionTypes from './JobsActionTypes';
import { Job, JobResult, WorkerPoolStats } from '../../workers';

export const submitScript = (script: string): ActionTypes.JobsActionType => ({
    type: ActionTypes.SUBMIT_SCRIPT,
    payload: {script}
});

export const setLatestJob = (job: Job): ActionTypes.JobsActionType => ({
    type: ActionTypes.SET_LATEST_JOB,
    payload: job
});


export const setJobResult = (result: JobResult): ActionTypes.JobsActionType => ({
    type: ActionTypes.SET_JOB_RESULT,
    payload: result
});