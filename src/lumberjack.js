/**
 * # Lumberjack
 * Plugable front-end logging.
 * @return {Object} A new Lumberjack.
 * @see GitHub-Page http://github.com/cobbdb/lumberjack 
 */
window.Lumberjack = function () {
    var log;
    var record = {};
    var cbQueue = {};

    /**
     * ## log(event, data)
     * Record a log entry for an event.
     * @param {String} event A string describing this event.
     * @param {String|Object|Number|Boolean} data Some data to log.
     */
    log = function (event, data) {
        var i, len, entry;
        var eventValid = typeof event === 'string';
        var dataType = typeof data;
        var dataValid = dataType !== 'undefined' && dataType !== 'function';
        if (eventValid && dataValid) {
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
                cbQueue[event][i](data);
            }
        } else {
            throw Error('Lumberjack Error: log(event, data) requires an event {String} and a payload {String|Object|Number|Boolean}.');
        }
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
        var eventValid = typeof event === 'string';
        if (eventValid) {
            if (pretty) {
                return JSON.stringify(record[event], null, 4);
            }
            return record[event];
        }
        throw Error('log.readback(event, pretty) requires an event {String}.');
    };
    /**
     * ## log.addListener(event, cb)
     * Attach a callback to run anytime a metric is logged.
     * @param {String} event A string describing this event.
     * @param {Function} cb The callback.
     */
    log.on = function (event, cb) {
        var eventValid = typeof event === 'string';
        var cbValid = typeof cb === 'function';
        if (eventValid && cbValid) {
            cbQueue[event] = cbQueue[event] || [];
            cbQueue[event].push(cb);
        } else {
            throw Error('log.on(event, cb) requires an event {String} and a callback {Function}.');
        }
    };
    return log;
};
