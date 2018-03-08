const requestIdleCallback =
    (window as any).requestIdleCallback ||
    function(handler: Function, options: any = {}) {
        const start = Date.now();
        return setTimeout(
            () =>
                handler({
                    didTimeout: false,
                    timeRemaining: () => {
                        return Math.max(
                            0,
                            (options.timeout || 50) - (Date.now() - start)
                        );
                    },
                }),
            1
        );
    };

export interface ScheduledFunction extends Function {
    _priority: number;
    _scheduled: boolean;
}

export interface IdleDeadline {
    didTimeout: boolean;
    timeRemaining(): number;
}

export interface SchedulerInterface {
    defer(fn: ScheduledFunction): Function;
}

export class Scheduler implements SchedulerInterface {
    tasks: ScheduledFunction[] = [];
    private running: boolean = false;

    private process = (deadline: IdleDeadline): void => {
        const tasks = this.tasks;
        while (
            (deadline.timeRemaining() > 0 || deadline.didTimeout) &&
            tasks.length > 0
        ) {
            const fn = tasks.shift();
            fn!();
            (fn as any)._scheduled = false;
        }

        if (tasks.length > 0) {
            this.start();
        } else {
            this.running = false;
        }
    };

    private start() {
        requestIdleCallback(this.process, {
            timeout: 100,
        });
        this.running = true;
    }

    defer(fn: ScheduledFunction): Function {
        return () => {
            if (fn._scheduled === undefined) {
                // Force first rendering
                requestAnimationFrame(fn as any);
                fn._scheduled = false;
            } else if (!fn._scheduled) {
                this.tasks.push(fn);
                fn._scheduled = true;
                fn._priority = 0;
            } else {
                fn._priority++;
                this.tasks.sort(
                    (a, b) => (b as any)._priority - (a as any)._priority
                );
            }

            if (this.tasks.length && !this.running) {
                this.start();
            }
        };
    }
}

export default new Scheduler();
