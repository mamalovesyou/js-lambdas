import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import { History } from 'history';
import UIReducer from './ui/UIReducer';
import JobsReducer from './jobs/JobsReducer';
import PoolReducer from './pool/PoolReducer';
import SocketReducer from './socket/SocketReducer';

const createRootReducer = (history: History) => combineReducers({
    router: connectRouter(history),
    ui: UIReducer,
    jobs: JobsReducer,
    pool: PoolReducer,
    socket: SocketReducer
})

export default createRootReducer;

