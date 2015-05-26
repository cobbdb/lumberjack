describe('Lumberjack()', function () {
    var log;
    beforeEach(function () {
        log = Lumberjack();
        localStorage.lumberjack = 'on';
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

    describe('log.off()', function () {
        it('requires an event string', function () {
            expect(function () {
                log.off();
            }).toThrowError();
            expect(function () {
                log.off({});
            }).toThrowError();
            expect(function () {
                log.off('lkj');
            }).not.toThrowError();
        });
        it('strips all callbacks from an event', function () {
            var spy = jasmine.createSpy('eventSpy');
            log.on('testevent', function (data) {
                spy('123abc');
            });
            log('testevent', {});
            expect(spy.calls.count()).toEqual(1);
            log.off('testevent');
            log('testevent', true);
            expect(spy.calls.count()).toEqual(1);
        });
        it('strips the right callbacks', function () {
            var spy1 = jasmine.createSpy('eventSpy1');
            var spy2 = jasmine.createSpy('eventSpy2');
            log.on('testevent1', function (data) {
                spy1('123abc');
            });
            log.on('testevent2', function (data) {
                spy2('456abc');
            });
            log('testevent1', {});
            log('testevent2', {});
            expect(spy1.calls.count()).toEqual(1);
            expect(spy2.calls.count()).toEqual(1);
            log.off('testevent1');
            log('testevent1', true);
            log('testevent2', true);
            expect(spy1.calls.count()).toEqual(1);
            expect(spy2.calls.count()).toEqual(2);
        });
    });

    describe('log.clear()', function () {
        it('clears master log', function () {
            log('test', 'data');
            expect(log.readback('test').length).toEqual(1);
            expect(log.readback.master().length).toEqual(1);
            log.clear();
            expect(log.readback('test').length).toEqual(0);
            expect(log.readback.master().length).toEqual(0);
        });
        it('clears a channel log', function () {
            log('test', 'data');
            expect(log.readback('test').length).toEqual(1);
            expect(log.readback.master().length).toEqual(1);
            log.clear('test');
            expect(log.readback('test').length).toEqual(0);
            expect(log.readback.master().length).toEqual(1);
        });
        it('does nothing on bad channel name', function () {
            expect(log.readback('badchannel').length).toEqual(0);
            log.clear('badchannel');
            expect(log.readback('badchannel').length).toEqual(0);
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
        it('returns empty for invalid channel name', function () {
            var out = log.readback('not-here');
            expect(out).toEqual([]);
        });
        describe('log.readback.channels()', function () {
            it('returns empty for new logs', function () {
                expect(log.readback.channels().length).toEqual(0);
            });
            it('returns array of channel names', function () {
                log('testA', 'messageA');
                log('testB', 'messageB');
                var list = log.readback.channels();
                expect(list.length).toEqual(2);
                expect(list[0]).toEqual('testA');
                expect(list[1]).toEqual('testB');
            });
            it('can pretty print names', function () {
                log('testA', 'messageA');
                log('testB', 'messageB');
                var list = log.readback.channels(true);
                expect(list.length).toBeGreaterThan(0);
                expect(typeof list).toEqual('string');
            });
        });
        describe('log.readback.master()', function () {
            it('works with no entries', function () {
                var out = log.readback.master();
                expect(out).toEqual([]);
            });
            it('returns events in order', function () {
                log('test', 123);
                log('test', 'abc');
                var out = log.readback.master();
                expect(out[0].data).toEqual(123);
                expect(out[1].data).toEqual('abc');
            });
            it('returns events from all channels', function () {
                log('test1', 123);
                log('test2', 'abc');
                var out = log.readback.master();
                expect(out[0].channel).toEqual('test1');
                expect(out[1].channel).toEqual('test2');
            });
            it('ids each entry', function () {
                log('test1', 123);
                log('midtest', {});
                log('test2', 'abc');
                var out = log.readback.master();
                expect(out[0].id).toEqual(0);
                expect(out[2].id).toEqual(2);
            });
            it('can pretty print logs', function () {
                log('testA', 'messageA');
                log('testB', 'messageB');
                var res = log.readback.master(true);
                expect(res.length).toBeGreaterThan(0);
                expect(typeof res).toEqual('string');
            });
        });
    });

    describe('logging control', function () {
        beforeEach(function () {
            localStorage.lumberjack = 'abcd';
        });
        it('is disabled by default', function () {
            var log = Lumberjack();
            log('test', '321abc');
            var out = log.readback.master();
            expect(out).toEqual([]);
        });
        it('does nothing when disabled', function () {
            localStorage.lumberjack = 'garbage';
            log('test', 321);
            var out = log.readback.master();
            expect(out).toEqual([]);
        });
        it('can be overridden with enabled option', function () {
            var log = Lumberjack(true);
            localStorage.lumberjack = 'garbage';
            log('testchan', 'abc123');
            var out = log.readback.master();
            expect(out[0].channel).toEqual('testchan');
        });
        it('can be overridden with localStorage setting', function () {
            var log = Lumberjack();
            localStorage.lumberjack = 'on';
            log('tester', 'abc123');
            var out = log.readback.master();
            expect(out[0].channel).toEqual('tester');
        });
        it('can be enabled with both settings enabled', function () {
            var log = Lumberjack(true);
            localStorage.lumberjack = 'on';
            log('tester', 'abc123');
            var out = log.readback.master();
            expect(out[0].channel).toEqual('tester');
        });
        it('can be enabled on the fly', function () {
            var out, log = Lumberjack();
            log('test', '321abc');
            out = log.readback.master();
            expect(out.length).toEqual(0);

            log.enable();
            log('test', '321abc');
            log('test', '123abc');
            out = log.readback.master();
            expect(out.length).toEqual(2);
        });
        it('can be disabled on the fly', function () {
            var out, log = Lumberjack(true);
            log('test', '321abc');
            out = log.readback.master();
            expect(out.length).toEqual(1);

            log.disable();
            log('test', '321abc');
            out = log.readback.master();
            expect(out.length).toEqual(1);
        });
    });

    describe('log.flush()', function () {
        it('can flush a single channel', function () {
            log('test', 'testmsg');
            expect(log.readback('test').length).toEqual(1, 'pre test');
            var out = log.flush('test');
            expect(out.length).toEqual(1, 'out test');
            expect(log.readback('test').length).toEqual(0, 'post test');
        });
        it('can flush all channels', function () {
            log('test', 'testmsg');
            expect(log.readback.master().length).toEqual(1, 'pre test');
            log.flush();
            expect(log.readback('test').length).toEqual(0, 'post test');
            expect(log.readback.master().length).toEqual(0, 'post test master');
        });
    });
});
