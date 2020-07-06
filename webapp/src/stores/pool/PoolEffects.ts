import { takeEvery, put, fork, call, all } from 'redux-saga/effects';
import * as ActionTypes from './PoolActionTypes';
import * as Actions from './PoolActions';
import { WorkerPool } from '../../workers/WorkerPool';

// Get Pool Status when app init 
function* initialSaga() {
    yield put(Actions.getPoolStatus())
}

// Called when user submit a script
export function* onSetMaxWorkers() {
    yield takeEvery(ActionTypes.SET_MAX_WORKERS, function* ({ payload }: ActionTypes.ISetMaxWorkers) {
        // Resize pool
        const pool = WorkerPool.getWorkerPoolInstance();
        if (pool) {
            pool.resize(payload);

            // Update refresh pool status
            yield put(Actions.getPoolStatus())
        } else {
            throw new Error("Error: Cannot resize pool. workerPool is not defined in window scope")
        }
    });
}

// Called when worker pool status is asked
export function* onGetPoolStatus() {
    yield takeEvery(ActionTypes.GET_POOL_STATUS, function* () {

        // Resize pool
        const pool = WorkerPool.getWorkerPoolInstance();
        if (pool) {
            const status = pool.getStats();
            // Update worker pool status
            yield put(Actions.setPoolStatus(status))
        } else {
            throw new Error("Error: Cannot get status. workerPool is not defined in window scope")
        }
    });
}

// Called when user submit a script
export function* onDispatchJob() {
    yield takeEvery(ActionTypes.DISPATCH_JOB, function* ({ payload }: ActionTypes.IDispatchJob) {
        // Resize pool
        const pool = WorkerPool.getWorkerPoolInstance();
        if (pool) {
            pool.addJob(payload);
            yield put(Actions.getPoolStatus());
    
        } else {
            throw new Error("Error: Cannot add job to the pool. workerPool is not defined in window scope")
        }
    });
}

export const JobsEffect = [
    fork(initialSaga),
    fork(onSetMaxWorkers),
    fork(onGetPoolStatus),
    fork(onDispatchJob)
];

export default JobsEffect