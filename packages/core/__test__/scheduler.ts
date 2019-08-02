import { scheduled } from '../src/scheduler';

describe('Scheduler', () => {
    // TODO add tests
    it('should process task queue', done => {
        const a: any = jasmine.createSpy(),
            b: any = jasmine.createSpy(),
            c: any = jasmine.createSpy();

        const da = scheduled(a),
            db = scheduled(b),
            dc = scheduled(c);

        da();
        db();
        dc();
        expect(a).toHaveBeenCalled();
        expect(b).toHaveBeenCalled();
        expect(c).toHaveBeenCalled();

        da();
        db();
        dc();

        requestAnimationFrame(() => {
            setTimeout(() => {
                expect(a).toHaveBeenCalledTimes(2);
                expect(b).toHaveBeenCalledTimes(2);
                expect(c).toHaveBeenCalledTimes(2);

                done();
            }, 1);
        });
    });
});
