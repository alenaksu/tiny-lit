import { SchedulerQueue, SchedulerJob, JobPriority } from './types';

const jobsQueue: SchedulerQueue = [];
const jobsQueueLow: SchedulerQueue = [];

let flushPending = false;
let queueAge = 0;
let enabled = true;

function flushQueue(queue, timeout: number): void {
    let i = 0;

    while (timeout - performance.now() > 0 && i < queue.length) {
        const job = queue[i++];
        job.task!(...job.args);

        job.args = undefined;
        job.pending = false;
    }
    queue.splice(0, i);
}

function flush() {
    flushPending = true;

    requestAnimationFrame(() => {
        queueAge++;

        const now = performance.now();
        const timeSlice = 10 * Math.ceil(queueAge * (1.0 / 50));
        const timeout = now + timeSlice;

        flushQueue(jobsQueue, timeout);
        flushQueue(jobsQueueLow, timeout);

        if (jobsQueue.length > 0) {
            jobsQueueLow.push(...jobsQueue);
            jobsQueue.length = 0;
        }

        if (jobsQueueLow.length > 0) flush();
        else {
            flushPending = false;
            queueAge = 0;
        }
    });
}

export function setEnabled(value: boolean) {
    enabled = value;
}

export function enqueueJob(job: SchedulerJob, priority: JobPriority) {
    job.pending = true;

    if (priority === JobPriority.Normal) jobsQueue.push(job);
    else if (priority === JobPriority.Low) jobsQueueLow.push(job);

    if (!flushPending) flush();
}

export function scheduled(
    task: Function,
    priority: JobPriority = JobPriority.Normal
) {
    const job: SchedulerJob = {
        task,
        args: [],
        pending: false,
        firstRun: true
    };

    return (...args) => {
        if (job.firstRun || !enabled) {
            job.firstRun = false;
            task(...args);
        } else if (!job.pending) {
            job.args = args;
            enqueueJob(job, priority);
        }
    };
}
