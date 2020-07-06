import * as WebSocket from 'ws';

// Job interface
export interface Job {
    id: string;
    script: string;
}

// Job Result interface
export interface JobResult {
    id: string;
    result?: string;
    error?: string;
    recievedAt: number;
    finishedAt: number;
}

export interface WebWorker {
    id: string;
    waitingJobs: Job[];
    latestSubmitJob?: Job;
    socket: WebSocket;
    sendJob: (job: Job) => void;
    onJobDone: (result: JobResult) => void;
    setLatestJob: (job: Job) => void;
}


export default createWorkerPool;