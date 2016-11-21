var clientMQTT = mqtt.connect('mqtt://localhost:8080') // you add a ws:// url here
clientMQTT.subscribe("value/#")

clientMQTT.on("message", function (topic, message) {
  let m = message.toString();
  line = document.createElement('li');
  line.textContent = m;
  messages.appendChild(line);
})
