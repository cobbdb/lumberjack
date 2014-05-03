/**
 * # Lumberjack
 * Plugable front-end logging.
 * @return {Object} A new Lumberjack.
 */
window.Lumberjack = function () {
    var noisy, log;
    var record = {};
    var cbQueue = {};

    // Stub the console object for older browsers.
    console = console || {
        log: function () {}
    };

    try {
        // ### Noisy logging updates the console in real time.
        // This value is truthy, but just run
        // ```delete localStorage.noisy``` to disable.
        noisy = localStorage.noisy;
    } catch (err) {
        // This browser does not have localStorage.
        noisy = false;
    }

    /**
     * ## log(event, data)
     * Record a log entry for an event.
     * @param {String} event A string describing this event.
     * @param {String|Object|Number} data Some data to log.
     */
    log = function (event, data) {
        var i, len, entry;
        if (typeof event !== 'undefined') {
            entry = {
                time: new Date(),
                data: data
            };
            // Record the event.
            record[event] = record[event] || []
            record[event].push(entry);

            // Perform any attached callbacks.
            cbQueue[event] = cbQueue[event] || [];
            len = cbQueue[event].length;
            for (i = 0; i < len; i += 1) {
                cbQueue[i](data);
            }
            return entry;
        }
        throw Error('Lumberjack Error: log(event) requires an event string.');
    };
    /**
     * ## log.readback(event)
     * Fetch the log of an event.
     * @param {String} event A string describing this event.
     * @return {Array} This event's current record.
     *
     * ## log.readback(event, pretty)
     * Fetch the log of an event.
     * @param {String} event A string describing this event.
     * @param {Boolean} pretty True to return string of record.
     * @return {String} A formatted string of this event's log.
     */
    log.readback = function (event, pretty) {
        var output;
        if (pretty) {
            output = JSON.stringify(record[event], null, 4);
        } else {
            output = record[event];
        }
        console.log(output);
        return output;
    };
    /**
     * ## log.addListener(event, cb)
     * Attach a callback to run anytime a metric is logged.
     * @param {String} event A string describing this event.
     * @param {Function} cb The callback.
     */
    log.on = function (event, cb) {
        cbQueue[event] = cbQueue[event] || [];
        cbQueue[event].push(cb);
    };
    return log;
};
