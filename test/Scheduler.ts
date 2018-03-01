import { Scheduler, ScheduledFunction } from '../src/Scheduler';

describe('Scheduler', () => {
    it('should prioritize frequent tasks', () => {
        const s = new Scheduler();
        const a: any = () => { }, b: any = () => { }, c: any = () => { };

        // cheating
        (<any>s).running = true;

        const da = s.defer(a),
            db = s.defer(b),
            dc = s.defer(c);

        da();
        db();
        dc();
        expect((<any>s).tasks).toEqual([a, b, c]);

        dc();
        dc();
        dc();
        da();
        da();
        db();
        expect((<any>s).tasks).toEqual([c, a, b]);
    });

    it('should process task queue', () => {
        const s = new Scheduler();
        const a: any = () => { }, b: any = () => { }, c: any = () => { };

        // cheating
        (<any>s).running = true;

        const da = s.defer(a),
            db = s.defer(b),
            dc = s.defer(c);

        da();
        db();
        dc();
        // expect((<any>s).tasks).toEqual([a, b, c]);

        (<any>s).process({
            didTimeout: true,
            timeRemaining: () => {
                return 0;
            }
        });
        dc();
        expect((<any>s).tasks).toEqual([c]);
    });
});