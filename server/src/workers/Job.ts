import { generateId } from '../utils';
import { Job } from './workers.interface';

// Return a Job object
export function createJob(script: string): Job {
    return {
        id: generateId(),
        script
    }
};