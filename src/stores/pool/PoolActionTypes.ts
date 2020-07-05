import { WorkerPoolStats, Job } from '../../workers';

export const SET_MAX_WORKERS = 'SET_MAX_WORKERS';
export const GET_POOL_STATUS = 'GET_POOL_STATUS';
export const SET_POOL_STATUS = 'SET_POOL_STATUS';
export const DISPATCH_JOB = 'DISPATCH_JOB';

export interface SetMaxWorkersInterface {
    type: typeof SET_MAX_WORKERS;
    payload: number;
}

export interface GetPoolStatusInterface {
    type: typeof GET_POOL_STATUS;
}

export interface SetPoolStatusInterface {
    type: typeof SET_POOL_STATUS;
    payload: WorkerPoolStats;
}

export interface DispatchJobInterface {
    type: typeof DISPATCH_JOB;
    payload: Job;
}



export type PoolActionType = SetMaxWorkersInterface | GetPoolStatusInterface | SetPoolStatusInterface | DispatchJobInterface;