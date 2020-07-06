import * as ActionType from './SocketActionTypes';

export type SocketStateType = {
    enabled: boolean;
    workerId: string;
};

const initialSocketState: SocketStateType = {
    enabled: false,
    workerId: "Local",
}

const SocketReducer = (state: SocketStateType = initialSocketState, action: ActionType.SocketActionType) => {

    switch (action.type) {

        case ActionType.SET_SOCKET_ENABLE:
            const enabled = (action as ActionType.ISetSocketEnable).payload.enabled;
            if (!enabled) return {...state, enabled, workerId: "Local"}
            return {...state, enabled}

        case ActionType.SET_WORKER_ID:
            const workerId = (action as ActionType.ISetWorkerId).payload.id
            return {...state, workerId}

        default:
            return state
    }
}

export default SocketReducer;