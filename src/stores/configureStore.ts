import { createStore, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router'
import { composeWithDevTools } from 'redux-devtools-extension';
import createRootReducer from './configureReducer';
import configureEffects from './configureEffects';


// Create borwser history 
export const history = createBrowserHistory();


// Create the saga middleware
const rootSaga = configureEffects();
const sagaMiddleware = createSagaMiddleware();

export default function configureStore() {
    const store = createStore(
        createRootReducer(history),
        composeWithDevTools(
            applyMiddleware(
                routerMiddleware(history), // for dispatching history actions
                sagaMiddleware
            )
        )
    );

    sagaMiddleware.run(rootSaga);

    return store;
}
