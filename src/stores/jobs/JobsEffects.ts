import { all, takeEvery, put, fork } from 'redux-saga/effects';
import * as ActionTypes from './JobsActionTypes';
import * as Actions from './JobsActions';
import { store, pool } from '../../index';

import { createJob } from '../../workers';

// Called when user submit a script
export function* onJobSubmit() {
    yield takeEvery(ActionTypes.SUBMIT_SCRIPT, function* ({ payload }:  ActionTypes.SubmitScriptInterface) {

        const job = createJob(payload.script, (result) => store.dispatch(Actions.setJobResult(result)));

        yield all([
            // Set Latest job
            put(Actions.setLatestJob(job)),
            // Update pool status
            put(Actions.getPoolStatus())
        ]);

        // Add job to the pool
        pool.addJob(job);
    });
}

// Called evry time a result is returned
export function* onSetJobResult() {
    yield takeEvery(ActionTypes.SET_JOB_RESULT, function* ({ payload }:  ActionTypes.SubmitScriptInterface) {
        // Update pool status
        yield put(Actions.getPoolStatus())
    });
}

// Called when worker pool status is asked
export function* onGetPoolStatus() {
    yield takeEvery(ActionTypes.GET_POOL_STATUS, function* () {
        const status = pool.getStats();
        // Update worker pool status
        yield put(Actions.setPoolStatus(status))

    });
}

export const JobsEffect = [
    fork(onJobSubmit),
    fork(onSetJobResult),
    fork(onGetPoolStatus)
];

export default JobsEffect