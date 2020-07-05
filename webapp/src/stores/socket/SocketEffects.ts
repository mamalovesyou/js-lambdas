
import { eventChannel } from 'redux-saga';
import { take, call, takeEvery, select, put, fork } from 'redux-saga/effects'
import { api } from '../../index';
import { setSocketEnable, setWorkerId, recievedJob, sendJobResult, sendScript } from './SocketActions';
import { dispatchJob } from '../pool/PoolActions';
import { setJobResult } from '../jobs/JobsActions';
import * as ActionTypes from './SocketActionTypes';
import { SET_JOB_RESULT, SetJobResultInterface, SUBMIT_SCRIPT, SubmitScriptInterface } from '../jobs/JobsActionTypes';
import { IMessageEvent } from 'websocket';
import AppStateType from '../appState';
import { JobResult, Job } from 'src/workers';
import { store } from '../../index';

function createEventChannel() {

    return eventChannel(emitter => {

        const ws = api.InitWebSocket();

        ws.onopen = () => {
            console.log('Opening websocket...')
            // Connection is open so we set socket enable
            emitter(setSocketEnable(true));
        }
        ws.onerror = (error) => {
            console.log('WebSocket error: ' + error)
            // Error, we consider that websocket isn't available anymore
            // emitter(setSocketEnable(false));
        }
        ws.onclose = () => {
            console.log('Closing websocket...')
            // Closing so websocket isn't available anymore
            api.CloseSocket();
            emitter(setSocketEnable(false));
        }

        ws.onmessage = (event: IMessageEvent) => {
            let parsedMsg = null;
            try {
                parsedMsg = JSON.parse((event.data as string))
            } catch (e) {
                console.log(`Error parsing : ${event.data}`)
            }
            if (parsedMsg) {
                console.log(parsedMsg);
                const action = (parsedMsg as any)
                switch (action.type) {
                    case ActionTypes.SHARED_WORKER_ID:
                        return emitter(setWorkerId((action as ActionTypes.SharedWorkerIdInterface).workerId))
                    case ActionTypes.SHARED_JOB:
                        return emitter(recievedJob((action as ActionTypes.SharedJobInterface).job))
                    default:
                }
            }
        }
        // unsubscribe function
        return () => {
            console.log('Socket off');
            ws.close();
        }
    })
}

const getSocketEnabled = (state: AppStateType) => state.socket.enabled;
const getLatestJobId = (state: AppStateType) => state.jobs.latest ? state.jobs.latest.id : undefined;

// Called evry time a result is returned
export function* onSetJobResult() {
    yield takeEvery(SET_JOB_RESULT, function* ({ payload }:  SetJobResultInterface) {

        // Check if the job is the latest run here
        // If it was then no need to send result back, 
        // Jobs reducer will take care of showing result to user
        const latestId = yield select(getLatestJobId);
        const sendResult = (latestId !== payload.id)

        // send result back to server if socket is open
        const enabled = yield select(getSocketEnabled);
        if (sendResult && enabled) {
            const message = JSON.stringify(sendJobResult(payload));
            api.SendMessage(message);
        }
    });
}

// Called evry time a result is returned
export function* onSubmitScript() {
    yield takeEvery(SUBMIT_SCRIPT, function* ({ payload }:  SubmitScriptInterface) {
        console.log("submit script");
        // send result back to server if socket is open
        const enabled = yield select(getSocketEnabled);
        if (enabled) {
            const message = JSON.stringify(sendScript(payload.script));
            yield api.SendMessage(message);
        }
    });
}

// Called evry time we recieve a job from server
export function* onRecieveJob() {
    yield takeEvery(ActionTypes.RECIEVED_JOB, function* ({ payload }:  ActionTypes.RecievedJobInterface) {
        // Dispatch job to pool
        const job: Job = {...payload.job, onResult: (result: JobResult) => store.dispatch(setJobResult(result))}
        yield put(dispatchJob(job));
    });
}



function* initializeWebSocketsChannel() {
    const channel = yield call(createEventChannel);
    while (true) {
        const message = yield take(channel);
        yield put(message);
    }
}

export const SocketEffects = [
    fork(initializeWebSocketsChannel),
    fork(onSubmitScript),
    fork(onSetJobResult),
    fork(onRecieveJob),
];

export default SocketEffects;

