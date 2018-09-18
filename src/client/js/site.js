const socket = io();
const yellowLed = $("#yellow-led");
const blueLed = $("#blue-led");
const toggleLedButton = $("#toggle-blue-led");
function setupHandlers() {
  var socket = io();
  socket.on('motion', handleMotionEvent);
  socket.on("led", handleLedMessage);
  socket.on("button", handleButtonEvent);
  toggleLedButton.on("click", handleUpdateBlueLedButtonClicked);
}

function updateBlueLedButton(ledState) {
  const span = $("span", toggleLedButton);
  const hidden = $("#next-value", toggleLedButton);
  toggleLedButton.removeClass();
  toggleLedButton.addClass("btn btn-sm btn-pill")
  if (ledState) {
    toggleLedButton.addClass("btn-danger");
    span.text("Turn Off");
    hidden.val(false);
  } else {
    toggleLedButton.addClass("btn-success");
    span.text("Turn On");
    hidden.val(true);
  }
}

function setBlueLedState(state) {
  socket.emit("led", { color: "blue", state });
}

function handleUpdateBlueLedButtonClicked() {
  const hidden = $("#next-value", toggleLedButton);
  var value = JSON.parse(hidden.val());
  setBlueLedState(value);
}

function handleLedMessage({ color, state }) {
  pushEvent(`LED EVENT: ${JSON.stringify({ color, state })}`);
  let led;
  if (color === "yellow") {
    led = yellowLed;
  } else {
    led = blueLed;
    updateBlueLedButton(state);
  }
  if (state)
    led.removeClass("led-off");
  else
    led.addClass("led-off");
}

function handleButtonEvent(buttonState) {
  pushEvent(`BUTTON EVENT: button state: ${buttonState}`);
  const bd = $("#button-down"), bu = $("#button-up");
  const cased = `${buttonState.slice(0, 1).toUpperCase()}${buttonState.slice(1)}`;
  $("#button-header").text(`Button State: ${cased}`);
  if (buttonState === 'up') {
    bd.addClass("hidden");
    bu.removeClass("hidden");
  } else {
    bu.addClass("hidden");
    bd.removeClass("hidden");
  }
}

function handleMotionEvent(motionDetected) {
  pushEvent(`MOTION EVENT: motion detected: ${motionDetected}`);
  const mf = $("#motion-false"), mt = $("#motion-true");
  $("#motion-header").text(motionDetected ? "Motion Detected!" : "No Motion Detected");
  if (motionDetected) {
    mf.addClass("hidden");
    mt.removeClass("hidden");
  } else {
    mt.addClass("hidden");
    mf.removeClass("hidden");
  }
}

function pushEvent(event) {
  console.log(event);
  const text = `${new Date().toLocaleTimeString()}: ${event}\n`;
  const log = $("#event-log");
  log.append(text);
  log.scrollTop(log[0].scrollHeight);
}

$(function () {
  setupHandlers();
});