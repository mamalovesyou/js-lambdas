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
            const enabled = (action as ActionType.SetSocketEnableInterface).payload.enabled;
            return {...state, enabled}

        case ActionType.SET_WORKER_ID:
            const workerId = (action as ActionType.SetWorkerIdInterface).payload.id
            return {...state, workerId}

        default:
            return state
    }
}

export default SocketReducer;