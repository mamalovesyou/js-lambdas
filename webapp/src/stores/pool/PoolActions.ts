import * as ActionTypes from './PoolActionTypes';
import { WorkerPoolStats, Job } from '../../workers';

export const setMaxWorkers = (maxWorkers: number): ActionTypes.SetMaxWorkersInterface => ({
    type: ActionTypes.SET_MAX_WORKERS,
    payload: maxWorkers
});


export const getPoolStatus = (): ActionTypes.GetPoolStatusInterface => ({
    type: ActionTypes.GET_POOL_STATUS
});

export const setPoolStatus = (status: WorkerPoolStats): ActionTypes.SetPoolStatusInterface => ({
    type: ActionTypes.SET_POOL_STATUS,
    payload: status
});

export const dispatchJob = (job: Job): ActionTypes.DispatchJobInterface => ({
    type: ActionTypes.DISPATCH_JOB,
    payload: job
});