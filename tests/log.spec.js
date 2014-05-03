describe('lumberjack', function () {
    var log;
    beforeEach(function () {
        log = Lumberjack();
        spyOn(console, 'log').and.stub();
    });

    it('can have multiple instances', function () {
        var first, second;
        expect(function () {
            first = Lumberjack();
            second = Lumberjack();
        }).not.toThrowError();
        expect(first).toBeDefined();
        expect(second).toBeDefined();
    });

    describe('readback', function () {
        it('works without an event', function () {
            var out;
            expect(function () {
                out = log.readback();
            }).not.toThrowError();
            expect(out).toBeUndefined();
        });
        it('works without data', function () {
            var out = log.readback('test');
            expect(out).toBeUndefined();
        });
        it('reports data', function () {
            log('test', 'data');
            var out = log.readback('test');
            expect(out[0].data).toEqual('data');
        });
        it('reports the right data', function () {
            log('test', 'value');
            log('other', 'value');
            var out = log.readback('test');
            expect(out[0].data).toEqual('value');
        });
    });
    describe('logging', function () {
        it('can accept a string', function () {
        });
    });
});
