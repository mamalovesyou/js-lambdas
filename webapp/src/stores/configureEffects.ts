import { all } from 'redux-saga/effects';
import JobsEffects from './jobs/JobsEffects';
import PoolEffects from './pool/PoolEffects';
import SocketEffects from './socket/SocketEffects';

export default function configureEffects() {
    return function* rootSaga() {
        yield all([
            ...JobsEffects,
            ...PoolEffects,
            ...SocketEffects
        ]);
    }
}