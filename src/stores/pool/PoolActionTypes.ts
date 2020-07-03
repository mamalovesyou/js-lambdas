import { WorkerPoolStats } from '../../workers';

export const SET_MAX_WORKERS = 'SET_MAX_WORKERS';
export const GET_POOL_STATUS = 'GET_POOL_STATUS';
export const SET_POOL_STATUS = 'SET_POOL_STATUS';

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


export type JobsActionType = SetMaxWorkersInterface | GetPoolStatusInterface | SetPoolStatusInterface;