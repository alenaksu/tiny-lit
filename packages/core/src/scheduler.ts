import { SchedulerQueue, SchedulerJob, JobPriority } from './types';

const jobsQueue: SchedulerQueue = [];
const jobsQueueLow: SchedulerQueue = [];
const jobsQueueCallback: SchedulerQueue = [];

const JOB_WINDOW = 10;
const JOB_MAX_WAIT = 100;
const raf = window.requestAnimationFrame;

let flushPending = false;
let queueAge = 0;
let enabled = true;

function flushQueue(queue, timeout: number): void {
    let i = 0;
    const l = queue.length;

    while (Date.now() < timeout && i < l) {
        const job = queue[i++];
        job.task!(...job.args);

        job.args = undefined;
        job.scheduled = false;
    }

    queue.splice(0, i);
}

function flush() {
    queueAge++;

    const now = Date.now();
    const timeSlice = JOB_WINDOW * Math.ceil(queueAge * (1.0 / JOB_MAX_WAIT));
    const timeout = now + timeSlice;

    flushQueue(jobsQueue, timeout);
    flushQueue(jobsQueueLow, timeout);

    if (jobsQueue.length > 0) {
        jobsQueueLow.push(...jobsQueue);
        jobsQueue.length = 0;
    }

    if (jobsQueueLow.length > 0) raf(flush);
    else {
        flushQueue(jobsQueueCallback, Number.MAX_SAFE_INTEGER);
        flushPending = false;
        queueAge = 0;
    }
}

export function setEnabled(value: boolean) {
    enabled = value;
}

export function enqueueJob(job: SchedulerJob, priority: JobPriority) {
    job.scheduled = true;

    if (priority === JobPriority.Normal) jobsQueue.push(job);
    else if (priority === JobPriority.Low) jobsQueueLow.push(job);
    else if (priority === JobPriority.Callback) jobsQueueCallback.push(job);

    if (!flushPending) {
        flushPending = true;
        raf(flush);
    }
}

export function scheduled(
    task: Function,
    priority: JobPriority = JobPriority.Normal
) {
    const job: SchedulerJob = {
        task,
        args: [],
        scheduled: false,
        firstRun: true
    };

    return (...args) => {
        if (job.firstRun || !enabled) {
            job.firstRun = false;
            task(...args);
        } else {
            job.args = args;
            if (!job.scheduled) enqueueJob(job, priority);
        }
    };
}
