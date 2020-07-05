import { expectSaga } from 'redux-saga-test-plan';
import { WorkerPool } from '../../workers/WorkerPool';
import { onSetMaxWorkers } from './PoolEffects';
import { setMaxWorkers, getPoolStatus } from './PoolActions';
import PoolReducer from './PoolReducer';

describe('Pool Effects', () => {

    // Check resize pool workflow
    it('should resize the pool', () => {
        const newSize = 4;
        window.workerPool = new WorkerPool(2);
        return expectSaga(onSetMaxWorkers)
            .withReducer(PoolReducer)
            // Assert that the `put` will eventually happen.
            .put(getPoolStatus())

            .hasFinalState({
                size: newSize,
                isBusy: false,
                waitingJobs: 0,
                running: 0
            })

            // Dispatch any actions that the saga will `take`.
            .dispatch(setMaxWorkers(newSize))

            // Start the test. Returns a Promise.
            .run();
    })
})