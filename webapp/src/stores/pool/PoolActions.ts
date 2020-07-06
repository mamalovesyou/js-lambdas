import * as ActionTypes from './PoolActionTypes';
import { WorkerPoolStats, Job } from '../../workers';

export const setMaxWorkers = (maxWorkers: number): ActionTypes.ISetMaxWorkers => ({
    type: ActionTypes.SET_MAX_WORKERS,
    payload: maxWorkers
});


export const getPoolStatus = (): ActionTypes.IGetPoolStatus => ({
    type: ActionTypes.GET_POOL_STATUS
});

export const setPoolStatus = (status: WorkerPoolStats): ActionTypes.ISetPoolStatus => ({
    type: ActionTypes.SET_POOL_STATUS,
    payload: status
});

export const dispatchJob = (job: Job): ActionTypes.IDispatchJob => ({
    type: ActionTypes.DISPATCH_JOB,
    payload: job
});