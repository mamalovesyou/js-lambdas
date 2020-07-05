
import { WorkerPool } from './WorkerPool';
import { createJob } from './Job';
import { JobWorker } from './JobWorker';

describe('Job Worker Test', () => {

    const mockWebWorker = jest.fn().mockImplementation(() => ({
        terminate: jest.fn(),
        // onmessage: jest.fn(),
        // onerror: jest.fn(),
        // addEventListeneer: jest.fn(),
    }));

    it('free worker on pool', () => {
        const pool = new WorkerPool(2);
        const worker = new JobWorker(pool);
        // Remove one of the two worker to simulate a job submit
        pool.workerQueue.shift();
        const availableWorkers = pool.workerQueue.length;
        worker._worker = <Worker>mockWebWorker();
        worker.free();
        expect(pool.workerQueue.length).toEqual(availableWorkers+1);
    })

    it('send result', () => {
        const onResult = jest.fn(() => 'default')
        const fakeJob = createJob('script', onResult)
        const pool = new WorkerPool(0);
        const worker = new JobWorker(pool);
        worker.job = fakeJob;
        worker.sendResult('r')
        expect(fakeJob.onResult).toBeCalled();
    })

    it('send error', () => {
        const onResult = jest.fn(() => 'default')
        const fakeJob = createJob('script', onResult)
        const pool = new WorkerPool(0);
        const worker = new JobWorker(pool);
        worker.job = fakeJob;
        worker.sendError('r')
        expect(fakeJob.onResult).toBeCalled();
    })
})