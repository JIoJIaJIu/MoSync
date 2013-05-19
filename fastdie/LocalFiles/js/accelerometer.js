var appCore = {};

appCore.accelerometer = (function(){

    var accelerometer = new Accelerometer();
    var options = {frequency: 50};
    var handlers = {};
    var lastAcceleration = {x:0, y:0, z:0};

    // current - текущее
    // target - желаемое
    // returns true || false
    function near (current, target, delta) {
        delta = delta || 0.5;
        if (current - delta < target && current + delta > target)
            return true;
        else
            return false;
    }

    function isDown (x, y, z) {
        return (near(x, 0) && near(y, 1) && near(z, 0));
    }

    function isBang (x, y, z) {
        var delta = 0.6;
        return (near(Math.abs(x), 1, delta) && near(y, 0, delta) && near(z, 0, delta));
    }
    function isBadPosition (x, y, z) {
        return !isDown(x, y, z);
    }

    accelerometer.watchAcceleration(function (data) {
        var x = data.x,
            y = data.y,
            z = data.z;

        lastAcceleration = data;
        lastAcceleration.type = 'unknown';

        if (isDown(x, y, z)) {
            lastAcceleration.type = 'down';
        } else if (isBang(x, y, z)) {
            lastAcceleration.type = 'bang';
        } else if (isBadPosition(x, y, z)) {
            lastAcceleration.type = 'bad';
        }

    }, null, options);

    var gameAccelerometer = {};

    gameAccelerometer.isDownPosition = function (handler) {
        return lastAcceleration.type === 'down';
    };

    gameAccelerometer.isBangPosition = function () {
        return lastAcceleration.type === 'bang';
    };

    gameAccelerometer.isBadPosition = function (handler) {
        return lastAcceleration.type === 'bad';
    };

    gameAccelerometer.inStartPosition = function (handler) {
        var _this = this;
        var interval = setInterval(function() {
            if (_this.isDownPosition()) {
                clearInterval(interval);
                handler();
            }
        }, 50);
    };
    gameAccelerometer.inBadPosition = function (handler) {
        var _this = this;
        var interval = setInterval(function() {
            if (_this.isBadPosition()) {
                clearInterval(interval);
                handler();
            }
        }, 50);
    };

    return gameAccelerometer;
})();
