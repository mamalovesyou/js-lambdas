import { readFile } from "fs";

// Script wrapper to ensure code is run properly
// Making code as promise ensure correct order execution (async code for example)
export const WrappScriptForWorker = (script: string): string => {
    const wrapped = `const task = ${script}
    const taskPromise = () => new Promise(resolve => resolve(task()));
    taskPromise().then(result => {
        self.postMessage({type: 'result', result: result})
    }).catch(error => self.postMessage({error: error.message}));`;
    return wrapped;
}

export const WorkerScriptBuilder = (script: string): Blob => {

    // Wrapp script for worker
    const wrappedScript = WrappScriptForWorker(script);
    const blob = createBlob(wrappedScript, {type: 'application/javascript'});
    return blob;
}

export const createBlob = (content: string, property: BlobPropertyBag) => {
    var blob
    // Create a blob
    try {
        blob = new Blob([content], property);
    } catch (e) { 
        // Handle backwards compatibility
        const w = (window as any)
        const BlobBuilder = w.BlobBuilder || w.WebKitBlobBuilder || w.MozBlobBuilder;
        blob = new BlobBuilder();
        blob.append(content);
        blob = blob.getBlob();
    }
    return blob;
}

// Return an url for a blob
export const GetBlobUrl = (blob: Blob): string => {
    // URL.createObjectURL
    const w = (window as any)
    const URL = w.URL || w.webkitURL;
    return URL.createObjectURL(blob);
}

