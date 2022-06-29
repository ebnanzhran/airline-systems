'use strict';
require('dotenv').config();

const io = require('socket.io-client');
const host = `http://localhost:${process.env.PORT}`;
const { faker } = require('@faker-js/faker');


let ID = faker.datatype.uuid();
let pilot = faker.internet.userName();

const events_airline = io.connect(`${host}/airline`);
const events = io.connect(host);

const flights = {
  event: 'new-flight',
  details: {
    time: faker.date.past(),
    id: faker.datatype.uuid(),
    pilot: faker.internet.userName(),
    destination: faker.address.city(),
  }
}

setInterval(() => {
  let manager1 = `Manager: new flight with ID ${ID} have been scheduled`;
  console.log(manager1);
  events_airline.emit('new-flight', flights);
  events.emit('new-flight', flights);
}, 10000);

events.on('Arrived', manager2);
function manager2() {
  console.log(`Manager: we are greatly thankful for the amazing flight, ${pilot}`);
}