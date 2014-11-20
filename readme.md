[![Lumberjack](http://i.imgur.com/d0rKge1.png)](https://cobbdb.github.io/lumberjack)

[![Bower version](https://badge.fury.io/bo/lumberjack.svg)](http://badge.fury.io/bo/lumberjack) [![NPM version](https://badge.fury.io/js/lumberjackjs.svg)](http://badge.fury.io/js/lumberjackjs)

Plugable JavaScript logging.

    $ bower install lumberjack
    $ npm install lumberjackjs

-------------
#### Creating a new Lumberjack
Create one master instance if you'd like, or many instances for each system.
```javascript
var log = Lumberjack();
```

#### Enable logging
Logging is off by default to avoid memory leaks and conserve script performance.
There are several options to control logging:
```javascript
// Update localStorage then refresh the page..
localStorage.lumberjack = 'on';
// ..or force logging on when creating a new instance..
var log = Lumberjack(true);
// ..or turn logging on/off during runtime.
log.enable();
log.disable();
```

#### Log some information
Each log entry is tied to a channel and is created on the fly. This data
can be an Object, String, Number, or Boolean.
```javascript
log('signin', 'User has finished signing in.');
```

#### Clear log data
Log data may be reset manually for either a single channel or
the entire log.
```javascript
// Clears all log data.
log.clear();
// Clears only the 'a-channel' data.
log.clear('a-channel');
```

#### Attach some callbacks
You can attach side-effects to your log channels for analytics tools.
The data object is whatever data gets logged when the event trips.
You can even attach multiple callbacks to the same channel.
```javascript
log.on('contentload', function (data) {
    analytics.report(data);
});
```

#### Trigger events
Define your behavior once and trigger it multiple times.
```javascript
log('contentload', {
    how: 'scroll',
    speed: 851
});
```

#### Debug a subsystem
Get the logging information you care about with timestamps of when it happened.
Every log entry has a timestamp so you can tell when events happened.
```javascript
log.readback('gallery');
log.readback('gallery', true); // Pretty-print
```

Quickly check on what log channels are in use.
```javascript
log.readback.channels(); // Array of channel names
log.readback.channels(true); // Pretty-print
```

#### View all events in order
The master record contains all log entries in order.
```javascript
log.readback.master();
log.readback.master(true); // Pretty-print
```

#### Remove side-effects
You can disable all existing callbacks for a single channel.
```javascript
log.off('scroll');
```

#### Analyzing entries
All log entries take the form:
```javascript
{
    time: // timestamp when entry was logged
    data: // the logged data
    channel: // channel of entry
    id: // id of entry in master record
}
```

---------
* See: http://cobbdb.github.io/lumberjack/
* See: http://github.com/cobbdb/lumberjack
* License: MIT
