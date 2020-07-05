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
}

export interface Message {
    type: string;
}

export interface JobMessage extends Message{
    job: Job;
}

export interface ResultMessage extends Message{
    result: JobResult;
}

export interface ScriptMessage extends Message{
    script: string;
}


export default createWorkerPool;