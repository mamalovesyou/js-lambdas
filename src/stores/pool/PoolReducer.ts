import * as ActionType from './PoolActionTypes';
import { WorkerPoolStats } from '../../workers';

export type PoolStateType = WorkerPoolStats;

const initialJobsState: PoolStateType = {
    size: 0,
    isBusy: false,
    waitingJobs: 0,
    running: 0
}

const PoolReducer = (state: PoolStateType = initialJobsState, action: ActionType.JobsActionType) => {

    switch (action.type) {

        case ActionType.SET_MAX_WORKERS:
            const size = (action as ActionType.SetMaxWorkersInterface).payload
            return {...state, size}

        case ActionType.SET_POOL_STATUS:
            const status = (action as ActionType.SetPoolStatusInterface).payload
            return {...status}

        default:
            return state
    }
}

export default PoolReducer;