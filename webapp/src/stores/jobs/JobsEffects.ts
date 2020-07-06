import { all, takeEvery, put, fork, select, call } from 'redux-saga/effects';
import * as ActionTypes from './JobsActionTypes';
import * as Actions from './JobsActions';
import * as PoolActions from '../pool/PoolActions';
import { store } from '../../index';
import { createJob } from '../../workers';
import { WorkerPool } from '../../workers/WorkerPool';
import IAppState from '../appState';

const getSocketEnabled = (state: IAppState) => state.socket.enabled;

// Called when user submit a script
export function* onJobSubmit() {
    yield takeEvery(ActionTypes.SUBMIT_SCRIPT, function* ({ payload }:  ActionTypes.ISubmitScript) {
        // If socket is not enabled then we send the job on the local pool
        const enabled = yield select(getSocketEnabled);
        if (!enabled) { // Send to server if enabled
            // Check if pool instance is available
            const pool = WorkerPool.getWorkerPoolInstance();
            if (pool) {
                const job = createJob(payload.script, (result) => store.dispatch(Actions.setJobResult(result, false)));
                // Dispatch job to the pool
                
                yield all([
                    // Set Latest job
                    put(Actions.setLatestJobId(job.id)),
                    put(PoolActions.dispatchJob(job))
                ])
            } else {
                throw new Error("Error: Cannot resize pool. workerPool is not defined in window scope")
            }
        } 
    });
}

// Called evry time a result is returned
export function* onSetJobResult() {
    yield takeEvery(ActionTypes.SET_JOB_RESULT, function* ({ payload }:  ActionTypes.ISubmitScript) {
        // Update pool status
        yield put(PoolActions.getPoolStatus())
    });
}

export const JobsEffect = [
    fork(onJobSubmit),
    fork(onSetJobResult)
];

export default JobsEffect