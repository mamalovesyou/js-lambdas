import { Job } from "./workers.interface"

export const createJobMessage = (job: Job): string => {
    const  msg = {type: "newjob", job: job }
    return JSON.stringify(msg)
}