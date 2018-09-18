const http = require("./server").http;
const io = require("socket.io")(http);
const {
    motionSensor, button, blueLed,
    yellowLed, events
} = require("./gpio");

const messageTypes = {
    button: "button",
    led: "led",
    motion: "motion"
};

function sendInitialState(socket) {
    console.log("sending initial state");
    socket.emit(messageTypes.led, { color: "blue", state: blueLed.value() });
    socket.emit(messageTypes.led, { color: "yellow", state: yellowLed.value() });
}

io.on("connection", socket => {
    console.log("client connected.");
    socket.on(messageTypes.led, msg => {
        const { color, state } = msg;
        if(color != "blue") {
            console.warn(`attempt to change ${color} LED blocked.`);
            return;
        }
        blueLed.value(!!state);
    });
    sendInitialState(socket);
});

motionSensor.on(events.both, () => {
    const motion = motionSensor.value();
    io.emit(messageTypes.motion, motion);
});

button.on(events.both, () => {
    const buttonValue = button.value();
    const state = buttonValue ? "up" : "down";
    io.emit(messageTypes.button, state);
});

function handleLed(color, led) {
    io.emit(messageTypes.led, { color, state: led.value() });
}

blueLed.on(events.both, () => handleLed("blue", blueLed));

yellowLed.on(events.both, () => handleLed("yellow", yellowLed));

module.exports = io;