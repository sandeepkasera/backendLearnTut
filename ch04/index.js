const logEvents = require('./logEvents');

const EventEmitter = require('events');
class MyEmitter extends EventEmitter { };

// initialize object

const myEmitter = new MyEmitter();

//addnlistener for the log event
console.log('welcome');
myEmitter.on('log', (msg) => {
    logEvents(msg);
})

setTimeout(() => {
    //Emit event
    myEmitter.emit('log', 'Log event emitted');
}, 3000)