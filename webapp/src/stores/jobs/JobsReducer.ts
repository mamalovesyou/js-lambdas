import * as ActionType from './JobsActionTypes';
import { JobResult, WorkerPoolStats } from '../../workers';

export type JobsStateType = {
    history: JobResult[];
    latest: null | JobResult & {
        inProgress: boolean;
    };
    pool: WorkerPoolStats
}

const initialJobsState: JobsStateType = {
    history: [],
    latest: null,
    pool: {
        isBusy: false,
        waitingJobs: 0,
        running: 0,
        size: 0
    }
}

const JobsReducer = (state: JobsStateType = initialJobsState, action: ActionType.JobsActionType) => {

    switch (action.type) {
        case ActionType.SET_JOB_RESULT:
            const result = (action as ActionType.SetJobResultInterface).payload
            const isLatest = (state.latest && (state.latest.id === result.id))
            return {
                ...state,
                history: [result, ...state.history],
                latest: isLatest ? {...result, inProgress: false} : state.latest
            }

        case ActionType.SET_LATEST_JOB:
            const job = (action as ActionType.SetLatestJobInterface).payload
            return {
                ...state,
                latest: {id: job.id, inProgress: true}
            }

        case ActionType.SET_POOL_STATUS:
            const status = (action as ActionType.SetPoolStatusInterface).payload
            return {...state, pool: status}

        default:
            return state
    }
}

export default JobsReducer;