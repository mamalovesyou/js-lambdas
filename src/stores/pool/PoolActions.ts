import * as ActionTypes from './PoolActionTypes';
import { WorkerPoolStats } from '../../workers';

export const setMaxWorkers = (maxWorkers: number): ActionTypes.JobsActionType => ({
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