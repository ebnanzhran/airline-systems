'use strict';
require('dotenv').config();
const PORT = process.env.PORT || 3050;
const ioServer = require('socket.io')(PORT);
const { faker } = require('@faker-js/faker');
const uuid = require('uuid').v4;

const queue = {
  flights: {}
};

const tookOff = ioServer.of('/airline');

tookOff.on('connection', (socket) => {
  socket.on('new-flight', () => {
    tookOff.emit('new-flight');
  });
  socket.on('took-off', flightTookOff);
});

ioServer.on('connection', (socket) => {
  socket.on('new-flight', (payload) => {
    flightNewFlight();
    const id = uuid();
    queue.flights[id] = payload;
    ioServer.emit('new-flight', payload);
  });
  socket.on('Arrived', flightArrived);
  socket.on('Arrived', () => {
    ioServer.emit('Arrived');
  });
  socket.on('get-all', () => {
    socket.emit('flight', queue.flights);
    queue.flights = {};
  });
});

function flightNewFlight() {
  let flightDetails01 = {
    Flight: {
      event: 'new-flight',
      time: faker.date.past(),
      Details: {
        airLine: 'Air Arabia Airlines',
        destination: faker.address.city(),
        pilot: faker.internet.userName(),
        flightID: faker.datatype.uuid(),
      },
    },
  };
  console.log(flightDetails01);
}
function flightTookOff() {
  let flightDetails02 = {
    Flight: {
      event: 'took_off',
      time: faker.date.past(),
      Details: {
        airLine: 'Air Arabia Airlines',
        destination: faker.address.city(),
        pilot: faker.internet.userName(),
        flightID: faker.datatype.uuid(),
      },
    },
  };
  console.log(flightDetails02);
}
function flightArrived() {
  let flightDetails03 = {
    Flight: {
      event: 'arrived',
      time: faker.date.past(),
      Details: {
        airLine: 'Air Arabia Airlines',
        destination: faker.address.city(),
        pilot: faker.internet.userName(),
        flightID: faker.datatype.uuid(),
      },
    },
  };
  console.log(flightDetails03);
}