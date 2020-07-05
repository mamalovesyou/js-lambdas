import * as ActionTypes from './SocketActionTypes';
import { Job, JobResult } from '../../workers';

export const setSocketEnable = (enabled: boolean): ActionTypes.SetSocketEnableInterface => ({
    type: ActionTypes.SET_SOCKET_ENABLE,
    payload: {enabled}
});

export const setWorkerId = (id: string): ActionTypes.SetWorkerIdInterface => ({
    type: ActionTypes.SET_WORKER_ID,
    payload: {id}
});

export const recievedJob = (job: Job): ActionTypes.RecievedJobInterface => ({
    type: ActionTypes.RECIEVED_JOB,
    payload: { job }
})

export const sendScript = (script: string): ActionTypes.SharedScriptInterface => ({
    type: ActionTypes.SHARED_SCRIPT,
    script
})

export const sendJobResult = (result: JobResult): ActionTypes.SharedJobResultInterface => ({
    type: ActionTypes.SHARED_JOB_RESULT,
    result
})

