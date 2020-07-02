import { WorkerPool } from "./WorkerPool";
import { Job } from './Job';
import { WorkerScriptBuilder, GetBlobUrl } from "./WorkerScript";

// TaskWorker is a wrapper that create a WebWorker to run a script
// Necessary so we can deal easily with our queue in the WorkerPool


export class JobWorker {

    _pool: WorkerPool;
    _worker: Worker | null;

    job: Job | null;

    constructor(pool: WorkerPool) {
        this._pool = pool;
        this.job = null;
        this._worker = null;
    }

    run(job: Job) {
        this.job = job;
        if (job.script) {
            const scriptUrl = this.prepare(job.script);
            this._worker = new Worker(scriptUrl);
            this._worker.onmessage = this.createResultCallback;
            this._worker.onerror = this.createErrorCallback;
        }

    }

    // Return a blob url for a given script
    prepare(script: string): string {
        const blob = WorkerScriptBuilder(script);
        const url = GetBlobUrl(blob);
        return url
    }

    // Remove the job for this task worker
    // Tell the pool I am free
    free() {
        this.job = null;
        this._worker ? this._worker.terminate() : console.log("Failed to terminate worker (null reference");
        this._pool.freeJobWorker(this);
    }

    createResultCallback() {
        const instance = this;
        return (event: MessageEvent) => {
            if (instance.job && event.data) {
                let result = { result: event.data, jobId: instance.job.id }
                result.jobId = instance.job.id;
                // Call onResult callback of the task
                console.log("before task callback: " + result);
                instance.job.onResult(result);
                // Tell the pool I am free
                instance.free();
            }
        }
    }

    createErrorCallback() {
        const instance = this;
        return (event: ErrorEvent) => {
            if (instance.job && event.message) {
                let result = { error: event.message, jobId: instance.job.id }
                result.jobId = instance.job.id;
                // Call onResult callback of the task
                console.log("before task callback: " + result);
                instance.job.onResult(result);
                // Tell the pool I am free
                instance.free();
            }
        }
    }

}
