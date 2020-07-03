import { takeEvery, put, fork } from 'redux-saga/effects';
import * as ActionTypes from './PoolActionTypes';
import * as Actions from './PoolActions';
import { pool } from '../../index';

// Get Pool Status when app init 
function * initialSaga() {
    yield put(Actions.getPoolStatus())
 }

// Called when user submit a script
export function* onSetMaxWorkers() {
    yield takeEvery(ActionTypes.SET_MAX_WORKERS, function* ({ payload }:  ActionTypes.SetMaxWorkersInterface) {
        // Resize pool
        pool.resize(payload);
        
        // Update refresh pool status
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
    fork(initialSaga),
    fork(onSetMaxWorkers),
    fork(onGetPoolStatus)
];

export default JobsEffect