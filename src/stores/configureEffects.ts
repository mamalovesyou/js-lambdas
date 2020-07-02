import { all } from 'redux-saga/effects';
import JobsEffect from './jobs/JobsEffects';

export default function configureEffects() {
    return function* rootSaga() {
        yield all([
            ...JobsEffect,
        ]);
    }
}