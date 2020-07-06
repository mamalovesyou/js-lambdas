import * as ActionTypes from './JobsActionTypes';
import { JobResult } from '../../workers';

export const submitScript = (script: string): ActionTypes.JobsActionType => ({
    type: ActionTypes.SUBMIT_SCRIPT,
    payload: {script}
});

export const setLatestJobId = (id: string): ActionTypes.JobsActionType => ({
    type: ActionTypes.SET_LATEST_JOB_ID,
    payload: {id}
});


export const setJobResult = (result: JobResult, fromSocket: boolean): ActionTypes.JobsActionType => ({
    type: ActionTypes.SET_JOB_RESULT,
    payload: { result, fromSocket }
});

