describe('Lumberjack()', function () {
    var log;
    beforeEach(function () {
        log = Lumberjack();
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

    describe('log()', function () {
        it('requires an event string', function () {
            expect(function () {
                log();
            }).toThrowError();
            expect(function () {
                log(123);
            }).toThrowError();
        });
        it('requires some data', function () {
            expect(function () {
                log('test');
            }).toThrowError();
        });
        it('does not accept functions', function () {
            expect(function () {
                log('test', function () {});
            }).toThrowError();
            expect(function () {
                log('test', false);
            }).not.toThrowError();
        });
        describe('eventing', function () {
            var spy;
            beforeEach(function () {
                spy = jasmine.createSpy('eventSpy');
                log.on('testevent', function (data) {
                    spy('123abc');
                });
            });
            it('triggers callbacks', function () {
                expect(spy).not.toHaveBeenCalled();
                log('testevent', 'someval');
                expect(spy).toHaveBeenCalledWith('123abc');
            });
            it('triggers the right callbacks', function () {
                expect(spy).not.toHaveBeenCalled();
                log('othertest', []);
                expect(spy).not.toHaveBeenCalled();
            });
        });
    });

    describe('log.on()', function () {
        it('requires an event string', function () {
            expect(function () {
                log.on();
            }).toThrowError();
            expect(function () {
                log.on(1234, function () {});
            }).toThrowError();
            expect(function () {
                log.on('lkj', function () {});
            }).not.toThrowError();
        });
        it('requires a callback function', function () {
            expect(function () {
                log.on('testevent');
            }).toThrowError();
            expect(function () {
                log.on('testevent', 1234);
            }).toThrowError();
            expect(function () {
                log.on('testevent', function () {});
            }).not.toThrowError();
        });
        it('binds to an event without tripping it', function () {
            var spy = jasmine.createSpy('eventSpy');
            log('testevent', 123);
            expect(spy).not.toHaveBeenCalled();
            log.on('testevent', function (data) {
                spy('123abc');
            });
            expect(spy).not.toHaveBeenCalled();
            log('testevent', {});
            expect(spy).toHaveBeenCalledWith('123abc');
        });
    });

    describe('log.readback()', function () {
        it('requires an event string', function () {
            expect(function () {
                log.readback();
            }).toThrowError();
            expect(function () {
                log.readback(1234);
            }).toThrowError();
            expect(function () {
                log.readback('lkj');
            }).not.toThrowError();
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
});
