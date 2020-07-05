import { all, takeEvery, put, fork, select, call } from 'redux-saga/effects';
import * as ActionTypes from './JobsActionTypes';
import * as Actions from './JobsActions';
import * as PoolActions from '../pool/PoolActions';
import { store } from '../../index';
import { createJob } from '../../workers';
import { WorkerPool } from '../../workers/WorkerPool';
import AppStateType from '../appState';

const getSocketEnabled = (state: AppStateType) => state.socket.enabled;

// Called when user submit a script
export function* onJobSubmit() {
    yield takeEvery(ActionTypes.SUBMIT_SCRIPT, function* ({ payload }:  ActionTypes.SubmitScriptInterface) {
        // If socket is not enabled then we send the job on the local pool
        const enabled = yield select(getSocketEnabled);
        if (!enabled) { // Send to server if enabled
            // Check if pool instance is available
            const pool = WorkerPool.getWorkerPoolInstance();
            if (pool) {
                const job = createJob(payload.script, (result) => store.dispatch(Actions.setJobResult(result)));
                // Dispatch job to the pool
                yield put(PoolActions.dispatchJob(job))
            } else {
                throw new Error("Error: Cannot resize pool. workerPool is not defined in window scope")
            }
        } 
    });
}

// Called evry time a result is returned
export function* onSetJobResult() {
    yield takeEvery(ActionTypes.SET_JOB_RESULT, function* ({ payload }:  ActionTypes.SubmitScriptInterface) {
        // Update pool status
        yield put(PoolActions.getPoolStatus())
    });
}

export const JobsEffect = [
    fork(onJobSubmit),
    fork(onSetJobResult)
];

export default JobsEffect