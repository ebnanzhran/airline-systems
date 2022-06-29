'use strict';
require('dotenv').config();
const io = require('socket.io-client');
const host = `http://localhost:${process.env.PORT}`;
const { faker } = require('@faker-js/faker');

let ID = faker.datatype.uuid();

const events_airline = io.connect(`${host}/airline`);
const events = io.connect(host);


events.emit('get-all');

events_airline.on('new-flight', () => {
  setTimeout(() => {
    let tookOff = `Pilot: flight with ID ${ID} took-off`;
    console.log(tookOff);
    events_airline.emit('took-off');
  }, 4000);
});
events.on('new-flight', () => {
  setTimeout(() => {
    let arrived = `Pilot: flight with ID ${ID} has arrived`;
    console.log(arrived);
    events.emit('Arrived');
  }, 7000);
});
events.on('flight', (payload) => {
  console.log(payload);
  Object.keys(payload).forEach((key) => {
    console.log(`Pilot:Sorry i didn't catch this flight ID ${key}.`);
  });
})