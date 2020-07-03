import { Job } from '.';

const generateId = () => {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return Math.random().toString(36).substr(2, 9);
};

// Return a Job object
export function createJob(script: string, onResult: (result: any) => void): Job {
    return {
        id: generateId(),
        script,
        onResult
    }
};

export default createJob;