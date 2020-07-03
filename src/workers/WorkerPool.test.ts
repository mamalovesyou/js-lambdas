
import { WorkerPool } from './WorkerPool';
import { createJob } from './Job';

describe('Worker Pool Test', () => {
    
    it('init', () => {
        const size = 2;
        const pool = new WorkerPool(size);
        expect(pool.workerQueue.length).toEqual(size);
    })

    it('add job when no workers are available', () => {
        const pool = new WorkerPool(0)
        const fakeJob = createJob('script', function(){})
        pool.addJob(fakeJob);
        expect(pool.jobQueue.length).toEqual(1);
    })

    it('get stats', () => {
        const pool = new WorkerPool(0);
        const fakeJob = createJob('script', function(){})
        pool.addJob(fakeJob);
        pool.addJob(fakeJob);
        pool.running++;
        expect(pool.getStats().isBusy).toBe(true);
        expect(pool.getStats().waitingJobs).toBe(2);
    })
})