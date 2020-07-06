import * as ActionTypes from './SocketActionTypes';
import { Job, JobResult } from '../../workers';

export const setSocketEnable = (enabled: boolean): ActionTypes.ISetSocketEnable => ({
    type: ActionTypes.SET_SOCKET_ENABLE,
    payload: {enabled}
});

export const setWorkerId = (id: string): ActionTypes.ISetWorkerId => ({
    type: ActionTypes.SET_WORKER_ID,
    payload: {id}
});

export const recievedJob = (job: Job): ActionTypes.IRecievedJob => ({
    type: ActionTypes.RECIEVED_JOB,
    payload: { job }
})

export const sendScript = (script: string): ActionTypes.ISharedScript => ({
    type: ActionTypes.SHARED_SCRIPT,
    script
})

export const sendJobResult = (result: JobResult): ActionTypes.ISharedJobResult => ({
    type: ActionTypes.SHARED_JOB_RESULT,
    result
})

// export const setLatestJobId = (id: string): ActionTypes.ISharedLatestJobId => ({
//     type: ActionTypes.SHARED_WORKER_ID,
//     result
// })

