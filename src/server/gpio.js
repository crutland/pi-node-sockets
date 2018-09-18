const pins = require("pi-pins");

const pinNumbers = {
    motionSensor: 17,
    button: 22,
    yellowLed: 27,
    blueLed: 23
};

const motionSensor = pins.connect(pinNumbers.motionSensor);
motionSensor.mode("in");

const button = pins.connect(pinNumbers.button);
button.mode("in");

const yellowLed = pins.connect(pinNumbers.yellowLed);
yellowLed.mode("out");

const blueLed = pins.connect(pinNumbers.blueLed);
blueLed.mode("out");

module.exports = {
    button,
    motionSensor,
    yellowLed,
    blueLed,
    events: {
        rise: "rise",
        fall: "fall",
        both: "both"
    }
};