import { takeEvery, put, fork } from 'redux-saga/effects';
import * as ActionTypes from './JobsActionTypes';
import * as Actions from './JobsActions';
import { store } from '../../index';

import { WorkerPool } from '../../workers/WorkerPool';
import { createJob } from '../../workers/Job';

// Create our pool with 4 maximum worker;
const pool = new WorkerPool(4);

export function* onJobSubmit() {
    yield takeEvery(ActionTypes.SUBMIT_SCRIPT, function* ({ payload }:  ActionTypes.SubmitScriptInterface) {
        const job = createJob(payload.script, (result) => store.dispatch(Actions.setJobResult(result)));

        // Set Latest job
        yield put(Actions.setLatestJob(job))

        // Add job to the pool
        pool.addJob(job);
    });
}

export const JobsEffect = [
    fork(onJobSubmit)
];

export default JobsEffect