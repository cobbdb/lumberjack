# Lumberjack [![Bower version](https://badge.fury.io/bo/lumberjack.svg)](http://badge.fury.io/bo/lumberjack) [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

Plugable front-end logging.

    $ bower install lumberjack

-------------
### Creating a new Lumberjack
By default the selector will match elements that are at least partially showing in the viewport.

    var log = Lumberjack();

### Log some information
The selector can be used with .is() to test if an element is or is not in range of the viewport.

    log('signin', 'User has finished signing in.');

### Attach some callbacks
Callbacks can be attached to logging events for your analytics tools.

    log.on('contentload', function (data) {
        analytics.report(data);
    });

### Trigger events
Define your behavior once and trigger it multiple times.

    log('contentload', {
        how: 'scroll',
        speed: 851
    });

### Debug a subsystem
Get the logging information you care about with timestamps of when it happened.

    log.readback('gallery');

---------
* See: http://cobbdb.github.io/lumberjack/
* See: http://github.com/cobbdb/lumberjack
* License: MIT
