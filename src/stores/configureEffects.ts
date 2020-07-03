import { all } from 'redux-saga/effects';
import JobsEffects from './jobs/JobsEffects';
import PoolEffects from './pool/PoolEffects';

export default function configureEffects() {
    return function* rootSaga() {
        yield all([
            ...JobsEffects,
            ...PoolEffects
        ]);
    }
}