import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import { History } from 'history';
import UIReducer from './ui/UIReducer';
import JobsReducer from './jobs/JobsReducer';

const createRootReducer = (history: History) => combineReducers({
    router: connectRouter(history),
    ui: UIReducer,
    jobs: JobsReducer
})

export default createRootReducer;

