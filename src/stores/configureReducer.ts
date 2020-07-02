import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import { History } from 'history';
import UIReducer from './ui/UIReducer';

const createRootReducer = (history: History) => combineReducers({
    router: connectRouter(history),
    ui: UIReducer
})

export default createRootReducer;

