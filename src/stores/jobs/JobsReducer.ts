import * as ActionType from './JobsActionTypes';
import { JobResult } from '../../workers/Job';

export type JobsStateType = {
    history: JobResult[];
    latest: null | JobResult & {
        inProgress: boolean;
    };
    // isPoolBusy: boolean;
    // waitingJobs: number;
}

const initialJobsState: JobsStateType = {
    history: [],
    latest: null
}

const JobsReducer = (state: JobsStateType = initialJobsState, action: ActionType.JobsActionType) => {

    switch (action.type) {
        case ActionType.SET_JOB_RESULT:
            const result = (action as ActionType.SetJobResultInterface).payload
            const isLatest = (state.latest && (state.latest.id === result.id))
            return {
                history: [result, ...state.history],
                latest: isLatest ? {...result, inProgress: false} : state.latest
            }
        case ActionType.SET_LATEST_JOB:
            const job = (action as ActionType.SetLatestJobInterface).payload
            return {
                ...state,
                latest: {id: job.id, inProgress: true}
            }
        default:
            return state
    }
}

export default JobsReducer;