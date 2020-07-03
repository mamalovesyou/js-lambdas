import { WorkerPool } from "./WorkerPool";
import { WorkerScriptBuilder, GetBlobUrl } from "./WorkerScript";
import { Job, JobResult } from '.';
/*
The Web Worker provides an API postMessage() to exchange 
message between main and web worker thread. But we need a better api 
to communicate with our WorkerPool. */

/**
 * JobWorker is a representation of a Worker responsible for 
 * starting and terminating the worker and execute the callback 
 * of our Job when the has return a result and is properly terminated
 * 
 * @param {WorkerPool} [pool]   parent WorkerPool
 * @constructor
 */
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
    free() {
        this._worker ? this._worker.terminate() : console.log("Failed to terminate worker (null reference");
        this._pool.freeJobWorker(this);
    }

    // Send the result for a job and clear it
    sendResult(data: string) {
        // Tell the pool I am not running anymore
        this._pool.running--;
        if (this.job) {
            const result = { 
                result: data, 
                id: this.job.id, 
                script: this.job.script 
            }
            // execute job callback
            this.job.onResult(result);
        } else {
            console.log("Cannot send result, job is ", this.job)
        }
        this.job = null;
    }

    // Send the result for a job and clear it
    sendError(data: string) {
        // Tell the pool I am not running anymore
        this._pool.running--;
        if (this.job) {
            const result = { 
                error: data, 
                id: this.job.id, 
                script: this.job.script 
            }
            // execute job callback
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
                // Send result
                instance.sendResult(event.data.result);
                // Tell the pool I am free
                instance.free();
            } 
            // Handle case we catch the error in the promise 
            else if(instance.job && event.data && event.data.error) {
                // Send error
                instance.sendError(event.data.error);
                // Tell the pool I am free
                instance.free();
            }
        }
    }

    createErrorCallback() {
        const instance = this;
        return (event: ErrorEvent) => {
            console.log("error callback");
            if (instance.job && event.message) {
                // Send error
                instance.sendError(event.message);
                // Tell the pool I am free
                instance.free();
            }
        }
    }

}
