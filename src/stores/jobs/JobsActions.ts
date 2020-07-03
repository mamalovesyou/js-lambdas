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

export const getPoolStatus = (): ActionTypes.GetPoolStatusInterface => ({
    type: ActionTypes.GET_POOL_STATUS
});

export const setPoolStatus = (status: WorkerPoolStats): ActionTypes.SetPoolStatusInterface => ({
    type: ActionTypes.SET_POOL_STATUS,
    payload: status
});