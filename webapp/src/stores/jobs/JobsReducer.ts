import * as ActionType from './JobsActionTypes';
import { JobResult, WorkerPoolStats } from '../../workers';

export type JobsStateType = {
    history: JobResult[];
    latest: null | JobResult & {
        inProgress: boolean;
    };
}

const initialJobsState: JobsStateType = {
    history: [],
    latest: null
}

const JobsReducer = (state: JobsStateType = initialJobsState, action: ActionType.JobsActionType) => {

    switch (action.type) {
        case ActionType.SUBMIT_SCRIPT:
            return {...state, latest: {...state.latest, inProgress:true}}

        case ActionType.SET_JOB_RESULT:
            const {result, fromSocket} = (action as ActionType.ISetJobResult).payload
            if (fromSocket) {
                return {...state, latest: { ...result, inProgress: false }}
            }
            // Check for local mode
            const isLatest = (state.latest && state.latest.id === result.id);
            return {
                history: [result, ...state.history] ,
                latest: isLatest ? { ...result, inProgress: false } : state.latest
            }

        case ActionType.SET_LATEST_JOB_ID:
            const id = (action as ActionType.ISetLatestJobId).payload.id
            return { ...state, latest: { id, inProgress: true } }


        default:
            return state
    }
}

export default JobsReducer;