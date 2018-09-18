const gpio = require("./gpio");
const http = require("./server").http;
require("./socketServer");

http.listen(80, function () {
    console.log("listening.");
});

gpio.motionSensor.on("both", () => {
    const motionSensorValue = gpio.motionSensor.value();
    console.log(`Motion sensor changed state to: '${motionSensorValue}'.`);
    gpio.yellowLed.value(motionSensorValue);
});

gpio.button.on("fall", () => {
    const blueLightValue = gpio.blueLed.value();
    console.log("Button Pressed.")
    gpio.blueLed.value(!blueLightValue);
});

gpio.yellowLed.on("both", () => {
    console.log("yellow led status change", gpio.yellowLed.value());
});