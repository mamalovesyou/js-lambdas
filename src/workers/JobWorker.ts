import { WorkerPool } from "./WorkerPool";
import { Job, JobResult } from './Job';
import { WorkerScriptBuilder, GetBlobUrl } from "./WorkerScript";

// TaskWorker is a wrapper that create a WebWorker to run a script
// Necessary so we can deal easily with our queue in the WorkerPool


export class JobWorker {

    _pool: WorkerPool;
    _worker: Worker | null;
    _result: JobResult | null;
    job: Job | null;

    constructor(pool: WorkerPool) {
        this._pool = pool;
        this.job = null;
        this._worker = null;
        this._result = null;
    }

    run(job: Job) {
        this.job = job;
        if (job.script && this._pool) {

            // Increment number of running worker on the pool
            this._pool.running++;

            const scriptUrl = this.prepare(job.script);
            this._worker = new Worker(scriptUrl);
            this._worker.onmessage = this.createResultCallback();
            this._worker.onerror = this.createErrorCallback();
        }

    }

    // Return a blob url for a given script
    prepare(script: string): string {
        const blob = WorkerScriptBuilder(script);
        const url = GetBlobUrl(blob);
        return url
    }


   // Send result and tell the pool I am free
   // Clear the job for this task worker
    sendAndFree(result: string) {
        this._worker ? this._worker.terminate() : console.log("Failed to terminate worker (null reference");
        this._pool.running--;
        this.sendResult(result);
        this._pool.freeJobWorker(this);
    }

    // Send the result for a job and clear it
    sendResult(data: string) {
        if (this.job) {
            const result = { 
                result: data, 
                id: this.job.id, 
                script: this.job.script 
            }
            this.job.onResult(result);
        } else {
            console.log("Cannot send result, job is ", this.job)
        }
        this.job = null;
    }


    createResultCallback() {
        const instance = this;
        return (event: MessageEvent) => {
            if (instance.job && event.data && event.data.type === "result") {
                // Send result and tell the pool I am free
                instance.sendAndFree(event.data.result);
            }
        }
    }

    createErrorCallback() {
        const instance = this;
        return (event: ErrorEvent) => {
            if (instance.job && event.message) {
                // Send result and tell the pool I am free
                instance.sendAndFree(event.message);
            }
        }
    }

}
